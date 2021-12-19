import React from 'react'
import './Card.css' // <= Card Styling

// Components
import GroupActions from './GroupActions'

const GroupCard = (props) => {
  console.log(props)
  return (
    <div className="group-card">

      <div className="card-header">
        <GroupActions {...props} />
      </div>

      <div className="group-title">
        <h2>{props.group.title}</h2>
      </div>

      <div className="group-avatar">
        <img src={props.group.avatar}/>
      </div>

      <div className="group-members">

      </div>
        {/* {props.group.members} */}
    </div>
  )
}

export default GroupCard