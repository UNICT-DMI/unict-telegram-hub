/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'production' ? false : true,
  dest: 'public'
});

module.exports = withPWA(nextConfig);
