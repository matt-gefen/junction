import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './PostForm.module.css'

// Services
import {
  createPost,
  getPostById,
  updatePost
} from '../../services/groupService'
import { getProfileById, updateProfile } from '../../services/profileService'

// Components
import LocationSearch from '../LocationSearch/LocationSearch'
import ImageUploadNativeAWS from '../ImageUpload/ImageUploadNativeAWS'
import DateTimePicker from '../../components/MaterialUI/DateTimePicker'
import BasicButton from '../../components/MaterialUI/BasicButton'
import TextField from '../../components/MaterialUI/TextField'
import Switch from '../../components/MaterialUI/Switch'

const PostForm = (props) => {
  const { id, postId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [location, setLocation] = useState('')
  const [file, setFile] = useState({
    image: `https://avatars.dicebear.com/api/croodles-neutral/newPost.svg`
  })
  const [hasRegistration, setHasRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState([])
  const [registeredAvatars, setRegisteredAvatars] = useState([])

  const fileUpload = useRef(null)

  const handleChange = async (e) => {
    props.updateMessage('')
    if (e.target?.files) {
      let reader = new FileReader()
      reader.onload = (event) => {
        setFile({
          fullFile: e.target.files[0],
          name: e.target.files[0].name,
          image: event.target.result
        })
      }
      reader.readAsDataURL(e.target.files[0])
      setFormData({
        ...formData,
        thumbnail: `https://junction-image-storage.s3.us-east-2.amazonaws.com/${e.target.files[0].name}`,
        group: id,
        location: location
      })
    } else if (e.target?.name === 'registration') {
      const isRegisteredMember = registrationData.some(
        (id) => id === props.user.profile
      )
      let profileData = {}
      if (!isRegisteredMember) {
        profileData = await getProfileById(props.user.profile)
      }
      setFormData({
        ...formData,
        registration: isRegisteredMember
          ? [registrationData]
          : [...registrationData, props.user.profile],
        registeredAvatars: isRegisteredMember
          ? [registeredAvatars]
          : [...registeredAvatars, profileData.avatar],
        hasRegistration: !hasRegistration
      })
      setHasRegistration(!hasRegistration)
    } else {
      setFormData({
        ...formData,
        group: id,
        location: location,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (file.fullFile) fileUpload.current(file.fullFile)
      if (props.editPost) {
        await updatePost(id, postId, { ...formData, location: location })
      } else {
        const newPost = await createPost(id, {
          ...formData,
          location: location
        })
        const profileData = await getProfileById(props.user.profile)
        profileData.registered_events.push(newPost)
        await updateProfile(props.user.profile, profileData)
      }
      navigate(-1)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  function cancelFormSubmission() {
    navigate(-1)
  }

  const { title, thumbnail, group, date, link, description, register } =
    formData

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
            registeredAvatars: postData.registeredAvatars,
            date: postData.date,
            group: id
          })
          setHasRegistration(postData.hasRegistration)
          setRegistrationData(postData.registration)
          setRegisteredAvatars(postData.registeredAvatars)
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
      className={styles.formContainer}
    >
      <div className={styles.inputContainer}>
        <TextField
          value={title}
          editable={true}
          label={title ? '' : 'Post Title'}
          name="title"
          handleChange={handleChange}
        />
      </div>
      <div className={styles.locationContainer}>
        <label htmlFor="location" className={styles.label}>
          Selected Location
        </label>
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

      <div className={styles.adjustedContainer}>
        <DateTimePicker date={formData.date} handleChange={handleChange} />
      </div>

      <div className={styles.adjustedContainer}>
        <TextField
          value={link}
          editable={true}
          label={link ? '' : 'Link'}
          name="link"
          handleChange={handleChange}
        />
      </div>

      <div className={styles.adjustedContainer}>
        <TextField
          value={description}
          editable={true}
          label={description ? '' : 'Description'}
          name="description"
          handleChange={handleChange}
        />
      </div>

      <div className={styles.adjustedContainer}>
        <Switch
          id="registration"
          hasRegistration={hasRegistration}
          name="registration"
          onChange={handleChange}
          checked={hasRegistration}
          setHasRegistration={setHasRegistration}
        />
      </div>

      <div className={styles.imageUploadContainer}>
        <img src={file.image} alt="post avatar" />
        <ImageUploadNativeAWS
          fileUpload={fileUpload}
          handleChange={handleChange}
        />
      </div>

      <div className={styles.submissionContainer}>
        <button className={styles.hiddenButton}>
          <BasicButton
            text={props.editPost ? 'Update' : 'Post'}
            isFormInvalid={isFormInvalid()}
          />
        </button>
        <BasicButton text={'Cancel'} onClick={cancelFormSubmission} />
      </div>
    </form>
  )
}

export default PostForm
