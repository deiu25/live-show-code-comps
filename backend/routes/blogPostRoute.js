import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createBlogPost } from "../controllers/blogController";

const blogPostRouter = express.Router();

// // Get all blog posts
// blogPostRouter.get("/", getBlogPosts);

// Create a new blog post
blogPostRouter.post("/", protect, createBlogPost);

export default blogPostRouter;