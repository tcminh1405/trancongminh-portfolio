import type { ComponentType } from "react";

// --- Personal Info ---
export interface PersonalInfo {
  name: string;
  title: string;
  description: string; // tối đa 200 ký tự
  avatar: string; // path từ /assets/
  location: string;
  email: string;
  phone?: string; // optional
  github: string; // URL
  linkedin: string; // URL
  resumeUrl: string; // path từ /assets/resume/
}

// --- Skills ---
export interface SkillItem {
  name: string;
  percentage: number;
  icon?: ComponentType<{ size?: number; className?: string; color?: string }>;
  image?: string;
  color?: string;
}

export interface SkillCategory {
  title: string;
  icon?: ComponentType<{ size?: number; className?: string; color?: string }>;
  accentColor?: string;
  skills: SkillItem[];
}

// --- Projects ---
export interface ProjectData {
  id: string;
  title: string;
  description: string; // tối đa 150 ký tự
  image: string; // path từ /assets/
  techs: string[]; // tối đa 8 items
  demoUrl?: string;
  githubUrl?: string;
}

// --- Experience ---
export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string; // format: "MM/YYYY"
  endDate: string | "Hiện tại";
  description: string;
  order: number; // dùng để sort (số nhỏ = mới nhất)
}





// --- Contact Form ---
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
  timestamp?: number;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}
