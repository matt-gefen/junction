import React from 'react'
import categories from '../../data/categories'

const GroupCategories = (props) => {

let categoryOptions = []

categories.forEach((element, index) =>{
  if (element !== props.groupCategory) {  
    categoryOptions.push(
      <option key={index}>{element}</option>
    )
  }
})

  return (

    <select name="category" onChange={(e) => {
      props.setGroupCategory(e.target.value) 
      props.handleChange(e)
      }}> 
          <option>{props.groupCategory}</option>
          {categoryOptions}
    </select>
  )
}

export default GroupCategories