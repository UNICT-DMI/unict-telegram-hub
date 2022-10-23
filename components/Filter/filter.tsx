import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
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
