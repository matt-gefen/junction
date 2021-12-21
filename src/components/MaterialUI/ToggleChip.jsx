import React, { useState } from 'react'
import Chip from '@mui/material/Chip'

export default function ToggleChip({ label }) {
  const [selected, setSelected] = useState(false)
  const handleClick = () => {
    setSelected(!selected)
  }

  return (
      <Chip label={label} color="warning" variant={selected ? "" : "outlined"} onClick={handleClick} />
  )
}