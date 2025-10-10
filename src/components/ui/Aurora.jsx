import React from "react";

export default function WavyImage() {
  return (
    <div className="relative w-64 h-64 overflow-hidden">
      {/* Your PNG as a mask */}
      <div
        className="
          absolute inset-0
          bg-[url('/og-blank.png')] bg-center bg-no-repeat bg-contain
          mask-[url('/og-blank.png')]
          animate-wave
        "
        style={{
          // adjust the wave speed and amplitude
          "--wave-duration": "4s",
          "--wave-amplitude": "20px",
        }}
      />
      {/* Underlying color or gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
    </div>
  );
}
