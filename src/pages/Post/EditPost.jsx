import { useState } from 'react'
import PostForm from '../../components/PostForm/PostForm'
import styles from './PostDetails.module.css'

const EditPost = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h1>Edit Post</h1>
      <p>{message}</p>
      <PostForm {...props} updateMessage={updateMessage} editPost={true} user={props.user}/>
    </main>
  )
}

export default EditPost