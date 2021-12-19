import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import GroupForm from '../../components/GroupForm/GroupForm'
import styles from './UpdateGroup.module.css'

import { getGroupById, updateGroup } from "../../services/groupService";

const UpdateGroup = props => {
  const [message, setMessage] = useState([''])
  const navigate = useNavigate();

  const updateMessage = msg => {
    setMessage(msg)
  }

  // const updateGroup = async (groupId) => {
  //   try {
  //     const updatedGroup = await updateGroup(groupId)
  //     setGroup(updatedGroup)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  return (
    <main className={styles.container}>
      <h1>Update Group</h1>
      <p>{message}</p>
      <GroupForm {...props} updateMessage={updateMessage}/>
    </main>
  )
}

export default UpdateGroup
