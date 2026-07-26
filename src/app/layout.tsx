import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import ScrollAnimationInit from "@/components/layout/ScrollAnimationInit";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tran Cong Minh | Full-Stack Developer Portfolio",
  description:
    "Personal Portfolio Website of Tran Cong Minh — Full-Stack Developer & Software Engineering Student.",
  keywords: [
    "Tran Cong Minh",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Portfolio",
    "React",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ScrollAnimationInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
