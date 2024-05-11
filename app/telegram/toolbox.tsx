import { entities } from '@/app/telegram/models';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function Toolbox({
  setChosenEntityType
}: Readonly<{ setChosenEntityType: (choice: (typeof entities)[number]) => void }>) {
  const [filter, setFilter] = useState<(typeof entities)[number]>();

  const onChange = (event: SelectChangeEvent) => {
    const choice = event.target.value as (typeof entities)[number];
    setFilter(choice);
    setChosenEntityType(choice);
  };

  return (
    <Box gridColumn="1/-1" position="sticky" top={0} left={0} zIndex={1}>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 1 }}>
        <InputLabel>Category</InputLabel>
        <Select label="Category" value={filter} onChange={onChange} autoWidth>
          {entities.map(category => (
            <MenuItem key={category} value={category}>
              {`${category.substring(0, 1).toUpperCase()}${category.substring(1)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
