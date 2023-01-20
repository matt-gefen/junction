import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

export default function SwitchLabels(props) {
  const handleSwitch = (event) => {
    let position = event.target.value

    if (!position) {
      props.setHasRegistration(true)
      event.target.value = true
      event.target.name = 'registration'
      props.onChange(event)
    } else {
      props.setHasRegistration(false)
      event.target.value = false
      event.target.name = 'registration'
      props.onChange(event)
    }
  }
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={props.hasRegistration}
            onChange={handleSwitch}
            value={props.hasRegistration}
            name="registration"
          />
        }
        label="Registration for Event?"
      />
    </FormGroup>
  )
}
