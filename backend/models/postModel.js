import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  },
  // tags: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "Tag",
  //     required: true,
  //   },
  // ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
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
