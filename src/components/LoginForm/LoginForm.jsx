import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'

// Services
import * as authService from '../../services/authService'

// Components
import PasswordField from '../MaterialUI/PasswordField'
import TextField from '../MaterialUI/TextField'
import BasicButton from '../MaterialUI/BasicButton'

const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    console.log('event target', e)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/groups')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <TextField value={formData.email} editable={true} label="Email" name="email" handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <PasswordField name="pw" value={formData.pw} handleChange={handleChange}/>
      </div>
      <div>
        <button className={styles.hiddenButton}>
          <BasicButton text={"Log In"}/>
        </button>
        {/* <button className={styles.button}>Log In</button> */}
        <Link to="/groups">
        <button className={styles.hiddenButton}>
          <BasicButton text={"Cancel"}/>
        </button>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
