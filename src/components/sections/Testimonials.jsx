import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'NeuralCore AI',
    text: 'Codexa delivered our AI diagnostic platform in record time without sacrificing quality. Their deep expertise in both AI and engineering made them the perfect partner for a project of this complexity.',
    rating: 5,
    avatar: 'SC',
    color: '#4DA6FF',
  },
  {
    id: 2,
    name: 'Marcus Wright',
    role: 'VP of Engineering',
    company: 'Orbis Finance',
    text: 'The trading dashboard they built handles $2.4B in daily volume without breaking a sweat. Their architecture decisions, especially around real-time data, were absolutely world-class.',
    rating: 5,
    avatar: 'MW',
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Product Director',
    company: 'VoxMind',
    text: 'Our voice AI agents now handle over a million calls per month. The Codexa team brought a level of craft and intelligence to this project that I haven\'t seen at any other agency.',
    rating: 5,
    avatar: 'PS',
    color: '#7DF9FF',
  },
  {
    id: 4,
    name: 'James Okafor',
    role: 'CEO',
    company: 'Skybridge Logistics',
    text: 'From day one, they felt like an extension of our team. They delivered a scalable cloud platform connecting 50+ warehouses with near-perfect uptime. Phenomenal execution.',
    rating: 5,
    avatar: 'JO',
    color: '#4DA6FF',
  },
  {
    id: 5,
    name: 'Elena Vasquez',
    role: 'Head of Digital',
    company: 'Luminos Health',
    text: 'Codexa\'s UI/UX team redesigned our patient portal, increasing engagement by 340%. The attention to accessibility and mobile experience was exceptional.',
    rating: 5,
    avatar: 'EV',
    color: '#8B5CF6',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef(null);

  const go = (next) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const t = testimonials[current];

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.96 }),
  };

  return (
    <section id="testimonials" className="testi-section section">
      <div className="testi-glow" />
      <div className="container">
        <div className="testi-header">
          <div className="section-label" data-reveal="up">Client Stories</div>
          <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
            Words from <span className="text-gradient">our clients</span>
          </h2>
        </div>

        <div className="testi-stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              className="testi-card glass"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--t-color': t.color }}
            >
              <Quote size={32} className="testi-quote-icon" />

              {/* Stars */}
              <div className="testi-stars" aria-label={`${t.rating} stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                ))}
              </div>

              <blockquote className="testi-text">"{t.text}"</blockquote>

              <div className="testi-author">
                <div className="testi-avatar" style={{ background: `${t.color}22`, border: `2px solid ${t.color}55`, color: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role} · {t.company}</div>
                </div>
              </div>

              <div className="testi-accent-line" style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="testi-controls">
            <button id="testi-prev" className="testi-arrow" onClick={() => go(current - 1)} aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  id={`testi-dot-${i}`}
                  className={`testi-dot ${i === current ? 'active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button id="testi-next" className="testi-arrow" onClick={() => go(current + 1)} aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
