import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import './Careers.css';

const openings = [
  {
    id: 'fe-eng',
    role: 'Senior Frontend Engineer',
    dept: 'Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    tags: ['React', 'Three.js', 'TypeScript'],
    color: 'blue',
    hot: true,
  },
  {
    id: 'ai-eng',
    role: 'AI/ML Engineer',
    dept: 'AI Research',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Python', 'PyTorch', 'LLMs'],
    color: 'purple',
    hot: true,
  },
  {
    id: 'ux',
    role: 'Product Designer',
    dept: 'Design',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    tags: ['Figma', 'Motion Design', 'UX Research'],
    color: 'cyan',
    hot: false,
  },
  {
    id: 'be-eng',
    role: 'Backend Engineer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
    color: 'blue',
    hot: false,
  },
];

const Careers = () => (
  <section id="careers" className="careers-section section">
    <div className="careers-glow careers-glow--1" />
    <div className="careers-glow careers-glow--2" />

    <div className="container">
      <div className="careers-header">
        <div className="section-label" data-reveal="up">
          <Sparkles size={10} />
          We're Hiring
        </div>
        <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
          Join the team building<br />
          <span className="text-gradient">the future of AI</span>
        </h2>
        <p className="text-body-lg" data-reveal="up" data-reveal-delay="0.2" style={{ maxWidth: '520px', margin: '0 auto 3rem' }}>
          We're a remote-first team of engineers, designers, and AI researchers obsessed with craft.
          If you want to work on hard problems with exceptional people — this is your place.
        </p>

        {/* Perks */}
        <div className="careers-perks" data-reveal="up" data-reveal-delay="0.3">
          {['Remote-First', 'Equity Package', 'Learning Budget', 'Flexible Hours', 'Health & Wellness'].map(p => (
            <span key={p} className="careers-perk">{p}</span>
          ))}
        </div>
      </div>

      <div className="careers-grid">
        {openings.map((job, i) => (
          <motion.div
            key={job.id}
            className={`careers-card glass glass-hover careers-card--${job.color}`}
            data-reveal="up"
            data-reveal-delay={String(i * 0.1)}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {job.hot && <span className="careers-hot">🔥 Hot Role</span>}

            <div className="careers-dept tag">{job.dept}</div>
            <h3 className="careers-role">{job.role}</h3>

            <div className="careers-meta">
              <span className="careers-meta-item">
                <MapPin size={12} /> {job.location}
              </span>
              <span className="careers-meta-item">
                <Clock size={12} /> {job.type}
              </span>
            </div>

            <div className="careers-tags">
              {job.tags.map(t => (
                <span key={t} className={`tag tag-${job.color === 'cyan' ? 'cyan' : job.color === 'purple' ? 'purple' : ''}`}>{t}</span>
              ))}
            </div>

            <a href="#contact" id={`careers-apply-${job.id}`} className="careers-apply-btn">
              Apply Now <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      <div className="careers-general" data-reveal="up" data-reveal-delay="0.3">
        <p className="text-body">Don't see a perfect fit? We're always looking for exceptional people.</p>
        <a href="mailto:careers@codexainfotech.com" id="careers-general-apply" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Send Your Resume <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </section>
);

export default Careers;
