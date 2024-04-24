/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fevjuhuvesfsddcadniz.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
