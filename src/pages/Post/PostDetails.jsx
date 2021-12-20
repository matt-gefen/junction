import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './PostDetails.module.css'
import CommentForm from "../../components/Comment/CommentForm"

// Services
import { getPostById } from "../../services/groupService"

import { updateProfile, getProfileById } from "../../services/profileService";

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
  const [profile, setProfile] = useState()
  const [isOwner, setIsOwner] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/groups/${id}/posts/${postId}/edit`)
  }

  function handleFavoritePost() {
    updateProfile(profile._id, {
      ...profile,
      favorited_posts: [...profile.favorited_posts, post._id]
    })
  }

  // function handleLeaveGroup() {
  //   let newMembers = []
  //   group.members.forEach((element) => {
  //     if(element._id !== profile._id) {
  //       newMembers.push(element)
  //     }
  //   })

  //   let newGroups = []
  //   profile.joined_groups.forEach((element) => {
  //     if(element._id !== group._id) {
  //       newGroups.push(element)
  //     }
  //   })
//   updateGroup(group._id, {
//     ...group,
//     members: newMembers
//   })
//   updateProfile(profile._id, {
//     ...profile,
//     joined_groups: newGroups
//   })
//   setIsMember(false)
// }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id, postId)
        const profileData = await getProfileById(props.user.profile)
        setPost(postData)
        setProfile(profileData)
        setIsOwner(props.user.profile === postData.owner)
        let favorites = profileData.favorited_posts.map((element) => {
          return element._id
        })
        setIsFavorite(favorites.includes(postData._id))
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [props.user.profile, id, postId])

  let date = new Date(post.createdAt)

  return (
    <div className="layout">
      {isOwner &&
        <button onClick={handleClick}>Edit Post</button>
      }
      { !isFavorite &&
        <button onClick={handleFavoritePost}>Favorite Post</button>
      }
      { isFavorite &&
        <button onClick={handleFavoritePost}>Unfavorite Post</button>
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
          <img className={styles.thumbnail} src={post.thumbnail} alt="Post thumbnail" />
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