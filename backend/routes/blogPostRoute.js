import express from "express";
import multer from 'multer';
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { createBlogPost } from "../controllers/blogController.js";

const upload = multer();

const blogPostRouter = express.Router();

// Create a new blog post
blogPostRouter.post("/", upload.array('images'), protect, createBlogPost);

export default blogPostRouter;