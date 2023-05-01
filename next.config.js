const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

const withPWA = require('next-pwa')({
  disable: prod ? false : true,
  dest: 'public',
  sw: 'service-worker.js'
});

module.exports = withPWA(nextConfig);
