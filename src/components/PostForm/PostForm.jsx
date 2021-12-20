import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './PostForm.module.css'

// Services
import { createPost, getPostById, updatePost } from '../../services/groupService'

const PostForm = props => {
  const { id, postId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleChange = e => {
    console.log(e.target.name)
    props.updateMessage('')
    setFormData({
      ...formData,
      thumbnail: `https://avatars.dicebear.com/api/croodles-neutral/${title}.svg`,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (props.editPost) {
        await updatePost(id, postId, formData)
      } else {
        await createPost(id, formData)
      }
      navigate(-1)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, thumbnail, group, location, date, link, description, register } = formData

  const isFormInvalid = () => {
    return !(title && description)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (props.editPost) {
          const postData = await getPostById(id, postId)
          setFormData({
            title: postData.title,
            thumbnail: postData.thumbnail,
            location: postData.location,
            link: postData.link,
            description: postData.description,
            // register: '',
            date: postData.date
          })
        } else {
          setFormData({
            thumbnail: 'https://i.imgur.com/izJwDia.png'
          })
        }
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [])

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
          id="name"
          value={title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.label}>Location</label>
        <input
          type="text"
          autoComplete="off"
          id="location"
          value={location}
          name="location"
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="date" className={styles.label}>Event Date</label>
        <input
          type="datetime"
          autoComplete="off"
          id="date"
          value={date}
          name="date"
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="link" className={styles.label}>Link</label>
        <input
          type="text"
          autoComplete="off"
          id="link"
          value={link}
          name="link"
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          rows = "6"
          columns = "10"

          autoComplete="off"
          id="description"
          value={description}
          name="description"
          onChange={handleChange}
        />
      </div>

      {/* <div className={styles.inputContainer}>
        <label htmlFor="register" className={styles.label}>Register for event</label>
        <input
          type="checkbox"
          autoComplete="off"
          id="register"
          value={register}
          name="register"
          onChange={handleChange}
        />
      </div> */}


      <div className={styles.inputContainer}>
        <img 
        src={thumbnail} 
        alt="initials avatar" style={{width: "150px"}} 
        />
      </div>

      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          {props.editPost ? "Update" : "Post"}
        </button>
        <Link to={props.editPost ? `groups/${id}/posts/${postId}` : `groups/${id}`}>
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default PostForm
