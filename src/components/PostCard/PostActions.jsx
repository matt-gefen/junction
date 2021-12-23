import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AlertDialog from "../../components/MaterialUI/AlertDialogue"
import BasicButton from '../MaterialUI/BasicButton';
import PopupMenu from '../MaterialUI/PopupMenu'

import { updateProfile, getProfileById } from "../../services/profileService";

import { deletePost } from "../../services/groupService"

import styles from './PostCard.module.css'



const PostActions = (props) => {
  const navigate = useNavigate()
  const [ownerId, setOwnerId] = useState(props.post.owner)
  const [isOwner, setIsOwner] = useState(props.user?.profile === ownerId)
  console.log(props.user?.profile)
  const [isFavorite, setIsFavorite] = useState(true)


  function routeToEditPost() {
    navigate(`/groups/${props.groupId}/posts/${props.post._id}/edit`)
  }

  function confirmDeletePost() {
    deletePost(props.groupId, props.post._id)
    // navigate()
  }

  function handleClick() {
    if(isFavorite) {
      props.handleUnfavorite()
      setIsFavorite(!isFavorite)
    } else {
      props.handleFavoritePost()
      setIsFavorite(!isFavorite)
    }
  }

  let popUpOptions = [ ]

if (!isFavorite && isOwner) {
    popUpOptions=
      [ 
        ['Favorite', handleClick],
        ['Edit', routeToEditPost],
        ['Delete Post', confirmDeletePost]
      ]
    
}else if (isFavorite && isOwner) {
  popUpOptions=
      [ 
        ['Unfavorite', handleClick],
        ['Edit', routeToEditPost],
        ['Delete', confirmDeletePost]
        
      ]
} else if (isFavorite){ 
  popUpOptions=
      [
        ['Unfavorite', handleClick]
      ]
} else if (!isFavorite){ 
  popUpOptions=
      [
        ['Favorite', handleClick]
      ]
} 

  useEffect(()=>{
    setIsFavorite(props.favorites?.includes(props.post._id))
  },[props.favorites, props.post._id])

  return (
    <div className={styles.interactions}>
      <PopupMenu 
        options = {popUpOptions}
          />
      {/* <AlertDialog hidden={deleting?}
            handleConfirm={confirmDeletePost}
            buttonText=""
            content="Are you sure you want to delete this post? This action cannot be undone!"
            confirmOption="Delete Post"
            cancelOption="Cancel"
          /> */}
    </div>
  )
}

export default PostActions