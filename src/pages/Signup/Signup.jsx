import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'

const Signup = props => {
  const [message, setMessage] = useState([''])
  const [avatar, setAvatar] = useState(`https://avatars.dicebear.com/api/personas/${props.randomSeed()}.svg`)

  const updateMessage = msg => {
    setMessage(msg)
  }

  const resetSeed = () => {
    console.log('old', avatar)
    let newSeed = props.randomSeed()
    console.log(newSeed)
    setAvatar(`https://avatars.dicebear.com/api/personas/${newSeed}.svg`)
    console.log('new', avatar)
  }
  console.log('newest', avatar)

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <SignupForm {...props} updateMessage={updateMessage} avatar={avatar} resetSeed={resetSeed}/>
    </main>
  )
}

export default Signup
