"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/* ─── Light/Dark Accent colour map ─────────────────────────── */
const darkAccents: Record<string, string> = {
  "OncoVisionX": "#00d4ff",
  "ContractLens": "#a78bfa",
  "SharpEduManage": "#4fffb0",
  "FlavorAI": "#f97316",
  "Taleem-ul-Quran": "#facc15" 
};
const lightAccents: Record<string, string> = {
  "OncoVisionX": "#0099bb",
  "ContractLens": "#6d4fd4",
  "SharpEduManage": "#00845a",
  "FlavorAI": "#c45c00",
  "Taleem-ul-Quran": "#a07800"
};

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section ref={ref} id="work" className="relative py-24 lg:py-32" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.h2
            variants={itemVariants}
            className="font-mono font-bold tracking-tight mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 36px)", color: "var(--section-heading)" }}
          >
            {"< Things I've Built />"}
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-[15px] max-w-xl"
            style={{ color: "var(--section-subheading)" }}
          >
            Production-grade projects shipped across AI, Web3, and SaaS.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="w-full h-px mt-6"
            style={{ background: "var(--divider)" }}
          />
        </motion.div>

        {/* ── 3-Column Grid ─────────────────────────────────── */}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Row 1: 3 cards */}
          {siteData.projects.slice(0, 3).map((project, i) => (
            <div key={project.title} className="w-full lg:col-span-1">
              <ProjectCard project={project} index={i} theme={mounted ? resolvedTheme : "dark"} />
            </div>
          ))}

          {/* Row 2: 2 cards, left anchored & right anchored */}
          {siteData.projects.slice(3, 5).map((project, i) => {
            const isLeft = i === 0;
            return (
              <div 
                key={project.title} 
                className={`w-full lg:col-span-1 ${isLeft ? "lg:col-start-1" : "lg:col-start-3"}`}
              >
                <ProjectCard project={project} index={i + 3} theme={mounted ? resolvedTheme : "dark"} />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project, index, theme }: { project: typeof siteData.projects[0]; index: number; theme: string | undefined }) {
  const accentHex = theme === "light" ? (lightAccents[project.title] || "#00a86b") : (darkAccents[project.title] || "#34D399");
  
  const isDemo = project.title === "OncoVisionX" || project.title === "ContractLens";
  const isSharpEdu = project.title === "SharpEduManage";
  const hasGithub = project.githubUrl && project.githubUrl !== "";

  // WhatsApp demo generator
  const getDemoMessage = (projectName: string) => `Hi Naeem, I'm interested in a demo of ${projectName}. Could we schedule one?`;
  const openDemoRequest = (e: React.MouseEvent, projectName: string) => {
    e.preventDefault();
    const message = encodeURIComponent(getDemoMessage(projectName));
    const whNumber = siteData.personal.whatsapp.replace(/\+/g, "");
    window.open(`https://wa.me/${whNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative flex flex-col justify-between h-full w-full"
      style={{
        background: `linear-gradient(135deg, var(--bg-card) 0%, color-mix(in srgb, ${accentHex} 3%, var(--bg-card)))`,
        border: "1px solid var(--border-default)",
        borderLeft: `4px solid ${accentHex}`,
        borderRadius: "20px",
        padding: "28px",
        minHeight: "300px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.12)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = `0 16px 48px color-mix(in srgb, ${accentHex} 14%, transparent)`;
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.borderLeftColor = accentHex;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.12)";
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.borderLeftColor = accentHex;
      }}
    >
      <div className="flex flex-col flex-grow">
        
        {/* Top accent row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accentHex }} />
          <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            {project.subtitle.split('·')[0].trim()}
          </span>
        </div>

        {/* Name and badge */}
        <div className="flex flex-wrap items-center gap-3 mb-[10px]">
          <h3 className="font-[700] text-[19px]" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h3>
          <span
            className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider"
            style={{
              background: `color-mix(in srgb, ${accentHex} 15%, transparent)`,
              color: accentHex,
              border: `1px solid color-mix(in srgb, ${accentHex} 25%, transparent)`
            }}
          >
            {project.status || "Deployed"}
          </span>
        </div>

        {/* Description */}
        <p 
          className="text-[14px] leading-[1.7] mb-[18px]"
          style={{
            color: "var(--text-secondary)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "71px",
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="font-mono text-[11px] rounded-full"
              style={{
                padding: "3px 10px",
                background: "var(--tag-bg)",
                border: "1px solid var(--tag-border)",
                color: "var(--tag-text)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span
              className="font-mono text-[11px] rounded-full font-bold"
              style={{
                padding: "3px 10px",
                background: `color-mix(in srgb, ${accentHex} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentHex} 30%, transparent)`,
                color: accentHex,
              }}
            >
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-px my-[18px]" style={{ background: "var(--divider)" }} />

      {/* ── Bottom Action Row ──────────────────────────────── */}
      <div className="flex items-center gap-3 w-full">
        
        {/* Primary Action Button */}
        {isDemo ? (
           <a
            href="#"
            className={`flex-1 inline-flex items-center justify-center gap-2 h-[36px] rounded-[8px] text-[13px] font-semibold transition-all duration-200 text-white shadow-sm`}
            style={{ background: accentHex }}
            onClick={e => openDemoRequest(e, project.title)}
          >
            Request Demo <ArrowRight size={14} />
          </a>
        ) : (
          <a
            href={project.liveUrl || "#"}
            target={project.liveUrl ? "_blank" : undefined}
            rel={project.liveUrl ? "noopener noreferrer" : undefined}
            className={`flex-1 inline-flex items-center justify-center gap-2 h-[36px] rounded-[8px] text-[13px] font-medium transition-all duration-200 ${
              project.liveUrl ? "hover:scale-[1.02]" : "cursor-not-allowed opacity-50"
            }`}
            style={{
              border: "1px solid var(--btn-ghost-border)",
              color: "var(--btn-ghost-text)",
              background: "transparent",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--btn-ghost-hover-bg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            onClick={e => !project.liveUrl && e.preventDefault()}
          >
            View Project <ArrowRight size={14} />
          </a>
        )}

        {/* Secondary Actions */}
        {isSharpEdu ? (
          <>
            <a
              href="https://github.com/Rehman32/school-management-mern-client"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[36px] px-2 rounded-[8px] text-[12px] font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Client ↗
            </a>
            <a
              href="https://github.com/Rehman32/school-management-mern-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[36px] px-2 rounded-[8px] text-[12px] font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Server ↗
            </a>
          </>
        ) : (
          <a
            href={hasGithub && !isDemo ? project.githubUrl : "#"}
            target={hasGithub && !isDemo ? "_blank" : undefined}
            rel={hasGithub && !isDemo ? "noopener noreferrer" : undefined}
            className={`inline-flex items-center justify-center h-[36px] px-3 rounded-[8px] text-[13px] font-medium transition-colors ${
              (hasGithub && !isDemo) ? "" : "opacity-30 cursor-not-allowed pointer-events-none"
            }`}
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => { if(hasGithub && !isDemo) e.currentTarget.style.color = "var(--accent-primary)"; }}
            onMouseLeave={e => { if(hasGithub && !isDemo) e.currentTarget.style.color = "var(--text-muted)"; }}
            onClick={e => { if (!hasGithub || isDemo) e.preventDefault(); }}
          >
             GitHub ↗
          </a>
        )}

      </div>
    </motion.div>
  );
}
