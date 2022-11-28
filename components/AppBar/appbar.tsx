import { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import useIsMobile from '../../hooks/useIsMobile';
import Filter from '../Filter/filter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import NavigationAccordion from '../NavigationAccordion/NavigationAccordion';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../../models/Route';
import type { FilterSetter } from '../../models/Filter';

const AppBarWrapper = ({ setFilter }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function getLinks(isMobile: boolean) {
    return routes.map(route => {
      if (route.subRoutes) {
        return isMobile ? (
          <NavigationAccordion route={route} setIsOpen={setIsOpen as any} key={route.href} />
        ) : (
          <NavigationMenu route={route} key={route.href} />
        );
      }

      return (
        <Button key={route.href} onClick={() => setIsOpen(false)}>
          <Link href={route.href}>{route.label}</Link>
        </Button>
      );
    });
  }

  return (
    <AppBar color='secondary' enableColorOnDark position='sticky'>
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {useIsMobile() ? (
            <>
              <Button onClick={() => setIsOpen(true)}>
                <MenuIcon />
              </Button>
              <SwipeableDrawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>{getLinks(true)}</Box>
              </SwipeableDrawer>
            </>
          ) : (
            getLinks(false)
          )}
        </Box>
        <Filter setFilter={setFilter} />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWrapper;

interface Props {
  setFilter: FilterSetter;
}
