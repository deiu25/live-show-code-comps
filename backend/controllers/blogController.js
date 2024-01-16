import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import blogPostModel from "../models/blogPostModel.js";
import { JSDOM } from 'jsdom';

// Funcție pentru a parsa HTML-ul și actualiza sursele imaginilor
function parseHTMLAndUploadImages(htmlContent, files) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const contentElements = [];

  // Procesați fiecare nod din conținut
  document.body.childNodes.forEach(node => {
    if (node.nodeType === 3) { 
      const textContent = node.textContent.trim();
      if (textContent) {
        contentElements.push({ type: 'text', content: textContent });
      }
    } else if (node.nodeType === 1 && node.tagName === 'IMG') { 
      const file = files.find(f => node.getAttribute('src') === f.originalname);
      if (file) {
        const cloudinaryUrl = file.path; 
        contentElements.push({ type: 'image', content: cloudinaryUrl });
      }
    }
  });

  return contentElements;
}

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


