"use client";

import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import TechPill from "./TechPill";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./Icons";

const accentColorMap: Record<string, { dark: string; light: string }> = {
  violet: { dark: "#A78BFA", light: "#7C3AED" },
  sky: { dark: "#38BDF8", light: "#0284C7" },
  emerald: { dark: "#34D399", light: "#059669" },
  amber: { dark: "#FB923C", light: "#EA580C" },
  teal: { dark: "#2DD4BF", light: "#0D9488" },
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
  gridSpan: string;
}

interface BentoCardProps {
  project: Project;
  index: number;
}

function FeaturedPattern({ type }: { type: string }) {
  if (type === "violet") {
    // Hexagonal grid pattern for OncoVisionX (medical/cellular)
    return (
      <svg
        className="absolute top-0 right-0 w-48 h-48 opacity-[0.08]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <polygon
              key={`${row}-${col}`}
              points={`${col * 40 + (row % 2) * 20 + 20},${row * 34 + 10} ${
                col * 40 + (row % 2) * 20 + 35
              },${row * 34 + 20} ${col * 40 + (row % 2) * 20 + 35},${
                row * 34 + 36
              } ${col * 40 + (row % 2) * 20 + 20},${row * 34 + 44} ${
                col * 40 + (row % 2) * 20 + 5
              },${row * 34 + 36} ${col * 40 + (row % 2) * 20 + 5},${
                row * 34 + 20
              }`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          ))
        )}
      </svg>
    );
  }
  if (type === "sky") {
    // Document lines + magnifier for ContractLens
    return (
      <svg
        className="absolute top-0 right-0 w-48 h-48 opacity-[0.08]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        {[30, 50, 70, 90, 110, 130, 150].map((y) => (
          <line key={y} x1="20" y1={y} x2="140" y2={y} />
        ))}
        <circle cx="155" cy="140" r="30" />
        <line x1="175" y1="160" x2="195" y2="180" strokeWidth="2" />
      </svg>
    );
  }
  return null;
}

export default function BentoCard({ project, index }: BentoCardProps) {
  const accent = accentColorMap[project.accentColor] || accentColorMap.emerald;
  const isFeatured = project.featured;

  return (
    <motion.div
      data-cursor="card"
      className={`glass-card relative overflow-hidden p-6 flex flex-col justify-between ${
        isFeatured ? "md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.25 },
      }}
      style={{ "--card-accent": accent.dark } as React.CSSProperties}
    >
      {isFeatured && <FeaturedPattern type={project.accentColor} />}

      {/* Top Row: Category + Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.08em]"
            style={{ color: accent.dark }}
          >
            {project.subtitle}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold tracking-[-0.02em] mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[15px] leading-[1.75] mt-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom Row: Tech + Links */}
      <div className="mt-6">
        <div
          className="w-full h-px mb-4"
          style={{ background: "var(--border-default)" }}
        />
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <TechPill key={tech} name={tech} brandColor={accent.dark} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-150 hover:scale-110"
              style={{ color: "var(--text-muted)" }}
              aria-label={`${project.title} GitHub repository`}
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-medium transition-all duration-150"
              style={{ color: accent.dark }}
              aria-label={`${project.title} live demo`}
            >
              Live
              <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
