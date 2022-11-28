import React from 'react';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/material/styles/styled';
import { Route } from '../../models/Route';

const NavigationMenu = ({ route }: Props): JSX.Element => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleNavigation = (href: string, query?: Record<string, string>) => {
    router.push({
      pathname: href,
      query
    });
  };

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
  }));

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        {route.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        {route.subRoutes?.map(subroute => (
          <StyledMenuItem
            key={subroute.label}
            onClick={() => {
              handleNavigation(`${route.href}/${subroute.href}`, subroute.queryParameters);
              handleClose();
            }}
            sx={{ width: 220 }}>
            {subroute.label}
          </StyledMenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavigationMenu;

interface Props {
  route: Route;
}
