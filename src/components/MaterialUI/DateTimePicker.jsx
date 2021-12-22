import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function DateTimePicker(props) {

  return (

      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        name="date"
        defaultValue=""
        value={props.date}
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.handleChange}
      />

  );
}