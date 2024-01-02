import express from "express";
import { addPost, getAllPosts, getPostById, getPostDetails, updatePost } from "../controllers/postController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.get("/:id", getPostDetails);

postRouter.post("/", protect,adminOnly, addPost);
postRouter.put("/:id", protect, adminOnly, updatePost);
// postRouter.delete("/:id", protect, adminOnly, deletePost);

export default postRouter;