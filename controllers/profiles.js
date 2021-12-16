import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const update = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      // Update Favorited Groups in Profile
      // Update Category Preferences in Profile
      // Update 
      )

  } catch (error) {
    
  }
}

export { index, update }
