import { useState } from 'react'
import GroupForm from '../../components/GroupForm/GroupForm'
import styles from './CreateGroup.module.css'

const CreateGroup = props => {
  const [message, setMessage] = useState([''])

  return (
    <main className={styles.container}>
      <h1>Create Group</h1>
      <p>{message}</p>
      <GroupForm {...props} updateMessage={updateMessage}/>
    </main>
  )
}

export default CreateGroup
