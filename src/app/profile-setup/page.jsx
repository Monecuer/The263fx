'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import EditProfile from '../components/EditProfile'; // Adjust path if needed
import { FaUserEdit, FaBullseye } from 'react-icons/fa';

export default function ProfileSetupPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        router.push('/login'); // Use Next.js router
        return;
      }

      setUser(session.user);
      setLoading(false);
    }

    loadUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return <EditProfile user={user} />;
}
