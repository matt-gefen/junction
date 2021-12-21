import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './PostCard.module.css'
import PostActions from "./PostActions"

// Components

const PostCard = (props) => {

  const { id } = useParams()

  const navigate = useNavigate()

  function handleClick() {
    navigate(`/groups/${props.groupId}/posts/${props.post._id}`)
  }

  let date = new Date(props.post.createdAt)

  return (
    <div className={styles.card}>
      <div className="card-header">
        <PostActions post={props.post} profile={props.profile} groupId={props.groupId} />
      </div>
      <div className="post-details">
        <h1 onClick={handleClick}>{props.post.title}</h1>
        <div className={styles.container}>
          {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
        </div>
        <div className="post-owner-container">
          <div className="post-owner"></div>
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