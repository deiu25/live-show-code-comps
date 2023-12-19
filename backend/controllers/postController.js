import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Add Post
export const addPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    req.body.user = user._id;

    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the post.",
      error: error.message,
    });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("user")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while getting all posts.",
      error: error.message,
    });
  }
};

// Get Post By Id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while getting the post.",
      error: error.message,
    });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the post.",
      error: error.message,
    });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
    await post.remove();
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post.",
      error: error.message,
    });
  }
};

// Like Post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user._id)
        .length > 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Post already liked",
      });
    }
    post.likes.unshift({ user: req.user._id });
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while liking the post.",
      error: error.message,
    });
  }
};

// Unlike Post
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user._id)
        .length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Post has not yet been liked",
      });
    }
    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user._id);
    post.likes.splice(index, 1);
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while unliking the post.",
      error: error.message,
    });
  }
};

// Comment on Post
export const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const newComment = {
      text: req.body.text,
      user: req.user._id,
      name: user.name,
      avatar: user.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while commenting on the post.",
      error: error.message,
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }
    const index = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(index, 1);
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the comment.",
      error: error.message,
    });
  }
};
