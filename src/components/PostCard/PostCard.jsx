import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './PostCard.module.css'
import PostActions from "./PostActions"

import { getProfileById, updateProfile } from "../../services/profileService"

const PostCard = (props) => {
  const [favorites, setFavorites] = useState()
  const [profile, setProfile] = useState()

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const profileData = await getProfileById(props.user.profile)
        setProfile(profileData)
        setFavorites(profileData.favorited_posts.map((element) => {
          return element._id
          }
        )
      )
      } catch(error) {
        throw error
      }
    }
    getFavorites()
  }, [props.user.profile])
  
  
  const navigate = useNavigate()

  console.log('Group ID:', props.groupId)

  function handleClick() {
    navigate(`/groups/${props.groupId}/posts/${props.post._id}`)
  }

  const handleFavoritePost = async () => {
    try { 
      updateProfile(profile._id, {
      ...profile,
      favorited_posts: [...profile.favorited_posts, props.post._id]
    })
      setFavorites([...profile.favorited_posts, props.post._id])
    } catch(error) {
      throw error
    }
}

  const handleUnfavorite = async () => {
    try {
      const newFavorites = favorites.filter((fav) => fav !== props.post._id);
      updateProfile(profile._id, {
        favorited_posts: newFavorites,
      });
      setFavorites(newFavorites);
    } catch (error) {
      throw error;
    }
  }

  let date = new Date(props.post.createdAt)

  return (
    <div className={styles.card}>
      <div className="card-header">
        <PostActions 
          post={props.post}
          profile={profile}
          groupId={props.groupId}
          handleFavoritePost={handleFavoritePost}
          handleUnfavorite={handleUnfavorite}
          favorites={favorites}
          />
      </div>
      <div className="post-details">
        <h1 onClick={handleClick}>{props.post.title}</h1>
        <div className={styles.container}>
          {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
        </div>
        <div className="post-owner-container">
          <div className="post-owner"></div>
        </div>
        <div>
          {props.post.location}
        </div>
        <div className={styles.thumbnail} onClick={handleClick}>
          <img src={props.post.thumbnail} alt="Post thumbnail" />
        </div>
        <div className="post-description-container">
          {props.post.description}
        </div>
      </div>
    </div>
  )
}

export default PostCard