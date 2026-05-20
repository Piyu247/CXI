import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Globe, Smartphone, Cloud, BarChart3, Palette, ArrowRight, Sparkles } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 'ai-dev',
    icon: Brain,
    number: '01',
    title: 'AI Development',
    subtitle: 'Intelligent Automation',
    description: 'From LLM apps and RAG systems to fine-tuned models and vision pipelines. We build production-grade AI that delivers measurable outcomes.',
    tags: ['LLM / RAG', 'Fine-tuning', 'NLP & Vision', 'Model Ops'],
    color: 'blue',
  },
  {
    id: 'web-dev',
    icon: Globe,
    number: '02',
    title: 'Web Development',
    subtitle: 'Premium Digital Platforms',
    description: 'React, Next.js, headless CMS, edge infrastructure — performance-first websites with Core Web Vitals and SEO built in from day one.',
    tags: ['React / Next.js', 'Headless CMS', 'Edge Infra', 'SEO'],
    color: 'purple',
  },
  {
    id: 'app-dev',
    icon: Smartphone,
    number: '03',
    title: 'App Development',
    subtitle: 'Cross-Platform Mobile',
    description: 'Native-quality iOS and Android apps built with Flutter and React Native. Seamless UX, offline support, and CI/CD pipelines.',
    tags: ['Flutter', 'React Native', 'iOS & Android', 'CI/CD'],
    color: 'cyan',
  },
  {
    id: 'cloud',
    icon: Cloud,
    number: '04',
    title: 'Cloud Solutions',
    subtitle: 'Scalable Infrastructure',
    description: 'AWS, GCP, Azure architecture design, containerization with Docker/K8s, serverless functions, and enterprise-grade DevOps pipelines.',
    tags: ['AWS / GCP', 'Docker / K8s', 'Serverless', 'DevOps'],
    color: 'blue',
  },
  {
    id: 'data',
    icon: BarChart3,
    number: '05',
    title: 'Data Intelligence',
    subtitle: 'Analytics & Insights',
    description: 'Real-time dashboards, data pipelines, business intelligence tools, and predictive analytics that turn raw data into strategic advantage.',
    tags: ['Data Pipelines', 'BI Dashboards', 'Predictive AI', 'ETL'],
    color: 'purple',
  },
  {
    id: 'uiux',
    icon: Palette,
    number: '06',
    title: 'UI/UX Design',
    subtitle: 'Immersive Experiences',
    description: 'End-to-end product design — user research, UX flows, polished design systems, motion design, and developer-ready handoffs.',
    tags: ['UX Research', 'Design Systems', 'Motion Design', 'Prototyping'],
    color: 'cyan',
  },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      className={`service-card glass service-card--${service.color} ${hovered ? 'hovered' : ''}`}
      data-reveal="up"
      data-reveal-delay={String(index * 0.08)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      {/* Card number */}
      <span className="service-num">{service.number}</span>

      {/* Icon */}
      <div className={`service-icon-wrap service-icon--${service.color}`}>
        <Icon size={24} />
        <motion.div
          className="service-icon-glow"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.5 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="service-content">
        <span className="service-subtitle">{service.subtitle}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.description}</p>
      </div>

      {/* Tags */}
      <div className="service-tags">
        {service.tags.map(tag => (
          <span key={tag} className={`tag tag-${service.color === 'cyan' ? 'cyan' : service.color === 'purple' ? 'purple' : ''}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <motion.div
        className="service-arrow"
        animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowRight size={16} />
      </motion.div>

      {/* Hover background wash */}
      <motion.div
        className={`service-hover-bg service-hover-bg--${service.color}`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="services-section section">
    <div className="services-glow" />
    <div className="container">
      <div className="services-header">
        <div className="section-label" data-reveal="up">Our Services</div>
        <h2 className="text-h1" data-reveal="up" data-reveal-delay="0.1">
          Everything you need to <span className="text-gradient">build the future</span>
        </h2>
        <p className="text-body-lg" data-reveal="up" data-reveal-delay="0.2" style={{ maxWidth: '580px', margin: '0 auto' }}>
          End-to-end digital solutions spanning AI, development, design, and cloud — crafted by specialists who care about craft.
        </p>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
