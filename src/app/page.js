'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />

      {/* Google AdSense Unit */}
      <div className="flex justify-center my-10" style={{ minWidth: 320, minHeight: 50 }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4437850977433689"
          data-ad-slot="2480789669"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <CourseModules />
      <Testimonials />
      <Results />
      <Footer />
    </>
  );
}
