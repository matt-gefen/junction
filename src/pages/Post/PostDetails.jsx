import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../../components/Comment/CommentForm"

// Services
import { getPostById } from "../../services/groupService"

// Components
import Comment from '../../components/Comment/Comment'

const PostDetails = props => {
  const { id, postId } = useParams()
  const [post, setPost] = useState({
    group: '',
    title: '',
    createdAt: '',
    owner: '',
    thumbnail: '',
    description: '',
    link: '',
    location: '',
    date: '',
    register: '',
    comments: []
  })

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const postData = await getPostById(id, postId)
        setPost(postData)
      } catch (error) {
        throw error
      }
    }
    fetchGroup()
  }, [id, postId])

  let date = new Date(post.createdAt)

  return (
    <div className="layout">
      <div className="post-details">
        <h1>Post Details</h1>
        <h1>{post.title}</h1>
        <div className="post-date">
          {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
        </div>
        <div className="post-owner-container">
          <h3>Post Owner</h3>
          <div className="post-owner"></div>
        </div>
        <div className="post-thumbnail">
          <img src={post.thumbnail} alt="Post thumbnail" />
        </div>
        <div className="post-description-container">
          <h3>Post Description</h3>
          {post.description}
        </div>
        <div className="post-link-container">
          <h3>Post Link</h3>
          {post.link}
        </div>
        <div className="post-location-container">
          <h3>Post Location</h3>
          {post.location}
        </div>
        <div className="post-event-date-container">
          <h3>Event Date</h3>
          <div className="post-event-date">
            {post.date}
          </div>
        </div>
        <div className="post-registration-container">
          <h3>Post Registration</h3>
          {post.registration}
        </div>
        <div className="post-comments-container">
          <h3>Post Comments</h3>
          <CommentForm user={props.user}/>
          {post.comments?.map((comment) => (
            <Comment user={props.user} comment={comment} key={comment._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetails