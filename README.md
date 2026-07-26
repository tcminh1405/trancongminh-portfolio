# 🌟 Tran Cong Minh — Personal Portfolio

<div align="center">

  ![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Three.js](https://img.shields.io/badge/Three.js-0.170-black?style=for-the-badge&logo=three.js&logoColor=white)
  ![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

  <p align="center">
    A modern, high-performance, interactive personal portfolio website built with <b>Next.js 15 (App Router)</b>, <b>React 19</b>, <b>TypeScript</b>, <b>Tailwind CSS</b>, and <b>Three.js</b>.
  </p>

  <a href="https://github.com/tcminh1405/trancongminh-portfolio"><strong>Explore GitHub Repo »</strong></a>
</div>

---

## 📌 Overview

This project is the personal portfolio website of **Tran Cong Minh**, a Software Engineering student and Full-Stack Developer based in Ho Chi Minh City, Vietnam. 

It highlights personal achievements, work experience, technical skillset, featured full-stack projects, and provides an interactive contact form powered by Next.js Server Actions and Zod validation.

---

## ✨ Key Features

- 🎨 **Modern & Glassmorphism Aesthetic**: Rich dark/light themes with smooth gradients, responsive navigation, and glassmorphism visual components.
- 🌌 **Three.js Interactive Background**: Dynamic 3D interactive particle background canvas.
- 🌓 **Seamless Dark/Light Mode**: Full theme customization powered by `next-themes` with zero SSR hydration mismatch (`ClientOnly` wrapper).
- 🚀 **Featured Projects Showcase**: Highlighted enterprise & full-stack projects (TechShop Microservices, Real-time Messaging & Call Ecosystem) with technology badges and repository links.
- 📊 **Categorized Skills Matrix**: Interactive skill bars and technology badges grouped by Frontend, Backend, and DevOps & Tools.
- ⏳ **Interactive Career Timeline**: Structured timeline for work experience and education.
- ✉️ **Contact Form with Server Actions**: Validated using **Zod** schema and processed with **Next.js Server Actions** for secure message submission.
- 🧪 **Unit Testing Framework**: Integrated **Vitest** testing setup for utility functions.
- ⚡ **Optimized Performance & SEO**: Built with Next.js App Router for optimal page load speed, meta tags, and accessibility.

---

## 🛠️ Tech Stack

### Core & Frameworks
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D / Graphics**: [Three.js](https://threejs.org/) & `@react-three/fiber`
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)

### Data Validation & Testing
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/)

---

## 📁 Project Structure

```text
trancongminh-portfolio/
├── public/
│   ├── assets/
│   │   ├── images/          # Profile image assets
│   │   ├── logo/            # Branding logos
│   │   ├── project/         # Project preview screenshots
│   │   └── resume/          # Resume PDF document
├── src/
│   ├── app/                 # Next.js App Router (Layouts, Pages, Server Actions)
│   │   ├── actions/         # Contact form Server Actions
│   │   ├── globals.css      # Custom styling & Tailwind directives
│   │   ├── layout.tsx       # Root layout & providers
│   │   └── page.tsx         # Main portfolio page
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer, ThemeProvider, ClientOnly wrappers
│   │   ├── sections/        # Hero, About, Skills, Experience, Projects, Contact
│   │   └── ui/              # Buttons, Cards, Badges, ThreeBackground, Modals
│   ├── data/                # Portfolio datasets (personal, skills, projects, experience)
│   ├── hooks/               # Custom React hooks (useMounted, etc.)
│   ├── lib/                 # Utility helpers & Zod validation schemas
│   └── types/               # TypeScript interfaces & types
├── vitest.config.ts         # Vitest test configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js 18+** or **20+** installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/tcminh1405/trancongminh-portfolio.git
cd trancongminh-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Running Tests

To run the unit test suite with Vitest:
```bash
npm run test
```

---

## 🔨 Production Build

To generate the production build:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

---

## 📬 Contact & Connect

- **Author**: Tran Cong Minh
- **Email**: [tcminh1405@gmail.com](mailto:tcminh1405@gmail.com)
- **GitHub**: [@tcminh1405](https://github.com/tcminh1405)
- **LinkedIn**: [Tran Cong Minh](https://linkedin.com/in/kyungminn)

---

<div align="center">
  <sub>Built with ❤️ by Tran Cong Minh</sub>
</div>
