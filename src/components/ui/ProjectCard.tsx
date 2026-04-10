"use client";

import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import TechPill from "./TechPill";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./Icons";

const accentColorMap: Record<string, { dark: string; glow: string }> = {
  violet: { dark: "#A78BFA", glow: "rgba(167,139,250,0.15)" },
  sky:    { dark: "#38BDF8", glow: "rgba(56,189,248,0.15)" },
  emerald:{ dark: "#34D399", glow: "rgba(52,211,153,0.15)" },
  amber:  { dark: "#FB923C", glow: "rgba(251,146,60,0.15)" },
  teal:   { dark: "#2DD4BF", glow: "rgba(45,212,191,0.15)" },
};

interface Project {
  title: string;
  subtitle: string;
  status: string;
  featured: boolean;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function DomainPattern({ type }: { type: string }) {
  if (type === "violet") {
    return (
      <svg className="absolute top-3 right-3 w-28 h-28 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none">
        {[0,1,2,3,4,5].map((row) => [0,1,2,3].map((col) => (
          <polygon
            key={`${row}-${col}`}
            points={`${col*40+(row%2)*20+20},${row*34+10} ${col*40+(row%2)*20+35},${row*34+20} ${col*40+(row%2)*20+35},${row*34+36} ${col*40+(row%2)*20+20},${row*34+44} ${col*40+(row%2)*20+5},${row*34+36} ${col*40+(row%2)*20+5},${row*34+20}`}
            stroke="currentColor" strokeWidth="0.5" fill="none"
          />
        )))}
      </svg>
    );
  }
  if (type === "sky") {
    return (
      <svg className="absolute top-3 right-3 w-28 h-28 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
        {[20,40,60,80,100,120,140].map((y) => <line key={y} x1="10" y1={y} x2="130" y2={y} />)}
        <circle cx="150" cy="140" r="28" />
        <line x1="168" y1="158" x2="190" y2="180" strokeWidth="2" />
      </svg>
    );
  }
  return null;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const accent = accentColorMap[project.accentColor] || accentColorMap.emerald;

  return (
    <motion.div
      data-cursor="card"
      className="group glass-card relative overflow-hidden h-full flex flex-col p-6 transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      viewport={{ once: true, amount: 0.1 }}
      style={
        {
          "--hover-glow": accent.glow,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 28px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <DomainPattern type={project.accentColor} />

      {/* ── Card Header ────────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.1em] leading-tight"
          style={{ color: accent.dark }}
        >
          {project.subtitle}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* ── Title ──────────────────────────────────────── */}
      <h3
        className="text-[17px] font-semibold tracking-[-0.02em] mb-2 transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
        style={{ color: "var(--text-primary)" }}
      >
        {project.title}
      </h3>

      {/* ── Description — flex-grow pushes footer down ─ */}
      <p
        className="flex-grow text-[14px] leading-[1.78] mb-5"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description}
      </p>

      {/* ── Footer ─────────────────────────────────────── */}
      <div>
        <div
          className="w-full h-px mb-4 transition-colors duration-300"
          style={{ background: "var(--border-default)" }}
        />
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <TechPill key={tech} name={tech} brandColor={accent.dark} />
            ))}
            {project.techStack.length > 4 && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.06em]"
                style={{
                  background: "var(--pill-bg)",
                  border: "1px solid var(--pill-border)",
                  color: "var(--text-muted)",
                }}
              >
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 opacity-50 hover:opacity-100"
              style={{ color: "var(--text-primary)" }}
              aria-label={`${project.title} GitHub`}
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-semibold transition-all duration-200 hover:gap-1.5"
              style={{ color: accent.dark }}
              aria-label={`${project.title} live demo`}
            >
              Live
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
