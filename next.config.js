
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-storage-domain.supabase.co'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    NEXT_PUBLIC_CRYPTO_ADDR: process.env.NEXT_PUBLIC_CRYPTO_ADDR,
    NEXT_PUBLIC_FLW_KEY: process.env.NEXT_PUBLIC_FLW_KEY,
  }
};

module.exports = nextConfig;
