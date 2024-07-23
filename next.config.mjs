/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';

const withPwa = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
});

const nextConfig = withPwa({
  output: 'standalone'
});

export default nextConfig;
