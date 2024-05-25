import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UNICT Hub',
  description: 'UNICT Hub'
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
            <header className="header">
              <Typography variant="h1">UNICT Hub</Typography>
            </header>
            <main className="main">{children}</main>
            <footer className="footer">
              <Box display="flex" justifyContent="space-between">
                <Typography>Made by students for students 💛</Typography>
                <a rel="noreferrer" href={'https://github.com/UNICT-DMI/unict-hub'}>
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
