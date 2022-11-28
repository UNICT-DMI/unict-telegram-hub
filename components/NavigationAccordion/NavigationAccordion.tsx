import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { Route } from '../../models/Route';
import { useState } from 'react';

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const NavigationAccordion = ({ route, setIsOpen }: Props): JSX.Element => {
  const router = useRouter();

  const handleNavigation = (href: string, query?: Record<string, string>) => {
    router.push({
      pathname: href,
      query
    });
  };

  return (
    <Accordion key={route.href}>
      <StyledAccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <Typography>{route.label}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {route.subRoutes?.map(subroute => (
            <Button
              key={subroute.label}
              onClick={() => {
                setIsOpen(false);
                handleNavigation(`${route.href}/${subroute.href}`, subroute.queryParameters);
              }}>
              {subroute.label}
            </Button>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default NavigationAccordion;

interface Props {
  route: Route;
  setIsOpen: ReturnType<typeof useState<boolean>>[1];
}
