/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      { source: "/react", destination: "/next", permanent: true },
      { source: "/about", destination: "/", permanent: false },
    ];
  },
};

module.exports = nextConfig;
