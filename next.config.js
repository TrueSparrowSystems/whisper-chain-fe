/** @type {import('next').NextConfig} */
// const securityHeaders = require('./headers.js');
const securityHeaders = require('./headers')

module.exports = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.w3s.link",
      },
      {
        protocol: "https",
        hostname: "cdn.stamp.fyi",
        pathname: "/avatar/**",
      },
      {
        protocol: "https",
        hostname: "i.picsum.photos",
        pathname: "/id/**",
      },
      {
        protocol: "https",
        hostname: "plg-whisperchain-xyz.s3.amazonaws.com",
        pathname: "/stability/**",
      },
      {
        protocol: "https",
        hostname: "whisperchain-staging-assests.s3.amazonaws.com",
        pathname: "/stability/**",
      },
      {
        protocol: "https",
        hostname:
          "whisperchain-staging-static-files.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "static.staging.whisperchain.xyz",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    path: process.env.W_CDN_IMAGE_RESIZER_URL,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  env: {
    /* WARNING!!! THESE ARE ACCESSABLE IN FRONTEND CODE! BE-AWARE */
    W_DOMAIN: process.env.W_DOMAIN,
  },
};
