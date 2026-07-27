# 🌌 Tran Cong Minh — Personal Portfolio

<p align="center">
  <a href="https://www.tcminh1405.id.vn/"><img src="https://img.shields.io/badge/Live_Website-tcminh1405.id.vn-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/></a>
</p>

The official personal portfolio web application of **Tran Cong Minh** — Software Engineering Student & Full-Stack Developer at Industrial University of Ho Chi Minh City.

🌐 **Live Website**: [https://www.tcminh1405.id.vn](https://www.tcminh1405.id.vn/)  
🔗 **GitHub Repository**: [https://github.com/tcminh1405/trancongminh-portfolio](https://github.com/tcminh1405/trancongminh-portfolio)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Showcase](#-project-showcase)
- [Architecture & Folder Structure](#-architecture--folder-structure)
- [Getting Started](#-getting-started)
- [Testing & Build](#-testing--build)
- [Contact & Connect](#-contact--connect)

---

## 📌 Overview

This repository contains the full source code for the portfolio web application of **Tran Cong Minh**.

Engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Three.js**, and **Framer Motion**, this application delivers a premium glassmorphism design system, interactive celestial 3D particle backgrounds, continuous marquee category filters, global real-time visitor analytics, and smooth 60fps physics animations.

---

## 🎨 Key Features

- 🌌 **Celestial White 3D Particle Background**: Interactive WebGL canvas in Three.js with starlight white particles (`#F8FAFC`) that gravitationally pull towards the mouse cursor and glow in electric cyan-blue (`#38BDF8`).
- ✍️ **React 19 Typewriter Hero**: Smooth inline typewriter title rotation (`Full-Stack Developer`, `Backend Developer`, `Web Developer`) with mobile viewport clamping and glued cursor.
- 🔀 **Framer Motion Gliding Header Navigation**: Active pill indicator (`<motion.span layoutId="activeHeaderPill" />`) with `cubic-bezier(0.16, 1, 0.3, 1)` liquid easing curve for 60fps sliding transitions on click & scroll.
- ⭐ **Live GitHub Star Counter**: Header & Mobile drawer button fetching live repository stars directly from GitHub REST API.
- 🔁 **Infinite Marquee Tech Filter**: `Technologies & Tools` section with an infinite horizontal scrolling marquee tab bar (`All`, `Backend Development`, `Frontend Development`, `Database Systems`, `Tools & Testing`, `Cloud & Deployment`, `AI & Automation`) with hover-pause selection.
- 📊 **Global Real-Time Visitor Analytics**: Footer statistics widget tracking `Currently Viewing (1 Active)`, `Total Visitors` (unique sessions), and `Total Page Views` with a 1.2s `CountUpNumber` ease-out cubic rolling animation powered by `counterapi.dev`.
- 🟢 **Pulsing Radar Status Indicator**: Pulsing green radar glow dots (`Available for work`, Avatar online status, Current status).
- 🎨 **SVG Logo Glow & Hover**: Custom SVG logo with smooth scale, drop-shadow glow, and color gradient transitions.
- 🌓 **Dark & Light Mode Toggle**: Powered by `next-themes` with zero SSR hydration mismatch.
- 📱 **Mobile-First Responsive Drawer**: Slide-over drawer menu with backdrop blur for mobile viewports.
- ✉️ **Server Actions Contact Form**: Contact form with Zod validation schema and Next.js Server Actions.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| --- | --- |
| **Core Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling & UI** | Tailwind CSS v4, Custom CSS Variables, Glassmorphism |
| **3D & Animations** | Three.js (WebGL Canvas), Framer Motion |
| **Global Analytics** | CounterAPI (`counterapi.dev`), Local & Session Storage |
| **Form & Email** | Next.js Server Actions, Resend API, Zod Validation |
| **State & Theme** | `next-themes`, Custom Hooks (`useMounted`, `useIsMobile`) |
| **Testing & Quality** | Vitest, ESLint, PostCSS, Git |

---

## 🚀 Project Showcase

| Project | Type | Key Architecture & Description | Tech Stack | Links |
| --- | --- | --- | --- | --- |
| **TechShop** | E-Commerce | Distributed Microservices platform (11 services) with Kafka KRaft event-driven architecture, Outbox & Saga pattern, Redis caching & Nginx (stress-tested at 12k req/s). | Java 17, Spring Boot, Spring Cloud, Kafka, Redis, MySQL, Docker, Nginx, Grafana k6, ReactJS | [GitHub Repo](https://github.com/tcminh1405/TechShopProject) |
| **Real-Time Messaging** | Communication | Enterprise messaging & WebRTC video call ecosystem with Socket.io duplex messaging, polyglot persistence (PostgreSQL & MongoDB), Web & Mobile. | Node.js, TypeScript, Socket.io, WebRTC, PostgreSQL, MongoDB, AWS, Docker, ReactJS, React Native | [GitHub Repo](https://github.com/tcminh1405/OTT_EducationProject) |
| **Tran Cong Minh Portfolio** | Personal Web | Interactive 3D universe canvas, Three.js starlight particles, Framer Motion sliding pill, CounterAPI global analytics, Next.js Server Actions & Resend email API. | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, Resend | [Live Demo](https://www.tcminh1405.id.vn/)<br>[GitHub Repo](https://github.com/tcminh1405/trancongminh-portfolio) |

---

## 📁 Architecture & Folder Structure

```text
trancongminh-portfolio/
├── public/
│   └── assets/
│       ├── images/          # Profile image assets
│       ├── logo/            # Branding logos
│       ├── project/         # Project preview screenshots
│       └── resume/          # Resume PDF document
├── src/
│   ├── app/
│   │   ├── actions/         # Contact form Server Actions (contact.ts)
│   │   ├── globals.css      # Custom design system & animations
│   │   ├── layout.tsx       # Root layout & providers
│   │   └── page.tsx         # Main portfolio page
│   ├── components/
│   │   ├── layout/          # Header, Footer, ThemeProvider, ClientOnly
│   │   ├── sections/        # Hero, About, Skills, Experience, Projects, Contact
    │   └── ui/              # Buttons, Logo, ThreeBackground, Typewriter, ScrollToTop
│   ├── data/                # Datasets (personal, skills, projects, experience)
│   ├── hooks/               # Custom React hooks (useMounted, useIsMobile)
│   ├── lib/                 # Utility functions & Zod validations
│   └── types/               # TypeScript type definitions
├── vitest.config.ts         # Vitest test configuration
├── next.config.ts           # Next.js configuration
└── tsconfig.json            # TypeScript compiler configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tcminh1405/trancongminh-portfolio.git
   cd trancongminh-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Build

Run the Vitest unit test suite:
```bash
npm run test
```

Create an optimized production build:
```bash
npm run build
```

---

## 📬 Contact & Connect

Have a project in mind or want to collaborate?
- **Website**: [tcminh1405.id.vn](https://www.tcminh1405.id.vn/)
- **Email**: [tcminh1405@gmail.com](mailto:tcminh1405@gmail.com)
- **GitHub**: [github.com/tcminh1405](https://github.com/tcminh1405)
- **LinkedIn**: [linkedin.com/in/kyungminn](https://linkedin.com/in/kyungminn)
