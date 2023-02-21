/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "qaxaxavcjwkovxyqglpb.supabase.co"],
  },
};

module.exports = nextConfig;
