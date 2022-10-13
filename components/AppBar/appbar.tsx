import { AppBar, Toolbar } from '@mui/material';
import type { NextPage } from 'next';
import useIsMobile from '../../hooks/useIsMobile';
import { FilterSetter } from '../../pages/[submodule]';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';

const AppBarWrapper: NextPage<FilterSetter> = ({ setFilter }) => {
  return (
    <AppBar color='secondary' enableColorOnDark position='sticky'>
      <Toolbar>
        {useIsMobile() ? <span>MOBILE</span> : <DesktopNavigation setFilter={setFilter} />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWrapper;
