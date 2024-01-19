import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed,
});


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  headerImage: [
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
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: [contentBlockSchema],
  tags: [
    {
      type: String,
      required: true,
    }
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("BlogPost", postSchema);
