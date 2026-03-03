"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <svg 
      viewBox="-140 0 820 230" 
      height="65" 
      style={{ overflow: 'visible', cursor: 'pointer' }}
      className={`logo-svg ${className || ''}`}
    >
      <defs>
        <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="logoSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="logoBlackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
      <style>
        {`
          .name-text {
            fill: ${isDark ? 'url(#logoSilverGrad)' : 'url(#logoBlackGrad)'};
            transition: fill 0.3s ease;
          }
          .logo-svg:hover .name-text {
            fill: url(#logoBlueGrad);
          }
          .tech-accent {
            stroke: url(#logoBlueGrad);
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            transition: stroke 0.3s ease;
          }
          .logo-svg:hover .tech-accent {
            stroke: ${isDark ? 'url(#logoSilverGrad)' : 'url(#logoBlackGrad)'};
          }
          .tech-dot {
            fill: url(#logoBlueGrad);
            transition: fill 0.3s ease;
          }
          .logo-svg:hover .tech-dot {
            fill: ${isDark ? 'url(#logoSilverGrad)' : 'url(#logoBlackGrad)'};
          }
          .portfolio-text {
            fill: url(#logoBlueGrad);
            font-family: 'Montserrat', 'Inter', system-ui, sans-serif;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: 14px;
            transition: fill 0.3s ease;
          }
          .logo-svg:hover .portfolio-text {
            fill: ${isDark ? 'url(#logoSilverGrad)' : 'url(#logoBlackGrad)'};
          }
        `}
      </style>
      
      <g className="logo-group">
        {/* Tech Accents Left */}
        <g className="tech-accent" strokeWidth="3">
          <path d="M -100,65 L -70,65" />
          <path d="M -115,80 L -85,80" />
          <path d="M -90,95 L -65,95" />
          <path d="M -50,30 L -20,30" />
          <path d="M -80,45 L -40,45" />
          <path d="M -60,120 L -20,120" />
          <path d="M -75,135 L -35,135" />
        </g>
        <g className="tech-accent" strokeWidth="4">
          <path d="M -55,65 L -75,80 L -55,95" />
          <path d="M -35,105 L -15,55" />
          <path d="M -5,65 L 15,80 L -5,95" />
        </g>

        {/* Main Text Name */}
        <text x="280" y="115" textAnchor="middle" className="name-text" style={{ fontSize: '64px', fontWeight: 900, fontFamily: 'Montserrat, Inter, system-ui, sans-serif', letterSpacing: '2px' }}>
          TRAN CONG MINH
        </text>

        {/* Tech Accents Right */}
        <g className="tech-accent" strokeWidth="3">
          <path d="M 560, 60 L 595, 60 L 615, 40" />
          <path d="M 560, 90 L 635, 90" />
          <path d="M 560, 120 L 595, 120 L 615, 140" />
          <path d="M 560, 75 L 580, 75" />
          <path d="M 560, 105 L 590, 105 L 605, 120" />
        </g>
        <g className="tech-dot">
          <circle cx="620" cy="35" r="4" />
          <circle cx="641" cy="90" r="4" />
          <circle cx="620" cy="145" r="4" />
          <circle cx="586" cy="75" r="4" />
          <circle cx="610" cy="125" r="4" />
        </g>

        {/* Text */}
        <text x="280" y="195" textAnchor="middle" className="portfolio-text">
          - PORTFOLIO -
        </text>
      </g>
    </svg>
  );
}
