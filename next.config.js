/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
<<<<<<< HEAD
    NEXT_PUBLIC_SUPABASE_URL: 'https://ixzqlvtiuffayfhyovyd.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4enFsdnRpdWZmYXlmaHlvdnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNDgyNjUsImV4cCI6MjA2NzcyNDI2NX0.Metu_iY82Lgf5di7eQBinXb9JSwBgVMg6p709SkNn5c',
  },
}

module.exports = nextConfig
=======
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;

>>>>>>> 66fc5969a63b3fc228917f87af142bc0cf65c359
