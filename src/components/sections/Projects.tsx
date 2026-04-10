"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import BentoCard from "@/components/ui/BentoCard";

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
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
            className="mt-4 mb-12 font-semibold tracking-[-0.03em]"
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
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "280px",
          }}
        >
          {/* Featured projects: row-span-2 */}
          {siteData.projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <div
                key={project.title}
                className={`${project.gridSpan} row-span-2 max-lg:col-span-12`}
              >
                <BentoCard project={project} index={i} />
              </div>
            ))}

          {/* Non-featured projects */}
          {siteData.projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <div
                key={project.title}
                className={`${project.gridSpan} max-lg:col-span-6 max-sm:col-span-12`}
              >
                <BentoCard project={project} index={i + 2} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
