import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ThreeBackground from "@/components/ui/ThreeBackground";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ClientOnly from "@/components/layout/ClientOnly";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ClientOnly>
        <ThreeBackground />
      </ClientOnly>

      <Header />

      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <ClientOnly>
        <ScrollToTop />
      </ClientOnly>
    </div>
  );
}
