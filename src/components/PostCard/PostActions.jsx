import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AlertDialog from "../../components/MaterialUI/AlertDialogue"

import { updateProfile, getProfileById } from "../../services/profileService";

import { deletePost } from "../../services/groupService"



const PostActions = (props) => {
  const navigate = useNavigate()
  let favorites = props.profile.favorited_posts.map((element) => {
    return element._id
  })
  const [isFavorite, setIsFavorite] = useState(favorites.includes(props.post._id))
  const ownerId = props.post.owner
  console.log(props.user?.profile, ownerId)
  const isOwner = props.user?.profile === ownerId

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const profileData = await getProfileById(props.user.profile)
  //       setIsOwner(props.user.profile === postData.owner)
  //       let favorites = profileData.favorited_posts.map((element) => {
  //         return element._id
  //       })
  //       setIsFavorite(favorites.includes(postData._id))
  //     } catch (error) {
  //       throw error
  //     }
  //   }
  //   fetchPost()
  // }, [props.user.profile,])

  function routeToEditPost() {
    navigate(`/groups/${props.group._id}/posts/${props.post._id}/edit`)
  }

  function confirmDeletePost() {
    deletePost(props.group._id, props.post._id)
    navigate(-1)
  }
  
  function handleFavoritePost() {
    updateProfile(props.profile._id, {
      ...props.profile,
      favorited_posts: [...props.profile.favorited_posts, props.post._id]
    })
  
    if (isFavorite === false) {
      setIsFavorite(true)
    }
  }

  function handleUnfavorite() {
    let newFavorites = []
    props.profile.favorited_posts.forEach((element) => {
      if(element._id !== props.post._id) {
        newFavorites.push(element)
      }
    })
    updateProfile(props.profile._id, {
      ...props.profile,
      favorited_posts: newFavorites
    })
    setIsFavorite(false)
  }

  return (
    <div className="interactions">
    {!isFavorite &&
      <div>
        <button onClick={handleFavoritePost}> Favorite</button>
      </div>
    }
    {isFavorite && 
      <div>
        <button onClick={handleUnfavorite}>Unfavorite</button>
      </div>
    }
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