import React from 'react'
import './Card.css'

const GroupActions = (props) => {
  console.log(props)
  const ownerId = props.group.owner
  const isOwner = props.user?.profile === ownerId
  console.log(isOwner)
  console.log("userId ",props.user._id)
  console.log("ownerId",ownerId)
  return (
    isOwner &&
    <div className="interactions">
      {/* GroupEdit/Update Button and service call go here */}
      <button onClick={() => props.handleDeleteGroup(props.group._id)}>Delete</button>
    </div >
  )
}

export default GroupActions