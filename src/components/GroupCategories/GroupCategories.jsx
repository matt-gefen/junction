import React from 'react'

//Components
import Select from '../MaterialUI/Select'

const GroupCategories = (props) => {


  return (
    <>
      <Select 
        name="Category"
        setGroupCategory={props.setGroupCategory} 
        groupCategory={props.categories} 
        handleChange={props.handleChange}
        defaultValue={props.defaultValue}
      />
    </>
  )
}

export default GroupCategories