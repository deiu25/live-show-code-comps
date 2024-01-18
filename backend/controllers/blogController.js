import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import blogPostModel from "../models/blogPostModel.js";

// Add BlogPost
export const createBlogPost = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    
    // Încărcați imaginile în Cloudinary și obțineți link-urile
    const imagesLinks = await Promise.all(
      req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
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

    req.body.headerImage = imagesLinks;
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to upload images." });
  }

  req.body.user = user._id;

  const post = await blogPostModel.create(req.body);

  res.status(201).json({
    success: true,
    post,
  });
};


