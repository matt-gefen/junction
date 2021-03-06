import React from 'react'
import Button from '@mui/material/Button'

export default function BasicButton({ text, handleClick, isFormInvalid, isActive }) {
  return (
      <Button onClick={handleClick} variant={isActive ? "contained" : "outlined"} disabled={isFormInvalid}>{text}</Button>
  )
}