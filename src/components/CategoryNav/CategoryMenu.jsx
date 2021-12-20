import React ,{useState, useEffect} from 'react'
import categories from '../../data/categories'
import styles from './CategoryNav.module.css'


// Services
import {updateProfile, getProfileById} from '../../services/profileService'


const CategoryMenu = (props) => {

  const [profile, setProfile] = useState([])
  const [categoryPref, setCategoryPref ] = useState()
  
  let groupCategories = new Set(categories.map((element, index) => {
    return element
  }))
  
  let categoryOptions = []
  
  const handleAddCategory = async (category) => {
    try {
      console.log(category)
      updateProfile(profile._id, {
        ...profile,
        category_prefs: [...profile.category_prefs, category
        ]}
      )
      setCategoryPref (profile.category_prefs)
    } catch (error) {
      throw error
    }
  }
groupCategories.forEach((element, index) =>{
  categoryOptions.push(
   <div onClick={() => handleAddCategory(element)} className={styles.categoryName} key={index}>{element}</div> 
  )
})

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const profileData = await getProfileById(props.user.profile)
      setProfile(profileData)
      let categoryPrefsMap = profileData.category_prefs.map((category) => {
        return category
      })
      setCategoryPref(categoryPrefsMap.includes(props.user.profile))
      console.log(categoryPrefsMap)
    } catch (error) {
      throw error;
    }
  };
  fetchCategories();
}, [props.user.profile, categoryPref]);

  return (

<div className={styles.categorySelection}>
  {categoryOptions}
</div>
  )
}

export default CategoryMenu