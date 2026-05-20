import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import './Hero.css';

const HEADLINE = 'Transforming Ideas into Digital Reality';

const HeroChar = ({ char, index, total }) => (
  <motion.span
    className="hero-char"
    initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{
      duration: 0.7,
      delay: 0.5 + index * 0.028,
      ease: [0.16, 1, 0.3, 1],
    }}
    aria-hidden={char === ' ' ? undefined : 'true'}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const chars = HEADLINE.split('');

  const stats = [
    { val: '200+', label: 'Projects Delivered' },
    { val: '50+', label: 'Global Clients' },
    { val: '8+', label: 'Years of Excellence' },
    { val: '99.9%', label: 'Uptime Guaranteed' },
  ];

  return (
    <section id="home" className="hero-section section" ref={sectionRef}>
      {/* Ambient glows */}
      <div className="hero-glow hero-glow--blue" />
      <div className="hero-glow hero-glow--purple" />

      <motion.div className="container hero-container" style={{ y, opacity }}>
        {/* Badge */}
        <motion.div
          className="section-label hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={12} />
          AI-Powered Digital Agency · Est. 2016
        </motion.div>

        {/* Headline */}
        <h1 className="hero-headline" aria-label={HEADLINE}>
          {chars.map((c, i) => (
            <HeroChar key={i} char={c} index={i} total={chars.length} />
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle text-body-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          We craft immersive AI-powered digital experiences that push the boundary of
          what's possible — fusing WebGL, intelligent systems, and premium UI to transform
          ambitious ideas into world-class products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#case-studies" id="hero-cta-work" className="btn btn-primary hero-btn-primary">
            View Our Work <ArrowRight size={16} />
          </a>
          <a href="#services" id="hero-cta-services" className="btn btn-secondary hero-btn-secondary">
            Explore Services
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 + i * 0.1, duration: 0.6 }}
            >
              <span className="hero-stat-val text-gradient">{s.val}</span>
              <span className="hero-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        aria-label="Scroll to About section"
      >
        <span className="hero-scroll-label">Scroll</span>
        <motion.div
          className="hero-scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ChevronDown size={14} />
      </motion.a>
    </section>
  );
};

export default Hero;
