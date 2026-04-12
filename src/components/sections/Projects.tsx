"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import TechPill from "@/components/ui/TechPill";
import StatusBadge from "@/components/ui/StatusBadge";
import { GitHubIcon } from "@/components/ui/Icons";

/* ─── Accent colour map with top-border + tag classes ─────── */
const accentMap: Record<string, {
  topBorder: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  hex: string;
}> = {
  violet:  { topBorder: "border-t-2 border-violet-500/40",  tagBg: "bg-violet-500/10",  tagText: "text-violet-400",  tagBorder: "border-violet-500/20",  hex: "#A78BFA" },
  sky:     { topBorder: "border-t-2 border-sky-500/40",     tagBg: "bg-sky-500/10",     tagText: "text-sky-400",     tagBorder: "border-sky-500/20",     hex: "#38BDF8" },
  emerald: { topBorder: "border-t-2 border-emerald-500/40", tagBg: "bg-emerald-500/10", tagText: "text-emerald-400", tagBorder: "border-emerald-500/20", hex: "#34D399" },
  amber:   { topBorder: "border-t-2 border-amber-500/40",   tagBg: "bg-amber-500/10",   tagText: "text-amber-400",   tagBorder: "border-amber-500/20",   hex: "#FB923C" },
  teal:    { topBorder: "border-t-2 border-teal-500/40",    tagBg: "bg-teal-500/10",    tagText: "text-teal-400",    tagBorder: "border-teal-500/20",    hex: "#2DD4BF" },
};

/* ─── Decorative SVG backgrounds ──────────────────────────── */
function HexPattern({ color }: { color: string }) {
  const pts = (row: number, col: number) => {
    const x = col * 40 + (row % 2) * 20;
    const y = row * 34;
    return `${x+20},${y+10} ${x+35},${y+20} ${x+35},${y+36} ${x+20},${y+44} ${x+5},${y+36} ${x+5},${y+20}`;
  };
  return (
    <svg
      width="180" height="180" viewBox="0 0 180 180"
      className="absolute top-0 right-0 opacity-[0.12] pointer-events-none"
      aria-hidden="true"
    >
      {[0,1,2,3,4].map(row => [0,1,2,3].map(col => (
        <polygon key={`${row}-${col}`} points={pts(row,col)} fill={color} />
      )))}
    </svg>
  );
}

function DocPattern({ color }: { color: string }) {
  return (
    <svg
      width="160" height="180" viewBox="0 0 160 180"
      className="absolute top-0 right-0 opacity-[0.12] pointer-events-none"
      fill="none" aria-hidden="true"
    >
      {[20,35,50,65,80,95,110,125].map((y, i) => (
        <line key={y} x1="10" y1={y} x2={i % 3 === 0 ? 90 : 130} y2={y} stroke={color} strokeWidth="2" strokeLinecap="round" />
      ))}
      <circle cx="128" cy="136" r="24" stroke={color} strokeWidth="2" />
      <line x1="145" y1="153" x2="158" y2="168" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Individual Project Card ──────────────────────────────── */
type Project = typeof siteData.projects[number];

function BentoCard({ project, index }: { project: Project; index: number }) {
  const ac = accentMap[project.accentColor] || accentMap.emerald;
  const isFeatured = project.priority <= 2;

  return (
    <motion.div
      className={`glass-card relative overflow-hidden flex flex-col h-full ${ac.topBorder} transition-all duration-300 hover:-translate-y-1`}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      viewport={{ once: true, amount: 0.1 }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 32px ${ac.hex}22, 0 8px 32px rgba(0,0,0,0.12)`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; }}
    >
      {/* Decorative SVG */}
      {isFeatured && project.accentColor === "violet" && <HexPattern color={ac.hex} />}
      {isFeatured && project.accentColor === "sky"    && <DocPattern  color={ac.hex} />}

      {/* Body */}
      <div className="flex flex-col h-full p-6">
        {/* Top: category eyebrow + status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] border ${ac.tagBg} ${ac.tagText} ${ac.tagBorder}`}
          >
            {project.subtitle}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3
          className="font-bold tracking-[-0.02em] mb-2 transition-colors duration-200"
          style={{
            fontSize: isFeatured ? "clamp(22px, 2vw, 28px)" : "17px",
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>

        {/* Description — flex-grow pushes footer down */}
        <p
          className="flex-grow text-[14px] leading-[1.78] mb-5"
          style={{
            color: "var(--text-secondary)",
            WebkitLineClamp: isFeatured ? undefined : 4,
            overflow: isFeatured ? undefined : "hidden",
            display: isFeatured ? undefined : "-webkit-box",
            WebkitBoxOrient: isFeatured ? undefined : "vertical" as const,
          }}
        >
          {project.description}
        </p>

        {/* Footer */}
        <div>
          <div className="w-full h-px mb-4" style={{ background: "var(--border-default)" }} />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, isFeatured ? 6 : 4).map(tech => (
                <TechPill key={tech} name={tech} brandColor={ac.hex} />
              ))}
              {project.techStack.length > (isFeatured ? 6 : 4) && (
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase"
                  style={{ background: "var(--pill-bg)", border: "1px solid var(--pill-border)", color: "var(--text-muted)" }}
                >
                  +{project.techStack.length - (isFeatured ? 6 : 4)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="opacity-45 hover:opacity-100 transition-all duration-300 hover:scale-110"
                style={{ color: "var(--text-primary)" }}
                aria-label={`${project.title} GitHub`}
              >
                <GitHubIcon size={15} />
              </a>
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-semibold transition-all duration-200 hover:gap-1.5"
                style={{ color: ac.hex }}
              >
                Live <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects section ─────────────────────────────────────── */
export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [eyebrowRef, eyebrowInView] = useInView({ threshold: 0.5, triggerOnce: true });

  const featured = siteData.projects.filter(p => p.priority <= 2).sort((a, b) => a.priority - b.priority);
  const regular  = siteData.projects.filter(p => p.priority > 2).sort( (a, b) => a.priority - b.priority);

  return (
    <section ref={ref} id="work" className="relative py-24 lg:py-32" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.span
            ref={eyebrowRef}
            variants={itemVariants}
            className={`eyebrow-line font-mono text-[12px] uppercase tracking-[0.12em] ${eyebrowInView ? "animate" : ""}`}
            style={{ color: "var(--accent-primary)" }}
          >
            Selected Work
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mt-4 mb-3 font-semibold tracking-[-0.03em]"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "var(--text-primary)" }}
          >
            Things I&apos;ve Built{" "}
            <sup className="text-[16px] font-mono" style={{ color: "var(--accent-primary)" }}>
              0{siteData.projects.length}
            </sup>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[15px] max-w-lg" style={{ color: "var(--text-muted)" }}>
            Production-grade systems built from scratch — from UI/UX to deployment.
          </motion.p>
        </motion.div>

        {/* ── Featured row: col-span-7 + col-span-5 ────────── */}
        <div
          className="grid gap-4 mb-4"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {featured.map((project, i) => (
            <div
              key={project.title}
              className={`
                col-span-12
                md:col-span-12
                ${i === 0 ? "lg:col-span-7" : "lg:col-span-5"}
              `}
              style={{ minHeight: 560 }}
            >
              <BentoCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* ── Regular row: col-span-4 each ─────────────────── */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {regular.map((project, i) => (
            <div
              key={project.title}
              className="col-span-12 md:col-span-6 lg:col-span-4"
              style={{ minHeight: 260 }}
            >
              <BentoCard project={project} index={i + featured.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
