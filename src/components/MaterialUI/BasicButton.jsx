import React from 'react'
import Button from '@mui/material/Button'

export default function BasicButton({ text, handleClick, isFormInvalid }) {
  return (
      <Button onClick={handleClick} variant="contained" disabled={isFormInvalid}>{text}</Button>
  )
}