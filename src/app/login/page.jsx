'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setError(error.message);
    }
    // OAuth flow redirects automatically, no need to push router here
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <input
        type="email"
        className="mb-4 p-3 w-full max-w-sm bg-gray-800 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
      />

      <input
        type="password"
        className="mb-4 p-3 w-full max-w-sm bg-gray-800 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
      />

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        className="mb-6 px-6 py-3 w-full max-w-sm bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="flex items-center space-x-4">
        <span className="text-gray-400">or</span>
        <button
          onClick={handleGoogleLogin}
          aria-label="Login with Google"
          className="p-3 rounded-full bg-white hover:shadow-lg transition shadow-md"
          title="Login with Google"
        >
          <FcGoogle size={28} />
        </button>
      </div>

      <a href="/forgot-password" className="mt-6 text-blue-400 hover:underline">
        Forgot password?
      </a>
    </div>
  );
}
