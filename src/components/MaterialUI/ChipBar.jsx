import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'

export default function ChipBar({ labels }) {
  return (
    <Box fullHeight sx={{ flexGrow: 1, width: 1 }}>
      <AppBar fullHeight position="static">
        <Toolbar fullHeight>
          <Box  fullHeight sx={{ flexGrow: 1}} >
            {labels}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}