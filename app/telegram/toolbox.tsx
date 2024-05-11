import { entityTypes } from '@/models/api/Entity';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function Toolbox({
  setChosenEntityType
}: Readonly<{ setChosenEntityType: (choice: (typeof entityTypes)[number]) => void }>) {
  const [filter, setFilter] = useState<(typeof entityTypes)[number]>();

  const onChange = (event: SelectChangeEvent) => {
    const choice = event.target.value as (typeof entityTypes)[number];
    setFilter(choice);
    setChosenEntityType(choice);
  };

  return (
    <Box gridColumn="1/-1" position="sticky" top={0} left={0} zIndex={1}>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 1 }}>
        <InputLabel>Category</InputLabel>
        <Select label="Category" value={filter} onChange={onChange} autoWidth>
          {entityTypes.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
