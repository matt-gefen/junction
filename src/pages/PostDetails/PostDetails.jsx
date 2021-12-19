import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// Services
import { getPostById } from "../../services/groupService"

// Components

const PostDetails = () => {
  const { id, postId } = useParams()
  const [post, setPost] = useState()

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        console.log('Group id:', id)
        console.log('Post id:', postId)
        const postData = await getPostById(id, postId)
        console.log("Post Details Data:", postData)
        setPost(postData)
      } catch (error) {
        throw error
      }
    }
    fetchGroup()
  })

  return (
    <div className="layout">
      <div className="post-details">
        <h1>Post Details</h1>
        {/* <h1>{post.title}</h1>
        <h3>{post.createdAt.getDate() + " at " + post.createdAt.getHours() + post.createdAt.getMinutes()}</h3> */}
      </div>
    </div>
  )
}

export default PostDetails