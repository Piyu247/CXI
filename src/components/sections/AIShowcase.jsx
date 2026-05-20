import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Smartphone, Cloud, BarChart3 } from 'lucide-react';
import './AIShowcase.css';

const solutions = [
  {
    id: 'ai-auto',
    icon: Brain,
    title: 'AI Automation',
    tagline: 'End-to-End Intelligence',
    description: 'Autonomous workflows, intelligent decision engines, and AI agents that execute complex multi-step tasks without human intervention.',
    metrics: [{ label: 'Efficiency Gain', value: '10×' }, { label: 'Cost Reduction', value: '60%' }],
    color: '#4DA6FF',
    accent: '#7DF9FF',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Web Development',
    tagline: 'World-Class Platforms',
    description: 'Production-grade web experiences with React, Next.js, and edge infrastructure — built for scale, speed, and conversion.',
    metrics: [{ label: 'Performance Score', value: '99' }, { label: 'Faster Load', value: '3×' }],
    color: '#8B5CF6',
    accent: '#4DA6FF',
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'App Development',
    tagline: 'Native-Quality Mobile',
    description: 'Cross-platform apps that feel indistinguishable from native — pixel-perfect UI, smooth 120fps animations, offline-first.',
    metrics: [{ label: 'App Rating', value: '4.9★' }, { label: 'Retention', value: '+45%' }],
    color: '#7DF9FF',
    accent: '#8B5CF6',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    tagline: 'Infinite Scalability',
    description: 'Enterprise-grade cloud architecture on AWS, GCP, and Azure with auto-scaling, zero-downtime deployments, and ironclad security.',
    metrics: [{ label: 'Uptime', value: '99.9%' }, { label: 'Scale Factor', value: '100×' }],
    color: '#4DA6FF',
    accent: '#8B5CF6',
  },
  {
    id: 'data',
    icon: BarChart3,
    title: 'Data Intelligence',
    tagline: 'Insights That Drive Growth',
    description: 'Real-time analytics, predictive models, and BI dashboards that transform raw data into the strategic decisions that win markets.',
    metrics: [{ label: 'Data Accuracy', value: '98%' }, { label: 'ROI Increase', value: '3.5×' }],
    color: '#8B5CF6',
    accent: '#7DF9FF',
  },
];

const HolographicCard = ({ solution, index, isActive, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = solution.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -18,
      y: ((e.clientX - cx) / rect.width) * 18,
    });
  };

  return (
    <motion.div
      className={`holo-card ${isActive ? 'holo-card--active' : ''}`}
      data-reveal="up"
      data-reveal-delay={String(index * 0.1)}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isActive ? 1.04 : 1,
        y: isActive ? -8 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ '--card-color': solution.color, '--card-accent': solution.accent, transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Scanline overlay */}
      <div className="holo-scanlines" />
      {/* Hologram shimmer */}
      <div className="holo-shimmer" />

      <div className="holo-inner">
        {/* Header */}
        <div className="holo-header">
          <div className="holo-icon-wrap">
            <Icon size={22} />
          </div>
          <div className="holo-badge">AI Solution</div>
        </div>

        {/* Title */}
        <div className="holo-content">
          <span className="holo-tagline">{solution.tagline}</span>
          <h3 className="holo-title">{solution.title}</h3>
          <p className="holo-desc">{solution.description}</p>
        </div>

        {/* Metrics */}
        <div className="holo-metrics">
          {solution.metrics.map(m => (
            <div key={m.label} className="holo-metric">
              <span className="holo-metric-val">{m.value}</span>
              <span className="holo-metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom glow line */}
        <div className="holo-bottom-line" />
      </div>
    </motion.div>
  );
};

const AIShowcase = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="ai-showcase" className="ai-section section">
      <div className="ai-glow ai-glow--1" />
      <div className="ai-glow ai-glow--2" />

      <div className="container">
        <div className="ai-header">
          <div className="section-label" data-reveal="up">AI Solutions</div>
          <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
            The intelligence layer <span className="text-gradient">behind everything</span>
          </h2>
          <p className="text-body-lg" data-reveal="up" data-reveal-delay="0.2" style={{ maxWidth: '560px', margin: '0 auto' }}>
            Five pillars of digital excellence, each powered by AI and delivered with precision.
          </p>
        </div>

        <div className="holo-grid">
          {solutions.map((s, i) => (
            <HolographicCard
              key={s.id}
              solution={s}
              index={i}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
