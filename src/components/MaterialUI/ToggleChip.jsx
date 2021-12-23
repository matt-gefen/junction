import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'

export default function ToggleChip({ label, handleAddCategory, handleRemoveCategory, select }) {
  const [selected, setSelected] = useState(false)
  const toggleChip = e => {
    selected ? handleRemoveCategory(label) : handleAddCategory(label)
    setSelected(!selected)
  }

  useEffect(() => {
    setSelected(select)
  }, [select])

  return (
      <Chip label={label} color="default" variant={selected ? "outlined" : ""} onClick={toggleChip} value={selected}/>
  )
}