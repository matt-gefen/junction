import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { uploadFile } from 'react-s3'
import styles from './GroupForm.module.css'

// Services
import { createGroup, getAllGroups } from '../../services/groupService'

// Components
import GroupCategories from '../GroupCategories/GroupCategories'
import ImageUpload from '../ImageUpload/ImageUpload'


const GroupForm = props => {
  const navigate = useNavigate()
  const [groupCategory, setGroupCategory] = useState('Family')
  const [file, setFile] = useState({
    image: 'https://avatars.dicebear.com/api/initials/CreateGroup.svg'
  })
  const [config, setConfig] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    category: 'Family',
    avatar: '',
    location: '',
  })

  const handleChange = e => {
    console.log(e.target.name)
    props.updateMessage('')
    if (e.target.files) {
      console.log('Chose file:', e.target.files[0])
      let reader = new FileReader()
      reader.onload = e => {
        setFile({image: e.target.result})
      }
      reader.readAsDataURL(e.target.files[0])
      setFormData({
        ...formData,
        'category': groupCategory,
        'avatar': `https://junction-image-storage.s3.us-east-2.amazonaws.com/${e.target.files[0].name}`,
        [e.target.name]: e.target.value,
      })
    } else {
      setFormData({
        ...formData,
        'category': groupCategory,
        [e.target.name]: e.target.value,
      })
    }
  }

  const setupConfig = (configSetup) => {
    console.log('Setting config info:', configSetup);
    setConfig(configSetup)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      handleUpload(file.image)
      await createGroup(formData)
      // change to Group Details
      let allGroups = await getAllGroups()
      let id = allGroups[allGroups.length - 1]._id
      navigate(`/groups/${id}`)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
  }

  const { title, category, avatar, location } = formData

  const isFormInvalid = () => {
    return !(title && category && avatar)
  }

  console.log('Group form data:', formData)
  console.log('File data:', file)
  console.log('Config for file upload:', config)

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
        <label htmlFor="category" className={styles.label}>Category</label>
        <GroupCategories setGroupCategory={setGroupCategory} groupCategory={groupCategory} handleChange={handleChange}/>
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
        <img 
        src={file.image} 
        alt="group avatar" style={{width: "150px"}} 
        />
        <ImageUpload
          name="avatar"
          setupConfig={setupConfig}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Create Group
        </button>
        <Link to="/groups">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default GroupForm
