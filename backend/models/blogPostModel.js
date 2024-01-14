import mongoose from "mongoose";

const contentElementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'code', 'image', 'link'], // Define the possible types of content elements
  },
  content: {
    type: String,
    required: true,
  },
  // For images, 'content' will store the URL.
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    }
  ],
  description: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: [contentElementSchema], // Use the schema for content elements
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("BlogPost", postSchema);