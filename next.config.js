/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // This allows loading Google user profile images
  },
}

module.exports = nextConfig