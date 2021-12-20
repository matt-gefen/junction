import React from 'react'
import CategoryMenu from './CategoryMenu'


const CategoryNav = ({setGroupCategory, addRemoveCategory}) => {

  return (
    <nav>
      <h1>Categories</h1>
        <CategoryMenu setGroupCategory = {setGroupCategory} />
      <button onClick={addRemoveCategory} id="category-button"></button>
    </nav>
  )
}

export default CategoryNav