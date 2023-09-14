/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

const withPWA = require('next-pwa')({
  disable: !(process.env.NODE_ENV === 'production'),
  dest: 'public'
});

module.exports = withPWA(nextConfig);
