import React, { useState, useEffect } from 'react'

// Services
import { getAllGroups, deleteGroup } from '../../services/groupService'

import { getProfileById } from '../../services/profileService'

// Components 
import GroupCard from '../../components/GroupCard/GroupCard'
import CategoryMenu from '../../components/CategoryNav/CategoryMenu'

const GroupList = (props) => {
  const [groups, setGroups] = useState([])
  const [profile, setProfile] = useState()

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId)
      setGroups(groups.filter((group) => group._id !== groupId))
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const fetchAllGroups = async () => {
      const groupData = await getAllGroups()
      const profileData = await getProfileById(props.user.profile)
      setGroups(groupData)
      setProfile(profileData)
    }
    fetchAllGroups()
    return () => { setGroups([]) }
  }, [props.user.profile])

  return (
    <div className='layout'>
      <CategoryMenu user={props.user}/>
      { profile && groups?.map((group) => (
        <GroupCard
          group={group}
          key={group._id}
          user={props.user}
          profile={profile}
          handleDeleteGroup={handleDeleteGroup}
        />
      ))}
    </div>
  )
}

export default GroupList