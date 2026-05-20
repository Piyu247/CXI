import React from 'react';
import { Mail, ExternalLink, X, Globe2, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  Services: [
    { label: 'AI Development',    href: '#services' },
    { label: 'Web Development',   href: '#services' },
    { label: 'App Development',   href: '#services' },
    { label: 'Cloud Solutions',   href: '#services' },
    { label: 'Data Intelligence', href: '#services' },
    { label: 'UI/UX Design',      href: '#services' },
  ],
  Company: [
    { label: 'About Us',      href: '#about' },
    { label: 'Our Process',   href: '#process' },
    { label: 'Case Studies',  href: '#case-studies' },
    { label: 'Testimonials',  href: '#testimonials' },
    { label: 'Careers',       href: '#careers' },
    { label: 'Contact',       href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
  ],
};

const socials = [
  { icon: ExternalLink, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: X,            href: '#', label: 'Twitter' },
  { icon: Globe2,       href: '#', label: 'GitHub' },
  { icon: Mail,         href: 'mailto:hello@codexainfotech.com', label: 'Email' },
];

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer-neon-divider" />
    <div className="footer-glow" />

    <div className="container">
      {/* Top CTA band */}
      <div className="footer-cta">
        <div className="footer-cta-left">
          <span className="section-label">Ready to Start?</span>
          <h2 className="footer-cta-headline">
            Let's turn your vision into <span className="text-gradient">reality</span>
          </h2>
        </div>
        <a href="#contact" id="footer-cta-btn" className="btn btn-primary footer-cta-btn">
          Start a Project <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="footer-neon-divider" />

      {/* Main footer body */}
      <div className="footer-body">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-mark">CX</div>
            <div className="footer-logo-text">
              <span className="logo-name">Codexa</span>
              <span className="logo-tagline">Infotech</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Building the next generation of intelligent digital experiences. 
            Premium AI development agency serving clients globally since 2016.
          </p>
          <div className="footer-socials">
            {socials.map(s => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} id={`footer-social-${s.label.toLowerCase()}`} className="footer-social" aria-label={s.label}>
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([col, links]) => (
          <div key={col} className="footer-col">
            <h4 className="footer-col-title">{col}</h4>
            <ul>
              {links.map(link => (
                <li key={link.label}>
                  <a href={link.href} id={`footer-link-${link.label.toLowerCase().replace(/\s/g, '-')}`} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Codexa Infotech. All rights reserved.
        </p>
        <p className="footer-tagline-bottom">
          Built with ❤️ &amp; Three.js · <span className="text-gradient">Powered by AI</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
