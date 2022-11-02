/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movie',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
