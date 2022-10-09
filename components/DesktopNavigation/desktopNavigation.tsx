import { Box, Button } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { routes } from '../../pages';

const DesktopNavigation: NextPage = () => {
  return (
    <Box>
      {routes.map((route, index) => (
        <Button key={index}>
          <Link href={route.href}>{route.label}</Link>
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNavigation;

interface LinkTabProps {
  label: string;
  href: string;
}
