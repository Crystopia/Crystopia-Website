import type { NextConfig } from "next";

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/discord',
      destination: 'https://cystopia.link/discord',
      permanent: true,
    },
    {
      source: '/blogs',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/guides',
      destination: '/guide',
      permanent: true,
    },
    {
      source: '/blogs/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
    
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }, {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
};


export default nextConfig;
