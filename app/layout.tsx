import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SearchConsumer from './searchConsumer';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UNICT Telegram Hub',
  description: 'The platform to find out all the telegram links associated to UNICT'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SearchConsumer>{children}</SearchConsumer>
            <footer className="footer">
              <Box display="flex" justifyContent="space-between" marginInline={1}>
                <Typography>Made by students for students 💛</Typography>
                <a rel="noreferrer" href={'https://github.com/UNICT-DMI/unict-telegram-hub'}>
                  Github
                </a>
              </Box>
            </footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
