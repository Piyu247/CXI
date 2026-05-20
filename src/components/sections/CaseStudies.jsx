import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './CaseStudies.css';

const cases = [
  {
    id: 1,
    number: '01',
    client: 'NeuralCore AI',
    title: 'AI-Powered Diagnostic Platform',
    category: 'AI Development · Healthcare',
    outcome: 'Reduced diagnosis time by 73%',
    description: 'We built an end-to-end AI diagnostic system integrating computer vision, NLP patient intake, and real-time clinical decision support — serving 200k+ patients monthly.',
    stats: [{ v: '73%', l: 'Faster Diagnosis' }, { v: '200K+', l: 'Patients Served' }, { v: '94%', l: 'Accuracy Rate' }],
    gradient: 'linear-gradient(135deg, #050505 0%, #0d1b35 50%, #12083a 100%)',
    gradientLight: 'linear-gradient(135deg, #ffffff 0%, #eef6ff 50%, #f1eefb 100%)',
    accentColor: '#4DA6FF',
    accentColorLight: '#2563eb',
  },
  {
    id: 2,
    number: '02',
    client: 'Orbis Finance',
    title: 'Real-Time Trading Intelligence',
    category: 'Web Development · FinTech',
    outcome: 'Processed $2.4B in daily transactions',
    description: 'A high-frequency trading dashboard with sub-10ms data refresh, AI-driven portfolio analytics, and predictive market sentiment scoring for institutional investors.',
    stats: [{ v: '$2.4B', l: 'Daily Volume' }, { v: '10ms', l: 'Data Refresh' }, { v: '340%', l: 'ROI Increase' }],
    gradient: 'linear-gradient(135deg, #050505 0%, #0d2b1a 50%, #071d33 100%)',
    gradientLight: 'linear-gradient(135deg, #ffffff 0%, #e6f6ee 50%, #eaf3fb 100%)',
    accentColor: '#7DF9FF',
    accentColorLight: '#0891b2',
  },
  {
    id: 3,
    number: '03',
    client: 'VoxMind',
    title: 'Autonomous Voice AI Agents',
    category: 'AI Agents · SaaS',
    outcome: '1M+ calls automated per month',
    description: 'Multi-modal voice agents capable of handling complex customer journeys with tool-use, memory, and escalation logic — replacing 80% of tier-1 support costs.',
    stats: [{ v: '1M+', l: 'Calls / Month' }, { v: '80%', l: 'Cost Reduction' }, { v: '4.8★', l: 'CSAT Score' }],
    gradient: 'linear-gradient(135deg, #050505 0%, #1a0a3a 50%, #0d1535 100%)',
    gradientLight: 'linear-gradient(135deg, #ffffff 0%, #f4eefb 50%, #eaf0fb 100%)',
    accentColor: '#8B5CF6',
    accentColorLight: '#7c3aed',
  },
  {
    id: 4,
    number: '04',
    client: 'Skybridge Logistics',
    title: 'Global Supply Chain Platform',
    category: 'Cloud Solutions · Logistics',
    outcome: 'Connected 50+ warehouses globally',
    description: 'A scalable microservices platform on AWS with real-time inventory tracking, predictive restocking AI, and a white-label portal serving enterprise logistics clients.',
    stats: [{ v: '50+', l: 'Warehouses' }, { v: '99.99%', l: 'Uptime' }, { v: '4×', l: 'Throughput' }],
    gradient: 'linear-gradient(135deg, #050505 0%, #1a1205 50%, #0a1a2e 100%)',
    gradientLight: 'linear-gradient(135deg, #ffffff 0%, #faf3e6 50%, #eaf0fb 100%)',
    accentColor: '#4DA6FF',
    accentColorLight: '#2563eb',
  },
];

const CaseStudies = () => {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const dragX = useMotionValue(0);
  const constraintsRef = useRef(null);

  const go = (next) => {
    setDir(next > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(cases.length - 1, next)));
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60 && current < cases.length - 1) go(current + 1);
    else if (info.offset.x > 60 && current > 0) go(current - 1);
  };

  const study = cases[current];
  const accent = isDark ? study.accentColor : study.accentColorLight;
  const bgGradient = isDark ? study.gradient : study.gradientLight;

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 120 : -120, filter: 'blur(8px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -120 : 120, filter: 'blur(8px)' }),
  };

  return (
    <section id="case-studies" className="cases-section section">
      <div className="container">
        <div className="cases-header">
          <div className="section-label" data-reveal="up">Case Studies</div>
          <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
            Work that speaks for <span className="text-gradient">itself</span>
          </h2>
        </div>

        <div className="cases-stage" ref={constraintsRef}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={study.id}
              className="cases-slide"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={handleDragEnd}
              style={{ '--accent': accent }}
            >
              {/* Background gradient */}
              <div className="cases-bg" style={{ background: bgGradient }} />
              {/* Accent glow */}
              <div className="cases-accent-glow" style={{ background: `radial-gradient(ellipse at 70% 40%, ${accent}22, transparent 60%)` }} />

              <div className="cases-content">
                <div className="cases-left">
                  <div className="cases-meta">
                    <span className="cases-number">{study.number}</span>
                    <span className="cases-client section-label" style={{ marginBottom: 0 }}>{study.client}</span>
                  </div>
                  <h3 className="cases-title">{study.title}</h3>
                  <p className="cases-category tag" style={{ marginBottom: '1.5rem' }}>{study.category}</p>
                  <p className="cases-desc text-body">{study.description}</p>
                  <div className="cases-outcome">
                    <span className="cases-outcome-label">Key Outcome</span>
                    <span className="cases-outcome-val" style={{ color: accent }}>{study.outcome}</span>
                  </div>
                </div>

                <div className="cases-right">
                  {/* Stats */}
                  <div className="cases-stats">
                    {study.stats.map(s => (
                      <div key={s.l} className="cases-stat glass">
                        <span className="cases-stat-val" style={{ color: accent }}>{s.v}</span>
                        <span className="cases-stat-label">{s.l}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="btn btn-secondary" style={{ borderColor: `${accent}40`, gap: '0.5rem', marginTop: '1.5rem' }}>
                    View Full Case Study <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Drag hint */}
          <div className="cases-drag-hint">Drag to navigate</div>
        </div>

        {/* Controls */}
        <div className="cases-controls">
          <div className="cases-dots">
            {cases.map((_, i) => (
              <button
                key={i}
                id={`case-dot-${i}`}
                className={`cases-dot ${i === current ? 'active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to case study ${i + 1}`}
              />
            ))}
          </div>
          <div className="cases-arrows">
            <button id="case-prev" className="cases-arrow" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous case study">
              <ArrowLeft size={18} />
            </button>
            <button id="case-next" className="cases-arrow" onClick={() => go(current + 1)} disabled={current === cases.length - 1} aria-label="Next case study">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
