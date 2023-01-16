import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'
import { Post } from '../models/post.js'

const index = async (req, res) => {
  try {
    const groups = await Group.find({}).populate('members')
    return res.status(200).json(groups)
    
  } catch(error) {
    return res.status(500).json(error)
  }
}

const create = async (req, res) => {

  try {
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

const createPost = async (req, res) => {

  try {

    req.body.owner = req.user.profile
    const newPost = await new Post(req.body)
    await newPost.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { posts: newPost } }
    )
    await Group.updateOne(
      { _id: req.params.id },
      { $push: { posts: newPost } }
    )
    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('members')
      .populate('posts')
    return res.status(200).json(group)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const showPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('comments')
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
      )
    return res.status(200).json(updatedPost)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId)
    const profile = await Profile.findById(req.user.profile)
    profile.posts.remove({_id: req.params.postId})
    const group = await Group.findById(req.params.id)
    group.posts.remove({_id: req.params.postId})
    await profile.save()
    await group.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const profile = await Profile.findById(req.user.profile)
    req.body.avatar = profile.avatar
    req.body.name = profile.name
    const post = await Post.findById(req.params.postId)
    post.comments.push(req.body)
    await post.save()
    const newComment = post.comments[post.comments.length - 1]
    return res.status(201).json(newComment)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    const updatedComment = await post.comments.find((comment) => (comment._id.equals(req.params.commentId)))
    updatedComment.comment_content = req.body.comment_content
    await post.save()
    return res.status(200).json(updatedComment)
  } catch(error) {
    return res.status(500).json(error)
  }
}

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    post.comments.remove({ _id: req.params.commentId })
    await post.save()
    return res.status(204).end()
  } catch(error) {
    return res.status(500).json(error)
  }
}

export { index, create, update, deleteGroup as delete, createPost, show, showPost, updatePost, deletePost, createComment, updateComment, deleteComment }