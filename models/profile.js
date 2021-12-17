import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    name: String,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: { type: String, required: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    joined_groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    favorited_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    category_prefs: Array,
    location: String,
    registered_events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
