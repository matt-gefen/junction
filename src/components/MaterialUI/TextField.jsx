import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

export default function MultilineTextFields({ value, editable, label, name, handleChange }) {

  return (
    <TextField 
      fullWidth
      name={name}
      id="outlined-multiline-flexible"
      label={label}
      multiline
      maxRows={4}
      value={value}
      onChange={handleChange}
      InputProps={{
        readOnly: !editable,
      }}
    />
  )
}