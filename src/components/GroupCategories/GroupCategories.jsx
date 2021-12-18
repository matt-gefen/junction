import React from 'react'
import categories from '../../data/categories'

const GroupCategories = (props) => {

let categoryOptions = []

categories.forEach((element, index) =>{
  categoryOptions.push(
    <option key={index}>{element}</option>
  )
})

  return (

    <select name="category" onChange={(e) => {
      props.setGroupCategory(e.target.value) 
      props.handleChange(e)
      }}> 
          {categoryOptions}
    </select>
  )
}

export default GroupCategories