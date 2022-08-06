const path = require('path');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws://${process.env.NEXT_PUBLIC_SERVER_URL} ${process.env.NEXT_PUBLIC_SERVER_URL} storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/; img-src 'self' storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/ data:`,
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

let config = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['storage.yandexcloud.net'],
    deviceSizes: [36, 40, 44, 60, 68, 76, 90, 116, 140, 310, 600, 900, 1200],
    imageSizes: [],
  },
  async headers() {
    const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

    return isProduction
      ? [
          {
            source: '/:path*',
            headers: securityHeaders,
          },
        ]
      : [];
  },
  experimental: {
    outputStandalone: true,
  },
};

if (process.env.ANALYZE) {
  config = require('@next/bundle-analyzer')({ enabled: true })({});
}

module.exports = config;
