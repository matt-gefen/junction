import { useState } from 'react'
import styles from './Comment.module.css'

import { createComment } from '../../services/groupService'

const CommentForm = props => {
  const [comment, setComment] = useState({
    owner: props.user._id,
    content: ''
  })

  const handleChange = e => {
    props.updateMessage('')
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
      props.updateMessage(err.message)
    }
  }

  const { owner, content } = comment

  const isFormInvalid = () => {
    return !(content)
  }


  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="title" className={styles.label}>Title</label>
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