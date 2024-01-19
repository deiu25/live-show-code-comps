import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import blogPostModel from "../models/blogPostModel.js";

// Add BlogPost
export const createBlogPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

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

    // Asigurați-vă că acest cod este executat înainte de a crea postarea
    req.body.headerImage = imagesLinks;
    req.body.user = user._id;

    if (req.body.content) {
      req.body.content = JSON.parse(req.body.content);
    }

    const post = await blogPostModel.create(req.body);
    res.status(201).json({ success: true, post });

  } catch (error) {
    // Aceasta este singura clauză de catch, care va gestiona toate erorile
    return res.status(500).json({ success: false, error: error.message });
  }
};
