import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorColor, setCursorColor] = useState('blue');

  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = () =>
      window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    if (isTouchDevice()) return;

    const moveDot = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp   = () => setIsClicking(false);

    // Interactive element detection
    const handleEnter = (e) => {
      const target = e.target.closest('a, button, [data-magnetic], input, textarea, .card-hover');
      if (target) {
        setIsHovering(true);
        // Color based on element type
        if (target.classList.contains('btn-primary')) setCursorColor('purple');
        else setCursorColor('blue');
      }
    };

    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveDot, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveDot);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        id="cursor-dot"
        className={`cursor-dot ${isClicking ? 'clicking' : ''} cursor-${cursorColor}`}
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        id="cursor-ring"
        className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''} cursor-${cursorColor}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
