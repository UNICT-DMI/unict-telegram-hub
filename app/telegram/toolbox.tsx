'use client';

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

const selections = ['Channels', 'Groups', 'Bots'] as const;

export default function Toolbox() {
  const [filter, setFilter] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <Box gridColumn="main" position="sticky" top={0} left={0}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select label="Category" value={filter} onChange={handleChange} autoWidth>
          {selections.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
