import React, { useState, useEffect } from 'react'

// Services
import { getAllGroups, deleteGroup } from '../../services/groupService'

// Components 
import GroupCard from '../../components/GroupCard/GroupCard'
import CategoryMenu from '../../components/CategoryNav/CategoryMenu'

const GroupList = (props) => {
  const [groups, setGroups] = useState([])


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
      setGroups(groupData)
    }
    fetchAllGroups()
    return () => { setGroups([]) }
  }, [])

  return (
    <div className='layout'>
    <div >
      <CategoryMenu />
    </div>
      {groups?.map((group) => (
        <GroupCard
          group={group}
          key={group._id}
          user={props.user}
          handleDeleteGroup={handleDeleteGroup}
        />
      ))}
    </div>
  )
}

export default GroupList