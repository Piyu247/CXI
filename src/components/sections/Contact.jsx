import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle, Send } from 'lucide-react';
import './Contact.css';

const contactInfo = [
  { icon: Mail,    label: 'Email Us',    value: 'hello@codexainfotech.com', href: 'mailto:hello@codexainfotech.com' },
  { icon: MapPin,  label: 'Headquarters', value: 'Mumbai, India · Remote Globally', href: null },
  { icon: Phone,   label: 'Call Us',     value: '+91 98765 43210', href: 'tel:+919876543210' },
];

const services = ['AI Development', 'Web Development', 'App Development', 'Cloud Solutions', 'Data Intelligence', 'UI/UX Design'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="contact-glow contact-glow--1" />
      <div className="contact-glow contact-glow--2" />

      <div className="container">
        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info">
            <div className="section-label" data-reveal="left">Get in Touch</div>
            <h2 className="text-h1 contact-title" data-reveal="left" data-reveal-delay="0.1">
              Let's build something <span className="text-gradient">incredible</span> together
            </h2>
            <p className="text-body-lg contact-lead" data-reveal="left" data-reveal-delay="0.2">
              Tell us about your project, and we'll respond within 24 hours with a tailored proposal. No fluff, just results.
            </p>

            <div className="contact-details" data-reveal="left" data-reveal-delay="0.3">
              {contactInfo.map((c) => {
                const Icon = c.icon;
                const content = (
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="contact-detail-label">{c.label}</div>
                      <div className="contact-detail-val">{c.value}</div>
                    </div>
                  </div>
                );
                return c.href
                  ? <a key={c.label} href={c.href} id={`contact-info-${c.label.toLowerCase().replace(/\s/g, '-')}`}>{content}</a>
                  : <div key={c.label}>{content}</div>;
              })}
            </div>

            {/* Tagline */}
            <div className="contact-tagline glass" data-reveal="left" data-reveal-delay="0.4">
              <span className="contact-tagline-dot" />
              <span>Average response time: <strong style={{ color: 'var(--electric-blue)' }}>under 2 hours</strong></span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-wrap" data-reveal="right">
            <div className="contact-form-card glass">
              {sent ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CheckCircle size={52} color="var(--cyan-glow)" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <h3 className="contact-form-title">Start Your Project</h3>

                  <div className="contact-row">
                    <div className="contact-field">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-email">Email *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-row">
                    <div className="contact-field">
                      <label htmlFor="contact-company">Company</label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        placeholder="Your Company"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-service">Service Needed</label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-message">Project Details *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className={`btn btn-primary contact-submit ${sending ? 'loading' : ''}`}
                    disabled={sending}
                  >
                    {sending ? (
                      <><span className="contact-spinner" /> Sending...</>
                    ) : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
