import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './GroupForm.module.css'

import { createPost } from '../../services/groupService'

const PostForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    location: '',
    group: '',
    date: ''
  })

  const handleChange = e => {
    console.log(e.target.name)
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createPost(formData)
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, thumbnail, group, location, date } = formData

  const isFormInvalid = () => {
    return !(title && thumbnail && group)
  }

  console.log(formData)

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
      {/* <div className={styles.inputContainer}>
        <img 
        src={`https://avatars.dicebear.com/api/initials/${title}.svg`} 
        alt="initials avatar" style={{width: "150px"}} 
        />
      </div> */}
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Post
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default PostForm
