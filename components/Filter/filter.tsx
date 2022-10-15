import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import { FilterSetter } from '../../models/Filter';

const Filter = ({ setFilter }: Props): JSX.Element => {
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
          setFilter(event.target.value.toLowerCase());
        }}
      />
    </Box>
  );
};

export default Filter;

interface Props {
  setFilter: FilterSetter;
}
