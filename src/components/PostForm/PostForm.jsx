import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './PostForm.module.css'

import LocationSearch from '../LocationSearch/LocationSearch'

// Services
import { createPost, getPostById, updatePost } from '../../services/groupService'
import { getProfileById, updateProfile } from '../../services/profileService'

const PostForm = props => {
  const { id, postId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [location, setLocation] = useState('')

  const [hasRegistration, setHasRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState([])

  console.log('User:', props.user)

  const handleChange = e => {
    console.log('Change name:', e.target.name)
    console.log('Change value:', e.target.value)
    console.log(hasRegistration)
    props.updateMessage('')
    if (e.target.name === 'registration') {
      setFormData({
        ...formData,
        registration: e.target.value ? [...registrationData, props.user.profile] : [registrationData],
        hasRegistration: !hasRegistration
      })
      setHasRegistration(!hasRegistration)
    } else {
      setFormData({
        ...formData,
        thumbnail: `https://avatars.dicebear.com/api/croodles-neutral/${title}.svg`,
        group: id,
        location:location,
        [e.target.name]: e.target.value,
      })
    }
  }


  const handleSubmit = async e => {
    e.preventDefault()
    console.log(location)
    try {
      let newPost = {}
      if (props.editPost) {
        newPost = await updatePost(id, postId, {...formData, location:location})
      } else {
        newPost = await createPost(id, {...formData, location:location})
        const profileData = await getProfileById(props.user.profile)
        profileData.registered_events.push(newPost)
        await updateProfile(props.user.profile, profileData)
      }
      navigate(-1)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, thumbnail, group, date, link, description, register } = formData

  const isFormInvalid = () => {
    return !(title && description)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (props.editPost) {
          const postData = await getPostById(id, postId)
          setLocation(postData.location)
          setFormData({
            title: postData.title,
            thumbnail: postData.thumbnail,
            location: location,
            link: postData.link,
            description: postData.description,
            registration: postData.registration,
            date: postData.date,
            group: id
          })
          setHasRegistration(postData.hasRegistration)
          setRegistrationData(postData.registration)
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
  
  console.log('Form data:', formData)

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
      <div className={styles.locationContainer}>
        <label htmlFor="location" className={styles.label}>Selected Location</label>
        <p>{location}</p>
        <LocationSearch setLocation={setLocation} />
        <input
          type="text"
          autoComplete="off"
          id="text"
          value={location}
          name="location"
          onChange={handleChange}
          hidden
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

      <div className={styles.inputContainer}>
        <label htmlFor="registration" className={styles.label}>Registration for Event?</label>
        <input
          type="checkbox"
          autoComplete="off"
          id="registration"
          value={hasRegistration}
          name="registration"
          onChange={handleChange}
        />
      </div>

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
