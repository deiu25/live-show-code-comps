import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }],
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment'
  }],
  views: [{ 
    type: Schema.Types.ObjectId,
    ref: 'View'
  }],
  shares: [{
    type: Schema.Types.ObjectId,
    ref: 'Share'
  }],
  saves: [{
    type: Schema.Types.ObjectId, 
    ref: 'Save'
  }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;