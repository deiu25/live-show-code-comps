import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  javascript: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Like",
    },
  ],
  views: [
    {
      type: mongoose.Types.ObjectId,
      ref: "View",
    },
  ],
  shares: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Share",
    },
  ],
  saves: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Save",
    },
  ],
});

export default mongoose.model("Snippet", snippetSchema);
