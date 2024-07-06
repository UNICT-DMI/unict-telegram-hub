import { Metadata } from 'next';
import ClientRootLayout from './clientLayout';
import { appDescription, appName } from './manifest';

export const metadata: Metadata = {
  title: appName,
  description: appDescription,
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientRootLayout>{children}</ClientRootLayout>;
}
