# 🌟 Tran Cong Minh — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

Personal Portfolio Web Application of **Tran Cong Minh** — Full-Stack Developer & Software Engineering Student at Ho Chi Minh City University of Industry.

🔗 **Live GitHub Repository**: [https://github.com/tcminh1405/trancongminh-portfolio](https://github.com/tcminh1405/trancongminh-portfolio)

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Featured Projects](#-featured-projects)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Contact](#-contact)

---

## ✨ Features

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
| **Core Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS, Custom CSS Variables, Glassmorphism |
| **3D & Animations** | Three.js, Canvas Animations, Intersection Observer |
| **Form & Validation** | Next.js Server Actions, Zod Schema Validation |
| **State & Theme** | next-themes, Custom Hooks (`useMounted`) |
| **Testing & Tooling** | Vitest, ESLint, PostCSS, Git |

---

## 🚀 Featured Projects

### 1. 🛒 TechShop — E-Commerce Platform
Distributed e-commerce platform architected with Java 17, Spring Boot 3.x, Spring Cloud (11 decoupled services), Kafka KRaft, Transactional Outbox, Saga Choreography, Redis, Docker, and Nginx.
- **Technologies**: Java 17, Spring Boot, Spring Cloud, Kafka, Redis, MySQL, Docker, Nginx, Grafana k6, ReactJS
- **GitHub**: [https://github.com/tcminh1405/TechShopProject](https://github.com/tcminh1405/TechShopProject)

### 2. 💬 Real-time Messaging & Call Ecosystem
Fullstack real-time messaging & communication platform supporting instant chat with Socket.io, 1:1 audio/video calls with WebRTC, notifications, friend management, and event scheduling.
- **Technologies**: Node.js, TypeScript, Socket.io, WebRTC, PostgreSQL, MongoDB, AWS, Docker, ReactJS, React Native, Tailwind CSS
- **GitHub**: [https://github.com/tcminh1405/OTT_EducationProject](https://github.com/tcminh1405/OTT_EducationProject)

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

- **Name**: Tran Cong Minh
- **Role**: Full-Stack Developer
- **Email**: [tcminh1405@gmail.com](mailto:tcminh1405@gmail.com)
- **GitHub**: [github.com/tcminh1405](https://github.com/tcminh1405)
- **LinkedIn**: [linkedin.com/in/kyungminn](https://linkedin.com/in/kyungminn)
