import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './GroupForm.module.css'

// Services
import { createGroup, getAllGroups } from '../../services/groupService'

// Components
import GroupCategories from '../GroupCategories/GroupCategories'
import ImageUploadNativeAWS from '../ImageUpload/ImageUploadNativeAWS'
import LocationSearch from '../LocationSearch/LocationSearch'
import BasicButton from '../MaterialUI/BasicButton'
import TextField from '../MaterialUI/TextField'

const GroupForm = (props) => {
  const navigate = useNavigate()
  const [groupCategory, setGroupCategory] = useState('Family')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState({
    image: 'https://i.imgur.com/izJwDia.png'
  })
  const [formData, setFormData] = useState({
    title: '',
    category: 'Family',
    avatar: '',
    location: ''
  })
  const fileUpload = useRef(null)

  const handleChange = (event) => {
    props.updateMessage('')
    if (event.target.files) {
      let reader = new FileReader()
      reader.onload = (e) => {
        setFile({
          fullFile: event.target.files[0],
          name: event.target.files[0].name,
          image: e.target.result
        })
      }
      reader.readAsDataURL(event.target.files[0])
      setFormData({
        ...formData,
        category: groupCategory,
        location: location,
        avatar: `https://junction-image-storage.s3.us-east-2.amazonaws.com/${event.target.files[0].name}`
      })
    } else {
      setFormData({
        ...formData,
        category: groupCategory,
        location: location,
        [event.target.name]: event.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      fileUpload.current(file.fullFile)
      await createGroup(formData)
      let allGroups = await getAllGroups()
      let id = allGroups[allGroups.length - 1]._id
      navigate(`/groups/${id}`)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, category, avatar } = formData

  const isFormInvalid = () => {
    return !(title && category && avatar)
  }

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
          label={title ? '' : 'Group Title'}
          name="title"
          handleChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <GroupCategories
          setGroupCategory={setGroupCategory}
          groupCategory={groupCategory}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.locationContainer}>
        <label htmlFor="location" className={styles.label}>
          Selected Location
        </label>
        <p>{location}</p>
        <LocationSearch
          fullWidth
          fullHeight
          setLocation={setLocation}
          onChange={handleChange}
        />
      </div>

      <div className={styles.imageUploadContainer}>
        <img src={file.image} alt="group avatar" />
        <ImageUploadNativeAWS
          fileUpload={fileUpload}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.submissionContainer}>
        <button className={styles.hiddenButton}>
          <BasicButton text={'Create Group'} isFormInvalid={isFormInvalid()} />
        </button>
        <Link to="/groups">
          <button className={styles.hiddenButton}>
            <BasicButton text={'Cancel'} />
          </button>
        </Link>
      </div>
    </form>
  )
}

export default GroupForm
