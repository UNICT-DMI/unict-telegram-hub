import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import useIsMobile from '../../hooks/useIsMobile';
import Filter from '../Filter/filter';
import type { FilterSetter } from '../../models/Filter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../../models/Route';

const AppBarWrapper = ({ setFilter }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string, query?: Record<string, string>) => {
    router.push({
      pathname: href,
      query
    });
  };

  function getLinks(isMobile: boolean) {
    return routes.map(route => {
      if (route.subRoutes) {
        if (isMobile) {
          return (
            <Accordion key={route.href}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{route.label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {route.subRoutes?.map(subroute => (
                    <Button
                      key={subroute.label}
                      onClick={() => {
                        setIsOpen(false);
                        handleNavigation(
                          `${route.href}/${subroute.href}`,
                          subroute.queryParameters
                        );
                      }}>
                      {subroute.label}
                    </Button>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        }

        return <NavigationMenu route={route} key={route.href} />;
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
              <Button onClick={() => setIsOpen(true)}><MenuIcon /></Button>
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
