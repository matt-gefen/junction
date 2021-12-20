import React from 'react'
import categories from '../../data/categories'

const CategoryMenu = (props) => {

let groupCategories = new Set(categories.map((element, index) => {
  return element
}))

let categoryOptions = []

groupCategories.forEach((element, index) =>{
  categoryOptions.push(
   <div key={index}>{element}</div> 
  )
})

  return (

<>
<div className='category-selection'>
{categoryOptions}
</div>
</>
      

  )
}

export default CategoryMenu