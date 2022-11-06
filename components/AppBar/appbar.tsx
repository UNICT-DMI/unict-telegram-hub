import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useIsMobile from '../../hooks/useIsMobile';
import { FilterSetter } from '../../models/Filter';
import DesktopNavigation from '../DesktopNavigation/desktopNavigation';

const AppBarWrapper = ({ setFilter }: Props) => {
  return (
    <AppBar color='secondary' enableColorOnDark position='sticky'>
      <Toolbar>
        {useIsMobile() ? (
          <span>UNICT Telegram Hub</span>
        ) : (
          <DesktopNavigation setFilter={setFilter} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWrapper;

interface Props {
  setFilter: FilterSetter;
}
