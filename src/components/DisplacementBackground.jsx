// src/components/DisplacementBackground.jsx
import React, { useRef, useEffect } from 'react';

const DisplacementBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      initDisplacementSphere(container);
    }
    // Cleanup on unmount
    return () => {
      // Optionally remove renderer.domElement and event listeners
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default DisplacementBackground;
