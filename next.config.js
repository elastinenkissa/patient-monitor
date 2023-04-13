/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'th.bing.com' }]
  }
};

module.exports = nextConfig;
