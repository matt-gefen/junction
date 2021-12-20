import React, {useState} from 'react';

import styles from "./CategoryNav.module.css"

const CategoryFilter = (props) => {
  console.log(props)
  const [clicked, setClicked] = useState(false)
  function handleClick() {
    if (clicked) {
      
    } else {
      props.handleAddCategory(props.category)
    }
    setClicked(!clicked)
  }
  return (
<div onClick={handleClick} className={clicked ? styles.categoryClicked : styles.categoryName} >{props.category}</div> 
  )
}



export default CategoryFilter