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

export { index, update };
