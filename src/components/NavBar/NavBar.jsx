import { Link } from 'react-router-dom'

// Components
import AppNavBar from '../../components/MaterialUI/AppNavBar'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <AppNavBar 
          user={user}
          handleLogout={handleLogout}
        />
      :
        <nav>
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/groups">Discover Groups</Link></li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
