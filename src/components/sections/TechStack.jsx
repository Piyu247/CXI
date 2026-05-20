import React from 'react';
import './TechStack.css';

const stack = [
  { name: 'React',       color: '#61DAFB' },
  { name: 'Next.js',     color: '#ffffff' },
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'Three.js',    color: '#ffffff' },
  { name: 'Node.js',     color: '#68A063' },
  { name: 'Python',      color: '#FFD43B' },
  { name: 'TensorFlow',  color: '#FF6F00' },
  { name: 'PyTorch',     color: '#EE4C2C' },
  { name: 'AWS',         color: '#FF9900' },
  { name: 'Docker',      color: '#2496ED' },
  { name: 'Kubernetes',  color: '#326CE5' },
  { name: 'GraphQL',     color: '#E10098' },
  { name: 'PostgreSQL',  color: '#336791' },
  { name: 'MongoDB',     color: '#47A248' },
  { name: 'Redis',       color: '#DC382D' },
  { name: 'Vercel',      color: '#ffffff' },
  { name: 'Tailwind',    color: '#38BDF8' },
  { name: 'GSAP',        color: '#88CE02' },
  { name: 'Figma',       color: '#F24E1E' },
  { name: 'OpenAI',      color: '#ffffff' },
];

const row1 = stack.slice(0, 10);
const row2 = stack.slice(10);

const TechBadge = ({ tech }) => (
  <div className="tech-badge" style={{ '--tech-color': tech.color }}>
    <span className="tech-dot" />
    <span className="tech-name">{tech.name}</span>
  </div>
);

const TechStack = () => (
  <section id="tech-stack" className="tech-section section">
    <div className="tech-glow" />

    <div className="container">
      <div className="tech-header">
        <div className="section-label" data-reveal="up">Technology Stack</div>
        <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
          Built with the world's <span className="text-gradient">best tools</span>
        </h2>
        <p className="text-body-lg" data-reveal="up" data-reveal-delay="0.2" style={{ maxWidth: '520px', margin: '0 auto' }}>
          We use cutting-edge technologies, frameworks, and platforms to build products that stand the test of time.
        </p>
      </div>
    </div>

    {/* Marquee rows */}
    <div className="tech-marquee-wrap">
      <div className="tech-fade tech-fade--left" />
      <div className="tech-fade tech-fade--right" />

      <div className="tech-row">
        <div className="tech-track tech-track--fwd">
          {[...row1, ...row1].map((t, i) => <TechBadge key={i} tech={t} />)}
        </div>
      </div>
      <div className="tech-row">
        <div className="tech-track tech-track--rev">
          {[...row2, ...row2].map((t, i) => <TechBadge key={i} tech={t} />)}
        </div>
      </div>
    </div>

    <div className="container" style={{ marginTop: '3rem' }}>
      <div className="tech-trust glass" data-reveal="up">
        <div className="tech-trust-stat">
          <span className="tech-trust-num text-gradient">20+</span>
          <span className="tech-trust-label">Technologies Mastered</span>
        </div>
        <div className="tech-trust-divider" />
        <div className="tech-trust-stat">
          <span className="tech-trust-num text-gradient">5+</span>
          <span className="tech-trust-label">Cloud Platforms</span>
        </div>
        <div className="tech-trust-divider" />
        <div className="tech-trust-stat">
          <span className="tech-trust-num text-gradient">100%</span>
          <span className="tech-trust-label">Modern Architecture</span>
        </div>
      </div>
    </div>
  </section>
);

export default TechStack;
