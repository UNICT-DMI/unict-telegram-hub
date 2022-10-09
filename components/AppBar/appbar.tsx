import { AppBar, Toolbar } from '@mui/material';
import type { NextPage } from 'next';
import useIsMobile from '../../hooks/useIsMobile';
import DesktopNavigation from '../DesktopNavigation/desktopNavigation';

const AppBarWrapper: NextPage = () => {
  return (
    <AppBar color='secondary' enableColorOnDark>
      <Toolbar>{useIsMobile() ? <span>MOBILE</span> : <DesktopNavigation />}</Toolbar>
    </AppBar>
  );
};

export default AppBarWrapper;
