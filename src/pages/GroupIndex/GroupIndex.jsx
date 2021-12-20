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
  const [catPrefs, setCatPrefs] = useState([])
  const [userGroupPref, setUserGroupPref] = useState([])

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
      console.log(profileData)
      console.log(groupData)
      setGroups(groupData)
      setProfile(profileData)
      setCatPrefs(profileData.category_prefs)
      const filteredGroups = (groupData.filter(element =>
        {
          console.log("element",element) 
          return profileData.category_prefs.includes(element.category)
        }))
      console.log('before filter')
      setUserGroupPref(filteredGroups)

     }
    fetchAllGroups()
    return () => { setGroups([]) }
  }, [props.user.profile])

  console.log("YOUR_PREFS",catPrefs)
  console.log(userGroupPref)
  console.log(groups)
  return (
    <div className='layout'>
      <CategoryMenu user={props.user}/>
      { profile && userGroupPref?.map((userPref) => (
        <GroupCard
          group={userPref}
          key={userPref._id}
          user={props.user}
          profile={profile}
          handleDeleteGroup={handleDeleteGroup}
        />
      ))}
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