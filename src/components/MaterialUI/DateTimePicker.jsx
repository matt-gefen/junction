import React from 'react'
import TextField from '@mui/material/TextField'

export default function DateTimePicker(props) {

  return (
      <TextField
        fullWidth
        id="datetime-local"
        label="Event Date and Time"
        type="datetime-local"
        name="date"
        defaultValue=""
        value={props.date}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.handleChange}
      />
  )
}