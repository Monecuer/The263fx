
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CourseModules from './components/CourseModules';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Footer from './components/Footer';

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
