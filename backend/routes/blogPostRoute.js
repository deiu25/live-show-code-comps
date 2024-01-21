import express from "express";
import multer from "multer";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { 
  createBlogPost, 
  getBlogPosts, 
  getBlogPost 
} from "../controllers/blogController.js";

const upload = multer();
const blogPostRouter = express.Router();

// Create a new blog post
blogPostRouter.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "contentBlocksImages", maxCount: 10 }
  ]),
  protect,
  createBlogPost
);

// Get all blog posts
blogPostRouter.get("/", getBlogPosts);

// Get a specific blog post by id
blogPostRouter.get("/:id", getBlogPost);

export default blogPostRouter;
