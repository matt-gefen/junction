import React, { useState } from 'react'
import Chip from '@mui/material/Chip'

export default function ToggleChip({ label, handleAddCategory, handleRemoveCategory }) {
  const [selected, setSelected] = useState(false)
  const toggleChip = e => {
    selected ? handleRemoveCategory(label) : handleAddCategory(label)
    setSelected(!selected)
  }

  return (
      <Chip label={label} color="warning" variant={selected ? "" : "outlined"} onClick={toggleChip} value={selected}/>
  )
}