import React from 'react'
import { Link } from "react-router-dom";
import './Card.css' // <= Card Styling

// Components
import GroupActions from './GroupActions'

const GroupCard = (props) => {
console.log("GroupCardProps",props)
  return (
  <>
    <div className="group-card">

      <div className="card-header">
      {props.user &&
      <> 
      <GroupActions {...props} />
      </>}
      </div>

      <div className="group-title">
        <Link to={`/groups/${props.group._id}`}><h2>{props.group.title}</h2></Link>
      </div>

      <div className="group-avatar">
        <Link to={`/groups/${props.group._id}`}>
          <img src={props.group.avatar} alt="group avatar"/>
        </Link>
      </div>

      <div className="group-members">

      </div>
        {/* {props.group.members} */}
    </div>
  </>
  )
}

export default GroupCard