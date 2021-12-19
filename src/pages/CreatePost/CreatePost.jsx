import { useState } from 'react'
import PostForm from '../../components/PostForm/PostForm'
import styles from './CreatePost.module.css'

const CreatePost = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h1>Create Post</h1>
      <p>{message}</p>
      <PostForm {...props} updateMessage={updateMessage}/>
    </main>
  )
}

export default CreatePost
