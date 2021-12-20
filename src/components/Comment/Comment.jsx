import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Comment.module.css'

// Services
import { getProfileById } from '../../services/profileService'
import { updateComment } from '../../services/groupService'

// Components
import TextField from '../../components/MaterialUI/TextField'

const Comment = props => {
  const { id, postId, commentId } = useParams()
  const [owner, setOwner] = useState({
    avatar: '',
    name: ''
  })
  const [editable, setEditable] = useState(false)
  const [comment, setComment] = useState(props.comment)

  let date = new Date(props.comment.createdAt)

  function toggleEdit() {
    setEditable(!editable)
  }

  function submitComment() {
    updateComment(id, postId, comment._id, comment)
    toggleEdit()
  }

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
    console.log('Comment:', comment)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(props.user.profile)
        setOwner({
          avatar: profile.avatar,
          name: profile.name
        })
      } catch (error) {
        throw error
      }
    }
    fetchProfile()
  }, [props.user.profile])

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <img className={styles.image} src={owner.avatar} alt="owner avatar" />
        <div className={styles.container}>
          <div className="owner-name">
            {owner.name}
          </div>
          <div className="comment-date">
            {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <TextField defaultValue={props.comment.comment_content} editable={editable} name="comment_content" handleChange={handleChange}/>
        {!editable && 
            <button onClick={toggleEdit}>Edit Comment</button>
        }
        {editable && 
          <>
            <button onClick={submitComment}>Update Comment</button>
            <button onClick={toggleEdit}>Cancel</button>
          </>
        }
      </div>
    </section>
  )
}

export default Comment