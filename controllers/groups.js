import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'

const create = async (req, res) => {
  console.log('Create a new group')
  console.log('Req body:', req.body)
  try {
    console.log('Enter try block')
    console.log('Owner:', req)
    req.body.owner = req.user.profile
    const newGroup = await new Group(req.body)
    await newGroup.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { groups: newGroup } }
    )
    return res.status(201).json(newGroup)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export { create }