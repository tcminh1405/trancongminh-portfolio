import type { ProjectData } from "@/types";

export const projects: ProjectData[] = [
  {
    id: "techshop",
    title: "TechShop — E-Commerce Platform",
    description:
      "Distributed e-commerce platform architected with Java 17, Spring Boot 3.x, Spring Cloud (11 decoupled services), Kafka KRaft, Transactional Outbox, Saga Choreography, Redis, Docker, and Nginx (tested up to 12,000 req/s with Grafana k6).",
    image: "/assets/project/home_techshop.png",
    techs: ["Java 17", "Spring Boot", "Spring Cloud", "Kafka", "Redis", "MySQL", "Docker", "Nginx", "Grafana k6", "ReactJS"],
    demoUrl: "https://github.com/tcminh1405/TechShopProject", // Thêm placeholder để hiển thị nút Live Demo
    githubUrl: "https://github.com/tcminh1405/TechShopProject",
  },
  {
    id: "realtime-messaging",
    title: "Real-time Messaging & Call Ecosystem",
    description:
      "Fullstack real-time messaging & communication platform supporting instant chat with Socket.io, 1:1 audio/video calls with WebRTC, notifications, friend management, and event scheduling.",
    image: "/assets/project/home_messaging.png",
    techs: ["Node.js", "TypeScript", "Socket.io", "WebRTC", "PostgreSQL", "MongoDB", "AWS", "Docker", "CI/CD", "ReactJS", "React Native", "Tailwind CSS"],
    demoUrl: "https://github.com/tcminh1405/OTT_EducationProject", // Thêm placeholder để hiển thị nút Live Demo
    githubUrl: "https://github.com/tcminh1405/OTT_EducationProject",
  },
  {
    id: "portfolio",
    title: "Tran Cong Minh — Interactive Portfolio",
    description:
      "Personal portfolio web application featuring interactive 3D space animations, 360° rotatable 3D planet canvas, glassmorphic UI elements, dark/light theme switching, and Server Actions.",
    image: "/assets/project/home_portfolio.png",
    techs: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Resend API"],
    demoUrl: "https://www.tcminh1405.id.vn/",
    githubUrl: "https://github.com/tcminh1405/trancongminh-portfolio",
  },
];

