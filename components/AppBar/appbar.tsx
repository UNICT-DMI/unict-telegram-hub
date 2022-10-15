import { AppBar, Toolbar } from '@mui/material';
import useIsMobile from '../../hooks/useIsMobile';
import { FilterSetter } from '../../models/Filter';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';

const AppBarWrapper = ({ setFilter }: Props) => {
  return (
    <AppBar color='secondary' enableColorOnDark position='sticky'>
      <Toolbar>
        {useIsMobile() ? <span>MOBILE</span> : <DesktopNavigation setFilter={setFilter} />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWrapper;

interface Props {
  setFilter: FilterSetter;
}
