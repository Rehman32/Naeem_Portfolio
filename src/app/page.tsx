"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import AmbientOrbs from "@/components/ui/AmbientOrbs";
import ScrollProgress from "@/components/ui/ScrollProgress";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <AmbientOrbs />

      <Header />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}