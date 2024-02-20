// genericController.js
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import LikeBlogPost from "../models/likeBlogPostModel.js";
import blogPostModel from "../models/blogPostModel.js";

const createPostOrCourse = async (model, folder, req, res) => {
    try {
        const user = await User.findById(req.user._id);
        let imagesLinks = [];
        if (req.files.images) {
            imagesLinks = await uploadImages(req.files.images, folder);
        }

        let contentBlocksImagesLinks = [];
        if (req.files.contentBlocksImages) {
            contentBlocksImagesLinks = await uploadImages(req.files.contentBlocksImages, folder);
        }

        req.body.headerImage = imagesLinks;
        req.body.user = user._id;

        let imageIndex = 0;
        
        if (req.body.contentBlocks) {
            req.body.contentBlocks = req.body.contentBlocks.map((block) => {
                if (block.type === "image") {
                    block.image = contentBlocksImagesLinks[imageIndex++];
                }
                return block;
            });
        }  

        const post = await model.create(req.body);
        res.status(201).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

async function uploadImages(files, folder) {
  return Promise.all(
    files.map(async (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: folder },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    })
  );
}

// Get All Posts/Courses
const getAll = async (model, req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    const items = await model.find(query).populate("user", "name");
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
  
  // Get Post/Course by ID
  const getById = async (model, req, res) => {
    try {
      const item = await model.findById(req.params.id).populate("user", "name");
      if (!item) {
        return res.status(404).json({ success: false, error: "Item not found" });
      }
      res.status(200).json({ success: true, item });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

// Delete Post/Course
const deleteItem = async (model, req, res) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: "Item not found" });
      }
  
      // Delete header images
      if (item.headerImage && item.headerImage.length > 0) {
        const headerImageDeletionPromises = item.headerImage
          .filter(image => image.public_id)
          .map(image => cloudinary.uploader.destroy(image.public_id));
        await Promise.all(headerImageDeletionPromises);
      }
  
      // Delete contentBlocks images
      if (item.contentBlocks && item.contentBlocks.length > 0) {
        const contentBlocksImageDeletionPromises = item.contentBlocks
            .filter(block => block.type === "image" && block.image && block.image.public_id)
            .map(block => cloudinary.uploader.destroy(block.image.public_id));
        await Promise.all(contentBlocksImageDeletionPromises);
      }
  
      await model.deleteOne({ _id: item._id });
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

// Edit Post/Course
const editPostOrCourse = async (model, folder, req, res) => {
  try {
    
    const item = await model.findById(req.params.id);

    if (!item) {
      console.error("Item not found");
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    let imagesLinks = item.headerImage; 

    if (req.files && req.files.headerImage && req.files.headerImage.length > 0) {
      imagesLinks = await uploadImages(req.files.headerImage, folder); 
      const oldHeaderImages = item.headerImage.map(image => image.public_id);
      await Promise.all(oldHeaderImages.map(public_id => cloudinary.uploader.destroy(public_id)));
    }

    req.body.headerImage = imagesLinks;

    let contentBlocksImagesLinks = [];
    if (req.files && req.files.contentBlocksImages) {
      contentBlocksImagesLinks = await uploadImages(req.files.contentBlocksImages, folder);
    }

    let imageIndex = 0; 
    if (req.body.contentBlocks) {
      req.body.contentBlocks = req.body.contentBlocks.map((block) => {
        if (block.type === "image" && block.image && req.files.contentBlocksImages && contentBlocksImagesLinks.length > 0) {
          block.image = contentBlocksImagesLinks[imageIndex++];
        }
        return block;
      });
    }
    
    const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Like or unlike a BlogPost
const likeOrUnlike = async (req, res) => {
  try {
    console.log(req.params);
    const postId = req.params.id;
    const userId = req.user._id;

    // Verificăm dacă like-ul există
    const like = await LikeBlogPost.findOneAndDelete({ user: userId, blogPost: postId });
    if (like) {
      // Dacă like-ul a fost șters, decrementăm contorul de like-uri
      await blogPostModel.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
    } else {
      // Dacă like-ul nu există, îl creăm și incrementăm contorul de like-uri
      await new LikeBlogPost({ user: userId, blogPost: postId }).save();
      await blogPostModel.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    }

    // Obținem numărul actualizat de like-uri pentru a-l returna
    const updatedPost = await blogPostModel.findById(postId, 'likesCount');
    res.status(200).json({
      success: true,
      likesCount: updatedPost.likesCount,
    });
  } catch (error) {
    console.error("Error in PUT /api/posts/:id/like:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
  
  export { createPostOrCourse, getAll, getById, deleteItem, editPostOrCourse, likeOrUnlike };
