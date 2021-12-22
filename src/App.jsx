import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import CreateGroup from './pages/CreateGroup/CreateGroup'
import Group from './pages/Group/Group'
import UpdateGroup from './pages/UpdateGroup/UpdateGroup'
import CreatePost from './pages/CreatePost/CreatePost'
import PostDetails from './pages/Post/PostDetails'
import EditPost from './pages/Post/EditPost'
import * as authService from './services/authService'
import GroupIndex from './pages/GroupIndex/GroupIndex'
import FavoritePosts from './pages/FavoritePosts/FavoritePosts'
import LocationSearch from './components/LocationSearch/LocationSearch'
import MyGroups from './pages/MyGroups/MyGroups'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const randomSeed = () => {
    return Math.floor(Math.random() * 9999999999)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<GroupIndex user={user} />} />
        <Route path="/groups" element={<GroupIndex user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} randomSeed={randomSeed}/>}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles/:id/favorites"
          element={user ? <FavoritePosts user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/mygroups"
          element={user ? <MyGroups user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/new"
          element={user ? <CreateGroup /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/:id"
          element={user ? <Group user={user}/> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/:id/edit"
          element={user ? <UpdateGroup /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/:id/posts"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route 
          path="/groups/:id/posts/:postId"
          element={<PostDetails user={user}/>}
        />
        <Route 
          path="/groups/:id/posts/:postId/edit"
          element={<EditPost user={user}/>}
        />
      </Routes>
    </>
  )
}

export default App
