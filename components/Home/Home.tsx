import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import useIsMobile from '../../hooks/useIsMobile';

const StyledH1 = styled('h1')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const StyledH2 = styled('h2')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const Home = (): JSX.Element => {
  const technologies: Array<Technology> = [
    { label: 'React', href: 'https://reactjs.org/' },
    { label: 'Next.js', href: 'https://nextjs.org/' },
    { label: 'Material UI', href: 'https://mui.com/material-ui/getting-started/overview/' },
    { label: 'loading.io', href: 'https://github.com/loadingio/css-spinner/' },
    {
      label: 'medals vector art',
      href: 'https://www.vecteezy.com/vector-art/2110607-gold-silver-bronze-medal-for-winner-tournament'
    }
  ];

  return (
    <Box
      sx={{
        width: useIsMobile() ? '90vw' : '60vw',
        textAlign: 'justify'
      }}>
      <StyledH1 style={{ textAlign: 'center' }}>UNICT Telegram Hub</StyledH1>
      <p>
        This project lists various Telegram links of Channels, Groups and Bots related to the
        University of Catania. To report bugs or give suggestions{' '}
        <StyledLink
          href='https://github.com/UNICT-DMI/unict-telegram-hub'
          target='_blank'
          rel='noreferrer'>
          open a new issue on Github
        </StyledLink>
        .
      </p>
      <StyledH2>Technologies used</StyledH2>
      <ul>
        {technologies.map(technology => (
          <li key={technology.label}>
            <a href={technology.href} target='_blank' rel='noreferrer'>
              {technology.label}
            </a>
          </li>
        ))}
      </ul>
      <StyledH2 style={{ textAlign: 'center' }}>Made by students for students!</StyledH2>
    </Box>
  );
};

export default Home;

interface Technology {
  label: string;
  href: string;
}
