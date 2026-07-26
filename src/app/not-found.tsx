"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaFolderOpen, FaExclamationTriangle, FaCompass } from "react-icons/fa";
import NotFound3DCanvas from "@/components/ui/NotFound3DCanvas";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-dark)",
        color: "var(--text-primary)",
        padding: "2rem 1.5rem",
      }}
    >
      {/* 3D Canvas Background with Starfield & Interactive Realistic 3D Planet */}
      <NotFound3DCanvas />

      {/* Main Content Layout Grid */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "center",
          maxWidth: "1150px",
          width: "100%",
          pointerEvents: "none", // Allows mouse drag to pass through to canvas
        }}
      >
        {/* Left Column: Text & Actions */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            pointerEvents: "auto", // Re-enable pointer events for buttons & links
          }}
        >
          {/* Houston, we have a problem badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#38bdf8",
              marginBottom: "0.75rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <FaExclamationTriangle style={{ color: "#38bdf8", fontSize: "0.95rem" }} />
            Houston, we have a problem.
          </motion.div>

          {/* Huge 4-Planet-4 Header where digit '0' is a 3D Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.15em",
              margin: "0 0 0.5rem 0",
              userSelect: "none",
            }}
          >
            {/* Left '4' */}
            <span
              style={{
                fontSize: "clamp(5.5rem, 14vw, 9.5rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textShadow: "0 0 40px rgba(56, 189, 248, 0.4), 0 0 80px rgba(21, 93, 252, 0.25)",
              }}
            >
              4
            </span>

            {/* Digit '0' is an Animated 3D Planet Sphere with Glowing Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{
                width: "clamp(4.2rem, 11vw, 7.5rem)",
                height: "clamp(4.2rem, 11vw, 7.5rem)",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 0.1em",
              }}
            >
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.6))" }}
              >
                {/* Atmosphere Aura */}
                <circle cx="100" cy="100" r="90" fill="url(#pAura)" opacity="0.3" />

                {/* Main Planet Body */}
                <circle cx="100" cy="100" r="70" fill="url(#pGrad)" stroke="#38bdf8" strokeWidth="3" />

                {/* Planet Craters / Surface Detail */}
                <circle cx="75" cy="70" r="14" fill="#0f172a" opacity="0.35" />
                <circle cx="73" cy="68" r="11" fill="url(#pGrad)" opacity="0.8" />

                <circle cx="130" cy="85" r="18" fill="#0f172a" opacity="0.35" />
                <circle cx="128" cy="83" r="14" fill="url(#pGrad)" opacity="0.8" />

                <circle cx="85" cy="130" r="12" fill="#0f172a" opacity="0.35" />

                {/* Orbital Ring Tilted */}
                <ellipse cx="100" cy="100" rx="92" ry="24" fill="none" stroke="#38bdf8" strokeWidth="4" transform="rotate(-25 100 100)" opacity="0.85" />
                <ellipse cx="100" cy="100" rx="98" ry="28" fill="none" stroke="#155dfc" strokeWidth="2" transform="rotate(-25 100 100)" opacity="0.6" />

                <defs>
                  <radialGradient id="pAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="40%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#155dfc" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Right '4' */}
            <span
              style={{
                fontSize: "clamp(5.5rem, 14vw, 9.5rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textShadow: "0 0 40px rgba(56, 189, 248, 0.4), 0 0 80px rgba(21, 93, 252, 0.25)",
              }}
            >
              4
            </span>
          </motion.div>

          {/* Subheading: Page Not Found */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #488bfb, #38bdf8, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Page Not Found
          </motion.h2>

          {/* Description in English */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: "460px",
              marginBottom: "2rem",
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily lost in space.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              className="btn btn-primary"
              style={{
                padding: "0.85rem 1.85rem",
                borderRadius: "9999px",
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(21, 93, 252, 0.4)",
              }}
            >
              <FaHome style={{ fontSize: "1.05rem" }} />
              Back to Home
            </Link>

            <Link
              href="/#projects"
              className="btn btn-secondary"
              style={{
                padding: "0.85rem 1.75rem",
                borderRadius: "9999px",
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              <FaFolderOpen style={{ fontSize: "1rem" }} />
              Explore Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating 3D Astronaut Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            pointerEvents: "none",
          }}
        >
          {/* Floating Astronaut Wrapper */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              maxWidth: "370px",
              filter: "drop-shadow(0 15px 30px rgba(56, 189, 248, 0.25))",
            }}
          >
            {/* SVG Astronaut Graphics */}
            <svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto" }}
            >
              <circle cx="200" cy="200" r="160" fill="url(#astroGlow)" opacity="0.4" />

              {/* Suit */}
              <rect x="110" y="140" width="50" height="110" rx="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              <rect x="100" y="160" width="18" height="70" rx="9" fill="#0f172a" stroke="#155dfc" strokeWidth="2" />

              {/* Legs */}
              <path d="M165 240 L150 310 L185 325 L200 250 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="4" />
              <path d="M210 240 L230 315 L265 305 L235 245 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="4" />

              {/* Boots */}
              <rect x="140" y="305" width="48" height="24" rx="10" fill="#155dfc" stroke="#38bdf8" strokeWidth="3" />
              <rect x="225" y="300" width="48" height="24" rx="10" fill="#155dfc" stroke="#38bdf8" strokeWidth="3" />

              {/* Torso */}
              <rect x="150" y="140" width="100" height="110" rx="28" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
              <rect x="175" y="165" width="50" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="190" cy="180" r="5" fill="#38bdf8" />
              <circle cx="210" cy="180" r="5" fill="#a855f7" />
              <rect x="187" y="192" width="26" height="4" rx="2" fill="#488bfb" />

              {/* Arms */}
              <path d="M150 160 Q120 190 145 220" fill="none" stroke="#f8fafc" strokeWidth="24" strokeLinecap="round" />
              <path d="M150 160 Q120 190 145 220" fill="none" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" opacity="0.15" />
              
              <path d="M250 160 Q285 195 260 225" fill="none" stroke="#f8fafc" strokeWidth="24" strokeLinecap="round" />

              {/* Gloves */}
              <circle cx="145" cy="220" r="14" fill="#155dfc" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="260" cy="225" r="14" fill="#155dfc" stroke="#38bdf8" strokeWidth="3" />

              {/* Laptop in hands */}
              <rect x="170" y="210" width="70" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="175" y="215" width="60" height="35" rx="4" fill="#020507" />
              <path d="M182 225 L188 230 L182 235" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="193" y1="235" x2="205" y2="235" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              <line x1="182" y1="242" x2="225" y2="242" stroke="#488bfb" strokeWidth="2" strokeLinecap="round" />

              {/* Helmet Head */}
              <circle cx="200" cy="115" r="50" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
              <ellipse cx="205" cy="115" rx="38" ry="30" fill="url(#visorGradient)" stroke="#38bdf8" strokeWidth="2" />
              <path d="M180 95 Q210 90 225 102" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

              {/* Antenna */}
              <line x1="200" y1="65" x2="200" y2="45" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="200" cy="42" r="6" fill="#38bdf8" />
              <circle cx="200" cy="42" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />

              <defs>
                <radialGradient id="astroGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#155dfc" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#020507" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#155dfc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Drag instruction badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              marginTop: "1rem",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "#38bdf8",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backdropFilter: "blur(8px)",
              pointerEvents: "none",
            }}
          >
            <FaCompass style={{ fontSize: "0.85rem" }} />
            Drag anywhere to rotate 3D planet 🪐
          </motion.div>
        </motion.div>
      </div>

      {/* CSS adjustments for responsive layout */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .container > div {
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
