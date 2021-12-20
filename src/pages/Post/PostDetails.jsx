import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import CommentForm from "../../components/Comment/CommentForm"

// Services
import { getPostById, deletePost } from "../../services/groupService"

// Components
import Comment from '../../components/Comment/Comment'
import AlertDialog from "../../components/MaterialUI/AlertDialogue"

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
  const [isOwner, setIsOwner] = useState(false)

  const navigate = useNavigate()

  function routeToEditPost() {
    navigate(`/groups/${id}/posts/${postId}/edit`)
  }

  function confirmDeletePost() {
    deletePost(id, postId)
    navigate(-1)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id, postId)
        setPost(postData)
        setIsOwner(props.user.profile === postData.owner)
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [id, postId])

  let date = new Date(post.createdAt)

  return (
    <div className="layout">
      {isOwner &&
        <>
          <button onClick={routeToEditPost}>Edit Post</button>
          <AlertDialog 
            handleConfirm={confirmDeletePost}
            buttonText="Delete Post"
            content="Are you sure you want to delete this post? This action cannot be undone!"
            confirmOption="Delete Post"
            cancelOption="Cancel"
          />
        </>
      }
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