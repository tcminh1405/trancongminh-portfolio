// Root layout của ứng dụng — Server Component
// Bao bọc toàn bộ nội dung trang với font, theme, header, footer và music player
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollAnimationInit from "@/components/layout/ScrollAnimationInit";
import ScrollToTop from "@/components/ui/ScrollToTop";

import Script from "next/script";

const sora = Sora({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subsets: ["latin", "vietnamese"] as any,
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trancongminh.dev"),
  title: "Trần Công Minh Portfolio | Software Engineer",
  description:
    "Portfolio của Trần Công Minh — Full Stack Developer với kinh nghiệm React, Next.js, Node.js. Xem các dự án và liên hệ hợp tác.",
  keywords: [
    "portfolio", "developer", "React", "Next.js",
    "Full Stack", "Vietnam", "Trần Công Minh",
  ],
  icons: {
    icon: "/assets/logo/logo-light.png",
    shortcut: "/assets/logo/logo-light.png",
    apple: "/assets/logo/logo-light.png",
  },
  openGraph: {
    title: "Trần Công Minh | Full Stack Developer",
    description:
      "Portfolio của Trần Công Minh — Full Stack Developer với kinh nghiệm React, Next.js, Node.js.",
    url: "https://trancongminh.dev",
    type: "website",
    images: [{ url: "/assets/banner.png", width: 1200, height: 630, alt: "TCM Portfolio Banner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Công Minh | Full Stack Developer",
    description: "Portfolio của Trần Công Minh — Full Stack Developer.",
    images: ["/assets/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning bắt buộc với next-themes để tránh hydration mismatch
    // khi class "dark" được thêm vào phía client
    <html
      lang="vi"
      className={sora.variable}
      suppressHydrationWarning
    >
      <head>
        {/*
          Script chạy đồng bộ (blocking) TRƯỚC khi React hydrate.
          Xóa attribute "bis_skin_checked" do browser extensions (BIS, Bitdefender, v.v.)
          inject vào DOM, ngăn hydration mismatch khi React so sánh server HTML vs virtual DOM.
        */}
        <Script
          id="bis-skin-cleaner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                          node.removeAttribute && node.removeAttribute('bis_skin_checked');
                          node.querySelectorAll && node.querySelectorAll('[bis_skin_checked]').forEach(function(el) {
                            el.removeAttribute('bis_skin_checked');
                          });
                        }
                      });
                      if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                        mutation.target.removeAttribute('bis_skin_checked');
                      }
                    });
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['bis_skin_checked'],
                    childList: true,
                    subtree: true
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      {/* suppressHydrationWarning trên body để bỏ qua attributes inject bởi browser extensions */}
      <body className="font-sora antialiased" suppressHydrationWarning>
        {/* ThemeProvider bao bọc toàn bộ nội dung để cung cấp context dark/light mode */}
        <ThemeProvider>
          {/* ScrollAnimationInit: khởi tạo IntersectionObserver cho class animate-on-scroll */}
          <ScrollAnimationInit />
          <Header />

          {/* Nội dung trang — page.tsx render trực tiếp không có <main> wrapper thêm */}
          {children}

          {/* Footer hiển thị copyright và social links ở mọi trang */}
          <Footer />

          {/* ScrollToTop cố định góc dưới bên phải */}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
