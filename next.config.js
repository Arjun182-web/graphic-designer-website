/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ynvpzjhqrobjoyvzmntf.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
