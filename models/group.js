import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    category: String,
    avatar: { type: String, required: true },
    location: { type: String },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    owner:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

export { Group };
