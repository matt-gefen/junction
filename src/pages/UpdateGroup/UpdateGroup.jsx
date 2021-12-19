import { useState } from 'react'
import GroupForm from '../../components/GroupForm/GroupForm'
import styles from './UpdateGroup.module.css'

const UpdateGroup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h1>Update Group</h1>
      <p>{message}</p>
      {/* <GroupForm {...props} updateMessage={updateMessage}/> */}
    </main>
  )
}

export default UpdateGroup
