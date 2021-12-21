import React, {useState, useEffect} from 'react';

import styles from "./CategoryNav.module.css"

const CategoryFilter = ({profileCategories, category, handleAddCategory, handleRemoveCategory}) => {
  
  const [clicked, setClicked] = useState(true)
  
  function handleClick() {
    if (clicked) {
      handleRemoveCategory(category)
    } else {
      handleAddCategory(category)
    }
    setClicked(!clicked)
  }
useEffect(()=>{
  setClicked(profileCategories?.includes(category))
},[profileCategories, category])

  return (
<div onClick={handleClick} className={clicked
  ? styles.categoryClicked
  : styles.categoryName} >
  {category}
  </div> 
  )
}



export default CategoryFilter