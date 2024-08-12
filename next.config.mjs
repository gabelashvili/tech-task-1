/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tabs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
