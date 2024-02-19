import mongoose from "mongoose";

const likeBlogPostSchema = new mongoose.Schema({
    BlogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const LikeBlogPost = mongoose.model('LikeBlog', likeBlogPostSchema);

export default LikeBlogPost;