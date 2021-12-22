import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './GroupUpdateForm.module.css'

import GroupCategories from '../GroupCategories/GroupCategories'
import LocationSearch from '../LocationSearch/LocationSearch'

import { getGroupById, updateGroup } from '../../services/groupService'

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
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [props.groupId]);



  const handleChange = e => {
    console.log(e.target.name)
    props.updateMessage('')
    setFormData({
      ...formData,
      'avatar': `https://avatars.dicebear.com/api/initials/${title}.svg`,
      'category': groupCategory,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const updatedGroup = await updateGroup(props.groupId,formData)
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
        src={`https://avatars.dicebear.com/api/initials/${title}.svg`} 
        alt="initials avatar" style={{width: "150px"}} 
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
