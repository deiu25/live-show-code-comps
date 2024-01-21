import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  headerImage: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  contentBlocks: [
    {
      type: {
        type: String,
        enum: ["image", "text"],
        required: true,
      },
      text: String,
      image: {
        public_id: String,
        url: String,
      },
    },
  ],
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("BlogPost", postSchema);
