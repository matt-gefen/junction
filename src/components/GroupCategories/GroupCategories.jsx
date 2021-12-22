import React from 'react'



//Components
import Select from '../MaterialUI/Select'

const GroupCategories = (props) => {


  return (
    <>
    <Select 
    name="category"
    setGroupCategory={props.setGroupCategory} 
    groupCategory={props.categories} 
    handleChange={props.handleChange}/>
    </>
  )
}

export default GroupCategories