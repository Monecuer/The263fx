'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { FaUserCircle, FaSignOutAlt, FaBook, FaRobot, FaCertificate, FaSmileWink } from 'react-icons/fa';
import jsPDF from 'jspdf';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMentor, setShowMentor] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      setLoadingText('Loading' + '.'.repeat(dots));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function init() {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) return router.push('/login');
      setUser(u);

      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', u.id).single();
      setProfile(profileData);

      const { data: enrolls } = await supabase
        .from('enrollments')
        .select('course_id, courses(name, description)')
        .eq('user_id', u.id);

      setEnrolledCourses(enrolls.map(e => ({
        id: e.course_id,
        name: e.courses.name,
        description: e.courses.description
      })));

      const { data: progressData } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', u.id);

      setProgress(progressData);
      setLoading(false);
    }
    init();
  }, []);

  const handleGenerateCertificate = async (courseName) => {
    const doc = new jsPDF();
    doc.text(`Certificate of Completion`, 70, 40);
    doc.text(`This certifies that`, 80, 60);
    doc.text(`${profile?.name || user?.email}`, 80, 70);
    doc.text(`completed the course: ${courseName}`, 40, 90);
    doc.save(`${courseName}_certificate.pdf`);

    const blob = doc.output("blob");
    const fileName = `${user.id}_${courseName}.pdf`;
    await supabase.storage.from('certificates').upload(fileName, blob, {
      contentType: 'application/pdf'
    });

    await supabase.from('certificates').insert({
      user_id: user.id,
      cert_title: courseName,
      cert_url: fileName
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <FaSmileWink className="text-yellow-400 text-6xl animate-bounce" />
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono text-blue-300 animate-pulse">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
          <FaUserCircle /> Hello, {profile?.name || user?.email}
        </h1>
        <div className="flex gap-4">
          <button onClick={() => setShowMentor(!showMentor)} className="bg-purple-600 px-4 py-2 rounded flex items-center gap-2">
            <FaRobot /> AI Mentor
          </button>
          <a href="/academy" className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2">
            <FaBook /> Academy
          </a>
          <button onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }} className="bg-red-600 px-4 py-2 rounded flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6">
        {enrolledCourses.map(course => {
          const prog = progress.find(p => p.module_name === course.name);
          return (
            <div key={course.id} className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p>{course.description}</p>
              <p className="mt-2 text-sm">Progress: {prog?.percentage_complete ?? 0}%</p>
              {prog?.percentage_complete >= 100 && (
                <button
                  onClick={() => handleGenerateCertificate(course.name)}
                  className="mt-3 bg-green-600 px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaCertificate /> Download Certificate
                </button>
              )}
            </div>
          );
        })}
      </div>

      {showMentor && (
        <div className="fixed bottom-6 right-6 bg-gray-800 p-4 rounded-lg w-80 shadow-lg z-50">
          <h3 className="font-semibold text-lg mb-2">AI Mentor</h3>
          <p className="text-sm text-gray-300">Hi! I'm your AI mentor. Ask me anything about your course, progress, or how to get started. (Coming soon with OpenAI!)</p>
        </div>
      )}
    </div>
  );
}
