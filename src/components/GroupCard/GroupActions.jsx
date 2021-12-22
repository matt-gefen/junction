import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

import { updateGroup } from "../../services/groupService";
import { updateProfile} from "../../services/profileService";

import BasicButton from '../MaterialUI/BasicButton'

const GroupActions = (props) => {
  let  members = props.group.members.map((member) => {
    return member._id
  })
  const [isMember, setIsMember] = useState(members.includes(props.profile._id))

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


  function handleLeaveGroup() {
    let newMembers = []
    props.group.members.forEach((element) => {
      if(element._id !== props.profile._id) {
        newMembers.push(element)
      }
    })

    let newGroups = []
    props.profile.joined_groups.forEach((element) => {
      if(element._id !== props.group._id) {
        newGroups.push(element)
      }
    })

    updateGroup(props.group._id, {
      ...props.group,
      members: newMembers
    })
    updateProfile(props.profile._id, {
      ...props.profile,
      joined_groups: newGroups
    })
    setIsMember(false)
  }


  return (
    <div className={styles.interactions}>
    {!isMember &&
      <div>
      <button onClick={handleJoinGroup} className={styles.hiddenButton}><BasicButton text={"Join Group"}/></button>
    </div>
    }
    {isMember && !isOwner &&
      <div>
        <button onClick={handleLeaveGroup} className={styles.hiddenButton}><BasicButton text={"Leave Group"}/></button>
      </div>
    }

    {isOwner &&
    <>
      <Link to={`/groups/${props.group._id}/edit`}><BasicButton text={"Edit"}/></Link>
      <button className={styles.hiddenButton} onClick={() => props.handleDeleteGroup(props.group._id)}><BasicButton text={"Delete Group"}/></button>

    </ >}
    </div>
  )
}

export default GroupActions