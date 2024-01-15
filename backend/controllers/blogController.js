import User from "../models/userModel.js";
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import blogPostModel from "../models/blogPostModel.js";

// Functie separata pentru incarcarea unei imagini in Cloudinary
async function uploadImageToCloudinary(imageBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "blog" },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary: ", error);
          reject(error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
    );
    streamifier.createReadStream(imageBuffer).pipe(uploadStream);
  });
}

// Add BlogPost
export const createBlogPost = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("Received files:", req.files);
  console.log("Received body:", req.body);
  try {
    // Incarcam imaginile in Cloudinary
    const imagesUploadPromises = req.files.map(file => uploadImageToCloudinary(file.buffer));
    const imagesLinks = await Promise.all(imagesUploadPromises);


    // Construim un array de content elements
    const contentElements = req.body.content.map((element, index) => {
      return {
        type: element.type,
        content: element.content,
        image: imagesLinks[index],
      };
    });

    // Construim un obiect de tip post
    const post = {
      title: req.body.title,
      content: contentElements,
      user: user._id,
    };
    console.log("Creating blog post with data:", post);
    // Salvam postul in baza de date
    const createdPost = await blogPostModel.create(post);
 console.log("Created post:", createdPost);
    res.status(201).json({
      success: true,
      createdPost,
    });
  }
  catch (error) {
    console.log(error);
    console.error("Error in createBlogPost: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to create blog post.",
    });
  }
};