import { useState } from 'react'
import { useParams } from "react-router-dom"
import styles from './Comment.module.css'

// Services
import { createComment } from '../../services/groupService'

const CommentForm = props => {
  const { id, postId } = useParams()
  const [comment, setComment] = useState({})
  const [value, setValue] = useState('')

  const handleChange = e => {
    setValue(e.target.value)
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newComment = await createComment(id, postId, comment)
      setValue('')
      props.addComment(newComment)
    } catch (err) {
      throw err
    }
  }

  const { comment_content } = comment

  const isFormInvalid = () => {
    return !(comment_content)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <img className={styles.image} src={props.profile?.avatar} alt="" />
      <h2 style={{color: 'black'}}>Add a Comment</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          autoComplete="off"
          id="comment_content"
          value={value}
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