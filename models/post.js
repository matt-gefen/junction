import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: true,
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Profile" 
    },
    avatar: {
      type: String
    },
    name: {
      type: String
    }
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    favorite: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    link: String,
    thumbnail: {
      type: String
    },
    description: String,
    register: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    comments: [commentSchema],
    location: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
