"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Monitor, Server, Brain, Cloud } from "lucide-react";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import TechPill from "@/components/ui/TechPill";

const categories = [
  {
    key: "frontend" as const,
    label: "Frontend",
    icon: Monitor,
    accentColor: "#34D399",
  },
  {
    key: "backend" as const,
    label: "Backend",
    icon: Server,
    accentColor: "#38BDF8",
  },
  {
    key: "ai_ml" as const,
    label: "AI / ML",
    icon: Brain,
    accentColor: "#A78BFA",
  },
  {
    key: "devops" as const,
    label: "DevOps / Cloud",
    icon: Cloud,
    accentColor: "#FB923C",
  },
];

export default function TechStack() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [eyebrowRef, eyebrowInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section ref={ref} id="stack" className="relative py-24 lg:py-32">
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
            Technical Arsenal
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
            Stack & Tools
          </motion.h2>
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <SkillCategoryCard key={cat.key} category={cat} index={i} skills={siteData.skills[cat.key]} />
          ))}
        </div>

        {/* "Currently Obsessing Over" Ticker */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p
            className="text-center font-mono text-[12px] uppercase tracking-[0.12em] mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Currently Obsessing Over
          </p>
          <div
            className="marquee-container w-full overflow-hidden py-4 rounded-xl"
            style={{ background: "var(--marquee-bg)" }}
          >
            <div
              className="flex whitespace-nowrap"
              style={{ animation: "marquee-slow 40s linear infinite" }}
            >
              {[...siteData.obsessing, ...siteData.obsessing].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-5 text-[14px] font-mono"
                  style={{ color: "var(--accent-primary)" }}
                >
                  <span className="opacity-50">&gt;_</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  index,
  skills,
}: {
  category: (typeof categories)[number];
  index: number;
  skills: string[];
}) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: `color-mix(in srgb, ${category.accentColor} 15%, transparent)`,
          }}
        >
          <Icon size={18} style={{ color: category.accentColor }} />
        </div>
        <span
          className="text-[15px] font-semibold tracking-[-0.01em]"
          style={{ color: category.accentColor }}
        >
          {category.label}
        </span>
        <span
          className="ml-auto text-[11px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: "var(--pill-bg)",
            border: "1px solid var(--pill-border)",
            color: "var(--text-muted)",
          }}
        >
          {skills.length}
        </span>
      </div>

      {/* Skills */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {skills.map((skill) => (
          <motion.div key={skill} variants={itemVariants}>
            <TechPill name={skill} brandColor={category.accentColor} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
