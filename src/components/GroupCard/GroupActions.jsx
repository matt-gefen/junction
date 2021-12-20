import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

import { getGroupById, updateGroup } from "../../services/groupService";
import { updateProfile, getProfileById } from "../../services/profileService";

const GroupActions = (props) => {
  let  members = props.group.members.map((member) => {
    return member._id
  })
  const [isMember, setIsMember] = useState(members.includes(props.profile._id))
  console.log(props)
  const ownerId = props.group.owner
  const isOwner = props.user?.profile === ownerId
  

  function handleJoinGroup() {
    updateGroup(props.group._id, {
      ...props.group,
      members: [...props.group.members, props.profile]
    })
    updateProfile(props.profile._id, {
      ...props.profile,
      joined_groups: [...props.profile.joined_groups, props.group._id]
    })
    setIsMember(true)
  }

  return (
    <div className="interactions">
    {!isMember &&
      <div>
        <button onClick={handleJoinGroup}>Join Group</button>
      </div>
    }

    {isOwner &&
    <>
      <button><Link to={`/groups/${props.group._id}/edit`}>Edit</Link></button>
      <button onClick={() => props.handleDeleteGroup(props.group._id)}>Delete</button>
    </ >}
    </div>
  )
}

export default GroupActions