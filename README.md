# 🌌 Tran Cong Minh — Personal Portfolio

<p align="center">
  <a href="https://www.tcminh1405.id.vn/"><img src="https://img.shields.io/badge/Live_Website-tcminh1405.id.vn-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/></a>
</p>

Personal Portfolio Web Application of **Tran Cong Minh** — Full-Stack Developer & Software Engineering Student at Ho Chi Minh City University of Industry.

🌐 **Live Website**: [https://www.tcminh1405.id.vn](https://www.tcminh1405.id.vn/)  
🔗 **GitHub Repository**: [https://github.com/tcminh1405/trancongminh-portfolio](https://github.com/tcminh1405/trancongminh-portfolio)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Showcase](#-project-showcase)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Contact](#-contact)

---

## 📌 Overview

This repository contains the source code for the personal portfolio web application of **Tran Cong Minh** — Software Engineer & Full-Stack Developer. 

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Three.js**, this web application features a modern glassmorphism design system, theme-aware 3D particle and space canvases, responsive layouts, and server-side form handling with Zod validation and email notifications.

---

## 🎨 Features

- 🎨 **Modern UI/UX & Glassmorphism Design**: Custom dark and light themes with smooth glassmorphism containers and gradients.
- 🌌 **Three.js Interactive Background**: Dynamic 3D interactive particle background canvas.
- 🌓 **Dark & Light Mode Toggle**: Powered by `next-themes` with zero SSR hydration mismatch (`ClientOnly` wrapper).
- 📱 **Fully Responsive Layout**: Mobile-first design optimized for desktop, tablet, and mobile devices.
- 💼 **Projects Showcase**: Interactive project cards displaying backend/full-stack projects with technology badges, descriptions, and GitHub links.
- 🛠️ **Categorized Skills Matrix**: Interactive skill bars and technology badges grouped by Frontend, Backend, and DevOps & Tools.
- ⏳ **Experience & Education Timeline**: Interactive career milestones timeline.
- ✉️ **Contact Form**: Form handling with Zod validation schema and Next.js Server Actions.
- 🧪 **Automated Testing**: Integrated Vitest unit tests for core utilities.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| --- | --- |
| **Core Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Custom CSS Variables, Glassmorphism |
| **3D & Animations** | Three.js, Framer Motion, Canvas Animations |
| **Form & Email** | Next.js Server Actions, Resend API, Zod Validation |
| **State & Theme** | next-themes, Custom Hooks (`useMounted`) |
| **Testing & Tooling** | Vitest, ESLint, PostCSS, Git |

---

## 🚀 Project Showcase

| Project | Type | Key Architecture & Description | Tech Stack | Links |
| --- | --- | --- | --- | --- |
| **🛒 TechShop** | E-Commerce | Distributed Microservices platform (11 services) with Kafka KRaft event-driven architecture, Outbox & Saga pattern, Redis caching & Nginx (stress-tested at 12k req/s). | Java 17, Spring Boot, Spring Cloud, Kafka, Redis, MySQL, Docker, Nginx, Grafana k6, ReactJS | [GitHub Repo](https://github.com/tcminh1405/TechShopProject) |
| **💬 Real-Time Messaging** | Communication | Enterprise messaging & WebRTC video call ecosystem with Socket.io duplex messaging, polyglot persistence (PostgreSQL & MongoDB), Web & Mobile. | Node.js, TypeScript, Socket.io, WebRTC, PostgreSQL, MongoDB, AWS, Docker, ReactJS, React Native | [GitHub Repo](https://github.com/tcminh1405/OTT_EducationProject) |
| **🌟 Tran Cong Minh Portfolio** | Personal Web | Interactive 3D universe canvas, 360° rotatable 3D planet with mouse/touch drag, Framer Motion animations, Next.js Server Actions & Resend email API. | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, Resend | [Live Demo](https://www.tcminh1405.id.vn/)<br>[GitHub Repo](https://github.com/tcminh1405/trancongminh-portfolio) |

---

## 📁 Project Architecture

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
│   │   ├── globals.css      # Custom styling & CSS variables
│   │   ├── layout.tsx       # Root layout & providers
│   │   └── page.tsx         # Main portfolio page
│   ├── components/
│   │   ├── layout/          # Header, Footer, ThemeProvider, ClientOnly
│   │   ├── sections/        # Hero, About, Skills, Experience, Projects, Contact
│   │   └── ui/              # Buttons, Cards, Badges, ThreeBackground, ScrollToTop
│   ├── data/                # Portfolio datasets (personal, skills, projects, experience)
│   ├── hooks/               # Custom React hooks (useMounted)
│   ├── lib/                 # Utility functions & Zod validations
│   └── types/               # TypeScript interfaces & types
├── vitest.config.ts         # Vitest test runner configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
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

## 🧪 Testing

Run the Vitest unit tests:
```bash
npm run test
```

Build for production:
```bash
npm run build
```

---

## 📬 Contact

Have a project in mind or want to collaborate?
- **Website**: [tcminh1405.id.vn](https://www.tcminh1405.id.vn/)
- **Email**: [tcminh1405@gmail.com](mailto:tcminh1405@gmail.com)
- **GitHub**: [github.com/tcminh1405](https://github.com/tcminh1405)
- **LinkedIn**: [linkedin.com/in/kyungminn](https://linkedin.com/in/kyungminn)
