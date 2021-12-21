import React from 'react'
import Avatar from '@mui/material/Avatar'

export default function ImageAvatar({ image }) {
  return (
      <Avatar
        alt="avatar icon"
        src={image}
      />
  )
}