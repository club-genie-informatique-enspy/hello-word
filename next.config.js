const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Ajouter le plugin MiniCssExtractPlugin
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash].css',
      })
    );

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
  typescript: {
    ignoreBuildErrors: true, 
  }
};

module.exports = nextConfig;