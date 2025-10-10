// components/PlasmaHero.tsx

'use client';

import React from 'react';
import PlasmaBackground from '@/components/ui/shadcn-io/plasma-background';
import ogBlankSrc from '/og-blank.png';
import styles from './PlasmaHero.module.css';

export default function PlasmaHero() {
  return (
    <div className={styles.hero}>
      {/* Static background image
      <img
        src={ogBlankSrc}
        alt="Background"
        fill
        className={styles.bgImage}
        priority
      /> */}

      {/* Plasma shader overlay */}
      <PlasmaBackground
        className={styles.plasma}     // optional tint
        speed={1.0}             // adjust flow speed
        direction="forward"     // forward | reverse | pingpong
        scale={1.2}             // zoom of plasma pattern
        opacity={0.6}           // overall plasma opacity
        mouseInteractive={true} // enable mouse distortion
      />

    </div>
  );
}
