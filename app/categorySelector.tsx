import { entities } from '@/app/models';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function CategorySelector({
  defaultEntityType,
  onChange
}: Readonly<{
  defaultEntityType: (typeof entities)[number];
  onChange: (choice: (typeof entities)[number]) => void;
}>) {
  const [filter, setFilter] = useState<(typeof entities)[number]>(defaultEntityType);

  const onChangeInternal = (event: SelectChangeEvent) => {
    const choice = event.target.value as (typeof entities)[number];
    setFilter(choice);
    onChange(choice);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, zIndex: 1 }}>
      <InputLabel>Category</InputLabel>
      <Select label="Category" value={filter} onChange={onChangeInternal} autoWidth>
        {entities.map(category => (
          <MenuItem key={category} value={category}>
            {`${category.substring(0, 1).toUpperCase()}${category.substring(1)}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
