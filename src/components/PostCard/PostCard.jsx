import React from "react"
import styles from './PostCard.module.css'

// Components

const PostDetails = ({ post }) => {

  let date = new Date(post.createdAt)

  return (
    <div className={styles.card}>
      <div className="post-details">
        <h1>{post.title}</h1>
        <div className={styles.container}>
          {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
        </div>
        <div className="post-owner-container">
          <div className="post-owner"></div>
        </div>
        <div className={styles.thumbnail}>
          <img src={post.thumbnail} alt="Post thumbnail" />
        </div>
        <div className="post-description-container">
          {post.description}
        </div>
      </div>
    </div>
  )
}

export default PostDetails