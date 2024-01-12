// Blog Post Model
import mongoose from "mongoose";

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
  content: {
    type: Array, // poate conține fragmente de text, cod sursă, link-uri către imagini etc.
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
