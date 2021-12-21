import React, { useEffect, useState } from 'react'

// Services
import { getPostById, deleteComment } from "../../services/groupService"

// Components
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentList = props => {
  const [comments, setComments] = useState([])

  function addComment(comment) {
    setComments([...comments, comment])
  }

  function removeComment(comment) {
    console.log('Removing comment')
    deleteComment(props.id, props.postId, comment._id)
    setComments(comments.filter(element => element !== comment))
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const postData = await getPostById(props.groupId, props.postId)
        setComments(postData.comments)
      } catch (error) {
        throw error
      }
    }
    fetchComments()
  }, [comments])

  return (
    <>
      <CommentForm user={props.user} addComment={addComment}/>
      {comments.map((comment) => (
        <Comment
          user={props.user} 
          comment={comment} 
          removeComment={removeComment}
          key={comment._id}
        />
      ))}
    </>
  )
}

export default CommentList