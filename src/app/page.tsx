"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <main className="relative bg-[var(--color-bg-primary)] w-full min-h-screen pb-24">
      <CustomCursor />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
