import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Comment.module.css'

// Services
import { updateComment } from '../../services/groupService'
import { getProfileById } from '../../services/profileService'

// Components
import TextField from '../../components/MaterialUI/TextField'
import PopupMenu from '../../components/MaterialUI/PopupMenu'

const Comment = props => {
  const { id, postId } = useParams()
  const [editable, setEditable] = useState(false)
  const [comment, setComment] = useState(props.comment)
  const [commentDefault, setCommentDefault] = useState(props.comment.comment_content)
  const [profile, setProfile] = useState()

  let date = new Date(props.comment.createdAt)

  function toggleEdit(submitted) {
    if (editable) {
      setComment({
        ...comment,
        'comment_content': submitted ? comment.comment_content: commentDefault
      })
    }
    setEditable(!editable)
  }

  function submitComment() {
    updateComment(id, postId, comment._id, comment)
    setCommentDefault(comment.comment_content)
    toggleEdit(true)
  }

  function confirmDeleteComment() {
    props.removeComment(comment)
  }

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const profileData = await getProfileById(comment.owner)
        setProfile(profileData)
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [])

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <img className={styles.image} src={profile?.avatar} alt="owner avatar" />
        <div className={styles.container}>
          <div className="owner-name">
            {profile?.name}
          </div>
          <div className="comment-date">
            {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`}
          </div>
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <TextField value={comment.comment_content} editable={editable} name="comment_content" handleChange={handleChange}/>
        {(!editable && props.user.profile === comment.owner) &&
          <PopupMenu 
            options={
              [
                ['Edit Comment', toggleEdit], 
                ['Delete Comment', confirmDeleteComment]
              ]
            }
          />
        }
        {editable && 
          <>
            <button onClick={submitComment}>Update Comment</button>
            <button onClick={() => toggleEdit(false)}>Cancel</button>
          </>
        }
      </div>
    </section>
  )
}

export default Comment