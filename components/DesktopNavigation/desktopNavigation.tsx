import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { FilterSetter } from '../../models/Filter';
import { routes } from '../../pages';
import Filter from '../Filter/Filter';

const DesktopNavigation = ({ setFilter }: Props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {routes.map((route, index) => (
          <Button key={index}>
            <Link href={route.href}>{route.label}</Link>
          </Button>
        ))}
      </Box>
      <Filter setFilter={setFilter} />
    </>
  );
};

export default DesktopNavigation;

interface Props {
  setFilter: FilterSetter;
}
