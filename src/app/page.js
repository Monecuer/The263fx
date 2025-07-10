'use client';

import Script from 'next/script';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';
import AIPopup from './components/AIPopup';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />

      {/* Google AdSense Ad Unit */}
      <div className="flex justify-center my-10">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4437850977433689"
          data-ad-slot="1234567890" // ← Replace this with your actual Ad Slot ID
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <Script id="adsbygoogle-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>

      <CourseModules />
      <Testimonials />
      <Results />
      <Footer />
      <AIPopup />
    </>
  );
}
