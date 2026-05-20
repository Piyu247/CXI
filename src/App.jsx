import React, { useEffect } from 'react';
import Lenis from 'lenis';

// Context
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Layout
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import Futuristic3DBackground from './components/layout/Futuristic3DBackground';
import ThemeToggle from './components/layout/ThemeToggle';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import AIShowcase from './components/sections/AIShowcase';
import CaseStudies from './components/sections/CaseStudies';
import TechStack from './components/sections/TechStack';
import ProcessTimeline from './components/sections/ProcessTimeline';
import Testimonials from './components/sections/Testimonials';
import Careers from './components/sections/Careers';
import Contact from './components/sections/Contact';

function AppInner() {
  const { isDark } = useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);

    const revealEls = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.transitionDelay = `${el.dataset.revealDelay || '0'}s`;
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.03,   // fire when just 3% of element is visible
        rootMargin: '0px', // no offset — reveal as soon as element enters view
      }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Safety-net: if observer misses any element, force reveal after 1.5s
    const safetyNet = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
        el.classList.add('revealed');
      });
    }, 1500);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      observer.disconnect();
      clearTimeout(safetyNet);
    };
  }, []);

  return (
    <div className={`app ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <CustomCursor />
      <Futuristic3DBackground isDark={isDark} />
      {/* Cinematic theme toggle — fixed top-right */}
      <div style={{ position:'fixed', top:'1.35rem', right:'5rem', zIndex:200 }}>
        <ThemeToggle />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <AIShowcase />
        <CaseStudies />
        <TechStack />
        <ProcessTimeline />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
