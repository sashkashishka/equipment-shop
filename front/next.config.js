const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      include: [path.resolve(__dirname, 'src/images/icons')],
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
