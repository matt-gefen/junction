import React from 'react'
import categories from '../../data/categories'
import styles from './CategoryNav.module.css'

const CategoryMenu = (props) => {

let groupCategories = new Set(categories.map((element, index) => {
  return element
}))

let categoryOptions = []

groupCategories.forEach((element, index) =>{
  categoryOptions.push(
   <div className={styles.categoryName} key={index}>{element}</div> 
  )
})

  return (

<div className={styles.categorySelection}>
   {categoryOptions}
</div>
  )
}

export default CategoryMenu