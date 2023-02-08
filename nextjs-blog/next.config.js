/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    customKey: 'TEST NEXT CONFIG',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/about/:slug*',
        destination: '/',
        has: [{ type: 'query', key: 'test', value: 'rewrite' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/aboutme',
        destination: '/',
        permanent: true,
      },
    ];
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },

  // 설정 전에는 .next 파일로 만들어졌으나 build 로 설정 후엔 build 폴더로 생성
  distDir: 'build',
  devIndicators: {
    buildActivityPosition: 'top-right', // hot reload 위치??
  },
};

module.exports = nextConfig;
