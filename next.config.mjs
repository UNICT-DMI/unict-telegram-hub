/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';

const withPwa = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPwa({
  output: 'standalone',
  turbopack: {}
});

export default nextConfig;
