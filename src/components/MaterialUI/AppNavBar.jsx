import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function AppNavBar({ user, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMainMenuOpen = Boolean(menuAnchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMainMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleMainMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'

  const renderMainMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMainMenuOpen}
      onClose={handleMainMenuClose}
    >
      <MenuItem onClick={handleMainMenuClose}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/groups">Discover Groups</Link>
      </MenuItem>
      {user && 
        <>
          <MenuItem onClick={handleMainMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/groups/new">Create a Group</Link>
          </MenuItem>
          <MenuItem onClick={handleMainMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/groups/mygroups">My Groups</Link>
          </MenuItem>
          <MenuItem onClick={handleMainMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/profiles/${user.profile}/favorites`}>Favorite Posts</Link>
          </MenuItem>
        </>
      }
    </Menu>
  )

  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? 
        <>
          {/* <MenuItem onClick={handleMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Profile</Link>
          </MenuItem> */}
          <MenuItem onClick={handleMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/login" onClick={handleLogout}>Log Out</Link>
          </MenuItem>
        </>
        :
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/signup">Sign Up</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">Log In</Link>
          </MenuItem>
        </>
      }
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{flexGrow: 1 }}>
      <AppBar sx={{height: "100%"}} position="static">
        <Toolbar sx={{height: "100%"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMainMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <img style={{width:"50px"}} src="https://i.imgur.com/Dj1wRPL.png" alt="logo" />
          <h1 style={{color:"white"}}>Junction</h1>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/login" onClick={handleLogout}>Log Out</Link>
          </Box> */}
          <Box sx={{ display: { xs: 'flex', md: 'flex' }}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMainMenu}
      {renderMenu}
    </Box>
  )
}