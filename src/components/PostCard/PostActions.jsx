import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AlertDialog from "../../components/MaterialUI/AlertDialogue"

import { updateProfile, getProfileById } from "../../services/profileService";

import { deletePost } from "../../services/groupService"


const PostActions = (props) => {
  const navigate = useNavigate()
  const [ownerId, setOwnerId] = useState(props.post.owner)
  const [isOwner, setOwner] = useState(props.user?._id === ownerId)
  const [isFavorite, setIsFavorite] = useState(true)


  function routeToEditPost() {
    navigate(`/groups/${props.groupId}/posts/${props.post._id}/edit`)
  }

  function confirmDeletePost() {
    deletePost(props.groupId, props.post._id)
    navigate(-1)
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

  useEffect(()=>{
    setIsFavorite(props.favorites?.includes(props.post._id))
  },[props.favorites, props.post._id])

  return (
    <div className="interactions">
      <div>
        <button onClick={handleClick}> {isFavorite? "Unfavorite": "Favorite"}</button>
      </div>
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

    </div>
  )
}

export default PostActions