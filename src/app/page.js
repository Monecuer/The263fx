
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';
import AIPopup from './components/AIPopup';

      {/* AdSense Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4437850977433689"
        data-ad-slot="1234567890" // <-- Replace with your Ad Slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="adsbygoogle-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <CourseModules />
      <Testimonials />
      <Results />
      <Footer />
    </>
  );
}
