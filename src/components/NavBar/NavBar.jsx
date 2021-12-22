import { Link } from 'react-router-dom'

// Components
import AppNavBar from '../../components/MaterialUI/AppNavBar'

const NavBar = ({ user, handleLogout }) => {
  return (
    <AppNavBar 
      user={user}
      handleLogout={handleLogout}
    />
  )
}

export default NavBar
