import React from 'react'
import './Card.css' // <= Card Styling

// Components
import GroupActions from './GroupActions'

const GroupCard = (props) => {
  return (
    <div className="group-card">

      <div className="card-header">
        <GroupActions {...props} />
      </div>

      <div className="group-title">
        <h2>{props.title}</h2>
      </div>

      <div className="group-avatar">
        {props.avatar}
      </div>

      <div className="group-members">

      </div>
        {props.members}
    </div>
  )
}

export default GroupCard