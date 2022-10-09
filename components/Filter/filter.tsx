import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import { NextPage } from 'next';
import { FilterSetter } from '../../pages/[submodule]';

const Filter: NextPage<FilterSetter> = ({ setFilter }) => {
  return (
    <Box>
      <TextField
        id='outlined-basic'
        variant='outlined'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          )
        }}
        onChange={event => {
          setFilter(event.target.value);
        }}
      />
    </Box>
  );
};

export default Filter;
