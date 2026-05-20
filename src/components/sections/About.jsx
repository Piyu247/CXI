import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Users, Award, TrendingUp } from 'lucide-react';
import './About.css';

const stats = [
  { icon: Globe,     value: 200,  suffix: '+', label: 'Projects Delivered',   color: 'blue'   },
  { icon: Users,     value: 50,   suffix: '+', label: 'Happy Clients',         color: 'purple' },
  { icon: Award,     value: 8,    suffix: '+', label: 'Years of Excellence',   color: 'cyan'   },
  { icon: TrendingUp,value: 99.9, suffix: '%', label: 'Client Satisfaction',   color: 'blue'   },
];

const values = [
  { icon: Code2, title: 'Engineering Excellence', desc: 'Every line of code is crafted with precision and performance in mind.' },
  { icon: Cpu,   title: 'AI-First Thinking',      desc: 'We embed intelligent automation and data-driven decisions into everything we build.' },
  { icon: Globe, title: 'Global Impact',           desc: 'Our digital products serve users across 30+ countries worldwide.' },
];

const Counter = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);
  const isDecimal = String(target).includes('.');

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? +(target * eased).toFixed(1) : Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
};

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about-section section" ref={sectionRef}>
      <div className="about-glow about-glow--purple" />
      <div className="container">

        {/* Header */}
        <div className="about-header">
          <div className="section-label" data-reveal="up">
            About Codexa
          </div>
          <h2 className="text-h1 about-title" data-reveal="up" data-reveal-delay="0.1">
            We are <span className="text-gradient">Codexa Infotech</span>
          </h2>
          <p className="about-manifesto text-body-lg" data-reveal="up" data-reveal-delay="0.2">
            A premium AI-powered digital agency at the intersection of technology and creativity.
            We don't just build products — we engineer digital ecosystems that scale, adapt,
            and evolve with your business. From intelligent automation to immersive interfaces,
            we transform complex challenges into elegant, high-performance solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="about-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`about-stat glass glass-hover about-stat--${stat.color}`}
              data-reveal="up"
              data-reveal-delay={String(i * 0.1)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={`about-stat-icon about-icon--${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div className="about-stat-number">
                <Counter target={stat.value} suffix={stat.suffix} isVisible={visible} />
              </div>
              <div className="about-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="about-values">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="about-value glass glass-hover"
              data-reveal="up"
              data-reveal-delay={String(0.1 + i * 0.12)}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="about-value-icon">
                <v.icon size={20} />
              </div>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
