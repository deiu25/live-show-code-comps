// import mongoose from "mongoose";

// const contentElementSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//     enum: ['text', 'code', 'image', 'link'],
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   image: [
//     {
//       public_id: {
//         type: String,
//         required: true
//       },
//       url: {
//         type: String,
//         required: true
//       },
//     }
//   ],
//   description: {
//     type: String,
//   },
//   user: {
//     type: mongoose.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   content: [contentElementSchema], // Use the schema for content elements
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("BlogPost", postSchema);

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
        required: true
      },
      url: {
        type: String,
        required: true
      },
    }
  ],
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("BlogPost", postSchema);
