import React from 'react'
import AvatarGroup from '@mui/material/AvatarGroup'

export default function GroupAvatars({ avatars }) {
  return (
    <AvatarGroup max={5}>
      {avatars}
    </AvatarGroup>
  )
}