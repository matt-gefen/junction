import React, {useState} from 'react';

import styles from "./CategoryNav.module.css"

const CategoryFilter = (props) => {
  const [clicked, setClicked] = useState(props.beenClicked)
  function handleClick() {
    if (clicked) {
      props.handleRemoveCategory(props.category)
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