"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [eyebrowRef, eyebrowInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section ref={ref} id="work" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.span
            ref={eyebrowRef}
            variants={itemVariants}
            className={`eyebrow-line font-mono text-[12px] uppercase tracking-[0.12em] ${
              eyebrowInView ? "animate" : ""
            }`}
            style={{ color: "var(--accent-primary)" }}
          >
            Selected Work
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="mt-4 mb-4 font-semibold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "var(--text-primary)",
            }}
          >
            Things I&apos;ve Built{" "}
            <sup
              className="text-[16px] font-mono"
              style={{ color: "var(--accent-primary)" }}
            >
              0{siteData.projects.length}
            </sup>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[15px] mb-12 max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Production-grade systems built from scratch — from UI/UX to deployment.
          </motion.p>
        </motion.div>

        {/* Uniform 3-column grid — all cards same height per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
