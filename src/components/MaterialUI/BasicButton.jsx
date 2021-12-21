import React from 'react'
import Button from '@mui/material/Button'

export default function BasicButton({ text, handleClick }) {
  return (
      <Button onClick={handleClick} variant="contained">{text}</Button>
  )
}