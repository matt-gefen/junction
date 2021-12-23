import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import categories from '../../data/categories'

export default function BasicSelect(props) {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
    props.setGroupCategory(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select">{props.name}</InputLabel>
        <Select
          labelId="selector"
          id="category-select"
          value={category}
          label="category"
          onChange={handleChange}
          name="category"
        >
          {categories.map((element)=> 
          <MenuItem value={element}>{element}</MenuItem>
        
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
