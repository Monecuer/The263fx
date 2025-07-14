'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';
import GoogleAd from './components/GoogleAd'; // Optional: global ad component
import AIPopup from './components/AIPopup';
import WhatsappSupport from './components/WhatsappSupport';

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

      {/* ✅ AdSense Block */}
      <div className="flex justify-center my-10">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: 320, minHeight: 50 }}
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
      <GoogleAd /> {/* Optional additional slot */}
      <AIPopup />
      <WhatsappSupport />
    </>
  );
}
