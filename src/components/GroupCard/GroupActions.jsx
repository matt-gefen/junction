import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

import { updateGroup } from "../../services/groupService";
import { updateProfile} from "../../services/profileService";


import PopupMenu from '../MaterialUI/PopupMenu'


const GroupActions = (props) => {
  const navigate = useNavigate()
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

function editReroute() {
  navigate(`/groups/${props.group._id}/edit`)
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
  
  function triggerMyGroupRefresh() {
    handleLeaveGroup()
    props.beenClicked()
  }
  function triggerDeleteGroupRefresh() {
    props.handleDeleteGroup(props.group._id)
    props.beenClicked()
  }
  
  let popUpOptions = [ ]

  if (!isMember) {
      popUpOptions=
        [ 
          ['Join Group', handleJoinGroup] 
        ]
      
  }else if (isOwner) {
    popUpOptions=
        [ 
          ['Edit', editReroute],
          ['Delete', triggerDeleteGroupRefresh]
        ]
  } else if (isMember){ 
  popUpOptions=
        [
          ['Leave Group', triggerMyGroupRefresh]
        ]
  } 
  

  return (
    <div className={styles.interactions}>
      <PopupMenu 
        options = {popUpOptions}
          />
 </div>
  )
  }

export default GroupActions