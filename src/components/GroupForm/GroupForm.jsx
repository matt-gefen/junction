import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './GroupForm.module.css'

import GroupCategories from '../GroupCategories/GroupCategories'

import { createGroup } from '../../services/groupService'

const GroupForm = props => {
  const navigate = useNavigate()
  const [groupCategory, setGroupCategory] = useState('Family')
  const [formData, setFormData] = useState({
    title: '',
    category: 'Family',
    avatar: '',
    location: '',
  })
  

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
      await createGroup(formData)
      // change to Group Details
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { title, category, avatar, location } = formData

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
        <GroupCategories setGroupCategory={setGroupCategory} handleChange={handleChange}/>
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
        src={`https://avatars.dicebear.com/api/initials/${title}.svg`} 
        alt="initials avatar" style={{width: "150px"}} 
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Create Group
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default GroupForm
