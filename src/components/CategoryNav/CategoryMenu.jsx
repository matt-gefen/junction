import React from 'react'
import categories from '../../data/categories'
import styles from './CategoryNav.module.css'
import updateProfile from '../../services/profileService'

const CategoryMenu = (props) => {
  
  let groupCategories = new Set(categories.map((element, index) => {
    return element
  }))
  
  let categoryOptions = []
  
  const handleAddCategory = async (categoryId) => {
    try {
      const updatedProfile = await updateProfile(categoryId)
      setProfile(categories.map((category) => (category._id === categoryId ? updatedProfile : category)))
    } catch (error) {
      throw error
    }
  }
groupCategories.forEach((element, index) =>{
  categoryOptions.push(
   <div onClick={() => props.handleAddCategory(props.category._id)} className={styles.categoryName} key={index}>{element}</div> 
  )
})


  return (

<div className={styles.categorySelection}>
   {categoryOptions}
</div>
  )
}

export default CategoryMenu