import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#case-studies' },
  { label: 'Tech',     href: '#tech-stack' },
  { label: 'Careers',  href: '#careers' },
  { label: 'Contact',  href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [menuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#home" className="navbar__logo" id="navbar-logo" aria-label="Codexa Infotech Home">
          <div className="navbar__logo-mark">
            <span className="logo-letter">C</span>
            <span className="logo-x">X</span>
          </div>
          <div className="navbar__logo-text">
            <span className="logo-name">Codexa</span>
            <span className="logo-tagline">Infotech</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`navbar__link ${activeLink === link.href ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                  <span className="navbar__link-underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="navbar__cta">
          <a href="#contact" id="navbar-cta-btn" className="btn btn-primary navbar__btn" onClick={() => handleLinkClick('#contact')}>
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="navbar-mobile-toggle"
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} role="dialog" aria-modal="true">
        <nav>
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ '--i': i }}>
                <a
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={() => handleLinkClick('#contact')}>
            Start a Project
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
