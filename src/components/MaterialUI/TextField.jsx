import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

export default function MultilineTextFields({ defaultValue, editable, label, name, handleChange }) {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')

  const textChange = (event) => {
    setValue(event.target.value)
    handleChange(event)
  }

  return (
    <TextField
      name={name}
      id="outlined-multiline-flexible"
      label={label}
      multiline
      maxRows={4}
      value={value}
      onChange={textChange}
      InputProps={{
        readOnly: !editable,
      }}
    />
  )
}