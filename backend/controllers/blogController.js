import User from "../models/userModel.js";
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import blogPostModel from "../models/blogPostModel.js";

// Add BlogPost
export const createBlogPost = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    // Încărcați imaginile în Cloudinary și obțineți link-urile
    const imageElements = req.body.content.filter(element => element.type === 'image');
    const imagesLinks = await Promise.all(
      imageElements.map(async (element) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "blog" },
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

          // Presupunem că `element.content` este un buffer al imaginii
          streamifier.createReadStream(element.content).pipe(uploadStream);
        });
      })
    );

    // Actualizați elementele de conținut cu URL-urile imaginilor încărcate
    req.body.content.forEach(element => {
      if (element.type === 'image') {
        const uploadedImage = imagesLinks.find(link => link.public_id === element.content);
        if (uploadedImage) {
          element.content = uploadedImage.url;
        }
      }
    });

    req.body.user = user._id;

    const post = await blogPostModel.create(req.body);

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to upload images or create the post." });
  }
};