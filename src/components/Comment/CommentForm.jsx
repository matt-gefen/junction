import { useState, useEffect } from 'react'
import styles from './Comment.module.css'

import { getProfileById } from '../../services/profileService'
import { createComment } from '../../services/groupService'

const CommentForm = props => {
  const [comment, setComment] = useState({
    owner: '',
    content: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(props.user.profile)
        comment.owner = profile.avatar
        setComment(comment)
      } catch (error) {
        throw error
      }
    }
    fetchProfile()
  }, [props.user.profile])

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createComment(props.groupId, props.postId, comment)
    } catch (err) {
      throw err
    }
  }

  const { owner, content } = comment

  const isFormInvalid = () => {
    return !(content)
  }

  console.log('Comment:', comment)

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <img className={styles.image} src={comment.owner} alt="" />
      <h2>Add a Comment</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          autoComplete="off"
          id="content"
          value={content}
          name="content"
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