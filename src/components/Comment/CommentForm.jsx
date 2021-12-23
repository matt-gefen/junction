import { useState } from 'react'
import { useParams } from "react-router-dom"
import styles from './Comment.module.css'

// Services
import { createComment } from '../../services/groupService'

// Components
import BasicButton from '../../components/MaterialUI/BasicButton'
import TextField from '../../components/MaterialUI/TextField'


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
      <div className={styles.inlineContainer}>
        <img className={styles.image} src={props.profile?.avatar} alt="" />
        <div className={styles.inputContainer}>
          <TextField value={value} editable={true} label="Add a Comment"name="comment_content" handleChange={handleChange}/>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <button className={styles.hiddenButton}>
          <BasicButton text={"Add Comment"} isFormInvalid={isFormInvalid()}/>
        </button>
      </div>
    </form>
  )
}

export default CommentForm