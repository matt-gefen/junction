import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    const groups = await Group.find({}).populate('members')
    return res.status(200).json(groups)
    
  } catch(error) {
    return res.status(500).json(error)
  }
}

const create = async (req, res) => {
  console.log('Create a new group')
  try {
    console.log('Enter try block')
    console.log('Owner:', req)
    req.body.owner = req.user.profile
    req.body.members = req.user.profile
    req.body.admin = req.user.profile
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

const update = async (req, res) => {
  console.log('Update Group!')
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      )
    return res.status(200).json(updatedGroup)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.groups.remove({_id: req.params.id})
    await profile.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

export { index, create, update, deleteGroup as delete }