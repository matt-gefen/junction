import React from 'react'
import './Card.css'

const GroupActions = (props) => {
  console.log(props)
  const ownerId = props.group.owner?._id ? props.group.owner._id : props.group.owner
  const isOwner = props.user?.profile === ownerId

  return (
    isOwner &&
    <div className="interactions">
      {/* GroupEdit/Update Button and service call go here */}
      <button onClick={() => props.handleDeleteGroup(props.group._id)}>Delete</button>
    </div >
  )
}

export default GroupActions