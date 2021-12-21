import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import styles from './Comment.module.css'

import { getProfileById } from '../../services/profileService'
import { createComment } from '../../services/groupService'

const CommentForm = props => {
  const { id, postId } = useParams()
  const [avatar, setAvatar] = useState('')
  const [comment, setComment] = useState({})

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createComment(id, postId, comment)
      props.addComment(comment)
      setComment({})
    } catch (err) {
      throw err
    }
  }

  const { comment_content } = comment

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(props.user.profile)
        setAvatar(profile.avatar)
      } catch (error) {
        throw error
      }
    }
    fetchProfile()
  }, [props.user.profile])

  const isFormInvalid = () => {
    return !(comment_content)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <img className={styles.image} src={avatar} alt="" />
      <h2 style={{color: 'black'}}>Add a Comment</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          autoComplete="off"
          id="comment_content"
          value={comment.comment_content}
          name="comment_content"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Add Comment
        </button>
      </div>
    </form>
  )
}

export default CommentForm