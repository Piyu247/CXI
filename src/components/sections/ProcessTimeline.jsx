import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Code, FlaskConical, Rocket } from 'lucide-react';
import './ProcessTimeline.css';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Strategy',
    description: 'We deep-dive into your business goals, user needs, and market landscape. This phase produces a complete technical blueprint and project roadmap.',
    deliverables: ['Technical Architecture', 'Competitor Analysis', 'Sprint Roadmap'],
    color: 'blue',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design & Prototyping',
    description: 'From wireframes to high-fidelity interactive prototypes. Every pixel is intentional — we design systems that scale.',
    deliverables: ['Design System', 'Interactive Prototype', 'User Testing'],
    color: 'purple',
    duration: '2–3 weeks',
  },
  {
    number: '03',
    icon: Code,
    title: 'Engineering & Development',
    description: 'Production-grade code, rigorous architecture, and CI/CD pipelines. We build with performance and maintainability as first-class requirements.',
    deliverables: ['Clean Codebase', 'API Integration', 'CI/CD Pipeline'],
    color: 'cyan',
    duration: '4–12 weeks',
  },
  {
    number: '04',
    icon: FlaskConical,
    title: 'Testing & Quality Assurance',
    description: 'Automated and manual testing across devices, browsers, and edge cases. Nothing ships until it\'s bulletproof.',
    deliverables: ['Unit & E2E Tests', 'Performance Audit', 'Security Review'],
    color: 'blue',
    duration: '1–2 weeks',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Scale',
    description: 'Zero-downtime deployment, monitoring dashboards, and ongoing support. We\'re with you from launch day to global scale.',
    deliverables: ['Zero-Downtime Deploy', 'Analytics Setup', 'Ongoing Support'],
    color: 'purple',
    duration: '1 week',
  },
];

const ProcessTimeline = () => (
  <section id="process" className="process-section section">
    <div className="process-glow" />
    <div className="container">
      <div className="process-header">
        <div className="section-label" data-reveal="up">Our Process</div>
        <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
          From idea to <span className="text-gradient">launch</span>
        </h2>
        <p className="text-body-lg" data-reveal="up" data-reveal-delay="0.2" style={{ maxWidth: '520px', margin: '0 auto' }}>
          A proven five-phase methodology that consistently delivers on time, on budget, and above expectations.
        </p>
      </div>

      <div className="process-timeline">
        {/* Vertical line */}
        <div className="process-line">
          <div className="process-line-fill" />
        </div>

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={step.number}
              className={`process-step ${isEven ? 'process-step--left' : 'process-step--right'}`}
              data-reveal={isEven ? 'left' : 'right'}
              data-reveal-delay={String(i * 0.1)}
            >
              {/* Node on center line */}
              <div className={`process-node process-node--${step.color}`}>
                <Icon size={16} />
              </div>

              {/* Card */}
              <motion.div
                className={`process-card glass glass-hover process-card--${step.color}`}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="process-card-header">
                  <span className="process-num">{step.number}</span>
                  <span className={`tag tag-${step.color === 'cyan' ? 'cyan' : step.color === 'purple' ? 'purple' : ''}`}>
                    {step.duration}
                  </span>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.description}</p>
                <ul className="process-deliverables">
                  {step.deliverables.map(d => (
                    <li key={d} className={`process-deliverable process-deliverable--${step.color}`}>{d}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProcessTimeline;
