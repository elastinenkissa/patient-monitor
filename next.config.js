/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'th.bing.com' }]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const splitChunks = config.optimization && config.optimization.splitChunks;
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups;
        if (cacheGroups) {
          const existingStylesCachegroup = cacheGroups.styles;
          if (existingStylesCachegroup) {
            existingStylesCachegroup.name = 'styles';
          } else {
            cacheGroups.styles = {
              name: 'styles',
              test: /\.(css|sass|scss)$/,
              chunks: 'all',
              enforce: true
            };
          }
        }
      }
    }
    return config;
  }
  
};

module.exports = nextConfig;
