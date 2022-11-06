import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { FilterSetter } from '../../models/Filter';
import { routes } from '../../pages';
import Filter from '../Filter/Filter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const DesktopNavigation = ({ setFilter }: Props): JSX.Element => {
  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {routes.map(route =>
          route.subRoutes ? (
            <div key={route.href}>
              <NavigationMenu route={route} />
            </div>
          ) : (
            <Button key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </Button>
          )
        )}
      </Box>
      <Filter setFilter={setFilter} />
    </>
  );
};

export default DesktopNavigation;

interface Props {
  setFilter: FilterSetter;
}
