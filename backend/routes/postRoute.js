import express from "express";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);

postRouter.post("/", protect, addPost);
postRouter.put("/:id", protect, updatePost);
postRouter.delete("/:id", protect, deletePost);

export default postRouter;