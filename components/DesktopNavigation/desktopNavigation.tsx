import { Box, Button } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { routes } from '../../pages';
import { FilterSetter } from '../../pages/[submodule]';
import Filter from '../Filter/Filter';

const DesktopNavigation: NextPage<FilterSetter> = ({ setFilter }) => {
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
