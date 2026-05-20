import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.92 }}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      {/* Track */}
      <span className="toggle-track">
        {/* Sliding knob */}
        <motion.span
          className="toggle-knob"
          animate={{ x: isDark ? 2 : 26 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                className="toggle-icon"
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
              >
                🌙
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                className="toggle-icon"
                initial={{ opacity: 0, rotate: 30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -30 }}
                transition={{ duration: 0.2 }}
              >
                ☀️
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
