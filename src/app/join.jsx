'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for confirmation!');
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-lg w-full max-w-md text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Join JFX Academy</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded">
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Already a member? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </form>
    </section>
  );
}
