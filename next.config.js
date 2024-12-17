// next.config.js
const { resolve } = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
    ],
    domains: ['picsum.photos'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
      config.resolve.modules.push(resolve('./node_modules'));
    }
    return config;
  },
};
