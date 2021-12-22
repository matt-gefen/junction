import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './GroupUpdateForm.module.css'

// Services
import { getGroupById, updateGroup } from '../../services/groupService'

// Categories
import GroupCategories from '../GroupCategories/GroupCategories'
import LocationSearch from '../LocationSearch/LocationSearch'
import ImageUploadNativeAWS from '../ImageUpload/ImageUploadNativeAWS'


const GroupUpdateForm = props => {
  const navigate = useNavigate()
  const [group, setGroup] = useState();
  const [location, setLocation] = useState('')
  const [groupCategory, setGroupCategory] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    avatar: '',
    location: location,
  })
  const [file, setFile] = useState({})

  const fileUpload = useRef(null)

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(props.groupId);
        setGroup(groupData)
        setLocation(groupData.location)
        setFormData({
          title: groupData.title,
          category: groupData.category,
          avatar: groupData.avatar,
          location: location,
        })
        setGroupCategory(groupData.category);
        console.log('update default image:', file)
        setFile({ image: groupData.avatar })
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [props.groupId]);



  const handleChange = event => {
    props.updateMessage('')
    if (event.target.files) {
      console.log('File name:', event.target.files[0].name)
      let reader = new FileReader()
      reader.onload = e => {
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
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log('File upload:', file)
      fileUpload.current(file.fullFile)
      const updatedGroup = await updateGroup(props.groupId,{...formData, location:location})
      setGroup(updatedGroup)
      navigate(`/groups/${props.groupId}`)
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, category, avatar } = formData

  const isFormInvalid = () => {
    return !(title && category && avatar)
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
        <label htmlFor="category" className={styles.label}>Category</label>
        <GroupCategories setGroupCategory={setGroupCategory} groupCategory={groupCategory}handleChange={handleChange}/>
      </div>
      <div className={styles.locationContainer}>
        <label htmlFor="location" className={styles.label}>Selected Location</label>
        <p>{location}</p>
        <LocationSearch setLocation={setLocation} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <img 
        src={file.image} 
        alt="group avatar" style={{width: "150px"}} 
        />
        <ImageUploadNativeAWS
          fileUpload={fileUpload}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Update Group
        </button>
        <Link to={`/groups/${props.groupId}`}>
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default GroupUpdateForm
