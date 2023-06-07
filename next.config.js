const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // swSrc: 'service-worker.js',
});

module.exports = withPWA({
  output: 'standalone',
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
});
