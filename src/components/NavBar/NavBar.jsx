import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav>
          <ul>
            {/* <li>Welcome, {user.name}</li> */}
            <li><Link to="/groups">Discover Groups</Link></li>
            <li><Link to="/groups">Your Groups</Link></li>
            <li><Link to="/groups/new">Create Group</Link></li>
            <li><Link to="" onClick={handleLogout}>Log Out</Link></li>
          </ul>
        </nav>
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
