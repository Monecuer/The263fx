// app/page.js
'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';
import AIPopup from './components/AIPopup';
import WhatsappSupport from './components/WhatsappSupport';
import GoogleAd from './components/GoogleAd';

export default function Home() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />

      {/* Inline AdSense Ad Unit */}
      <div className="flex justify-center my-10" style={{ minWidth: 320, minHeight: 50 }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '320px', minHeight: '50px' }}
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

      {/* Support & Assistant */}
      <AIPopup />
      <WhatsappSupport />
      <GoogleAd />
    </>
  );
}
