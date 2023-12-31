import express from "express";
import { addPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";
import { protect, adminOnly, authorOnly } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);

postRouter.post("/", protect,adminOnly, addPost);
postRouter.put("/:id", protect, adminOnly, updatePost);
postRouter.delete("/:id", protect, adminOnly, authorOnly, deletePost);

export default postRouter;