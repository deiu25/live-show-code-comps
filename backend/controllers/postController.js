import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// Add Post
export const addPost = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    // Crearea unui nou obiect Post cu title și content
    const post = new Post({
      title,
      htmlCode: content.htmlCode,
      cssCode: content.cssCode,
      jsCode: content.jsCode,
      user: req.user._id,
    });

    // Salvarea postului în baza de date
    await post.save();

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the post.",
      error: error.message,
    });
  }
};

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "lastname");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while getting all posts.",
      error: error.message,
    });
  }
};

// Get post by id
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "lastname"
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while getting the post.",
      error: error.message,
    });
  }
};

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post.",
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    post.title = title;
    post.htmlCode = content.htmlCode;
    post.cssCode = content.cssCode;
    post.jsCode = content.jsCode;

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the post.",
      error: error.message,
    });
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send(`No post with id: ${req.params.id}`);
    }
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post.",
      });
    }

    // Use findByIdAndDelete to delete the post.
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post.",
      error: error.message,
    });
  }
};
