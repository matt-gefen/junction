import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

const update = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('joined_groups')
      .populate('favorited_posts')
      .populate('registered_events')
      .populate('groups')
      .populate('posts')
    return res.status(200).json(profile)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export { index, update, show };
