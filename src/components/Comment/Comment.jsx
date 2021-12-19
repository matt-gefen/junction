import { useState, useEffect } from 'react'
import styles from './Comment.module.css'

// Services
import { getProfileById } from '../../services/profileService'

const Comment = props => {
  const [owner, setOwner] = useState({
    avatar: '',
    name: ''
  })

  let date = new Date(props.comment.createdAt)

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
      <div className="comment-content">
        {props.comment.comment_content}
      </div>
    </section>
  )
}

export default Comment