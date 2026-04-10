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

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="section-sep" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <AmbientOrbs />

      <Header />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}