import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './PostDetails.module.css'

// Services
import { getPostById, deletePost } from "../../services/groupService"
import { updateProfile, getProfileById } from "../../services/profileService"

// Components
import AlertDialogue from "../../components/MaterialUI/AlertDialogue"
import CommentList from "../../components/Comment/CommentList"
import BasicButton from '../../components/MaterialUI/BasicButton'
import Registration from "../../components/Post/Registration"

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
    hasRegistration: false,
    registration: [],
    comments: []
  })
  const [profile, setProfile] = useState()
  const [isOwner, setIsOwner] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAttending, setIsAttending] = useState(false)
  const [attendingMembers, setAttendingMembers] = useState([])
  const navigate = useNavigate()

  function routeToEditPost() {
    navigate(`/groups/${id}/posts/${postId}/edit`)
  }

  function handleFavoritePost() {
    updateProfile(profile._id, {
      ...profile,
      favorited_posts: [...profile.favorited_posts, post._id]
    })
  
    if (isFavorite === false) {
      setIsFavorite(true)
    }
  }

  function handleUnfavorite() {
    let newFavorites = []
    profile.favorited_posts.forEach((element) => {
      if(element._id !== post._id) {
        newFavorites.push(element)
      }
    })
    updateProfile(profile._id, {
      ...profile,
      favorited_posts: newFavorites
    })
    setIsFavorite(false)
  }

  function handleRegistration() {
    isAttending ? handleUnattendEvent() : handleAttendEvent()
  }

  function handleAttendEvent () {
    updateProfile(profile._id, {
      ...profile,
      registered_events: [...profile.registered_events, post._id]
    })
    setIsAttending(true)
  }

  function handleUnattendEvent () {
    let newRegisteredEvents = profile.registered_events.filter(event => event !== post._id)
    updateProfile(profile._id, {
      ...profile,
      registered_events: newRegisteredEvents
    })
    setIsAttending(false)
  }

  function confirmDeletePost() {
    deletePost(id, postId)
    navigate(-1)
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id, postId)
        const profileData = await getProfileById(props.user.profile)
        console.log('Post data:', postData)
        setPost(postData)
        setProfile(profileData)
        setIsOwner(props.user.profile === postData.owner)
        let favorites = profileData.favorited_posts.map((element) => {
          return element._id
        })
        setIsFavorite(favorites.includes(postData._id))
        setIsAttending(profileData.registered_events.some(event => event._id === postId))
        setAttendingMembers(postData.registration)
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [])

  let date = new Date(post.createdAt)
  let eventDate = new Date(post.date)

  return (
    <div className="layout">
      <div className={styles.groupDetailButtons}>
      { !isFavorite &&
        <button className={styles.hiddenButton} onClick={handleFavoritePost}><BasicButton text={"Favorite Post"}/></button>
      }
      { isFavorite &&
        <button className={styles.hiddenButton} onClick={handleUnfavorite}><BasicButton text={"Unfavorite Post"}/></button>
      }
      {isOwner &&
        <>
          {/* <button onClick={routeToEditPost}>Edit Post</button> */}
          <button className={styles.hiddenButton} onClick={routeToEditPost}><BasicButton text={"Edit Post"}/></button>
          <AlertDialogue 
            handleConfirm={confirmDeletePost}
            buttonText="Delete Post"
            content="Are you sure you want to delete this post? This action cannot be undone!"
            confirmOption="Delete Post"
            cancelOption="Cancel"
          />
        </>
      }
      </div>
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
            {`${eventDate.toLocaleDateString()} at ${eventDate.getHours() > 12 ? eventDate.getHours() - 12 : eventDate.getHours()}:${eventDate.getMinutes()}${eventDate.getHours() > 12 ? "pm" : "am"}`}
          </div>
        </div>
        <div className="post-registration-container">
          <h3>Post Registration</h3>
          {post.hasRegistration && 
            <Registration eventDate="" attendees={post.registration} isAttending={isAttending} handleClick={handleRegistration}/>
          }
        </div>
        <div className="post-comments-container">
          <h3>Post Comments</h3>
          {post.title && 
            <CommentList 
              groupId={id} 
              postId={postId} 
              comments={post.comments}
              user={props.user}
              profile={profile}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default PostDetails