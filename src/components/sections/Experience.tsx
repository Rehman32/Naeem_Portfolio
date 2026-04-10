"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";
import TechPill from "@/components/ui/TechPill";
import { GraduationCap } from "lucide-react";

export default function Experience() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [eyebrowRef, eyebrowInView] = useInView({ threshold: 0.5, triggerOnce: true });
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-24 lg:py-32">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
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
            Experience
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="mt-4 mb-16 font-semibold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "var(--text-primary)",
            }}
          >
            Where I&apos;ve Worked
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-8">
          {/* Animated timeline line */}
          <motion.div
            className="timeline-line"
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
          />

          {/* Experience Entries */}
          {siteData.experience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}

          {/* Education Block */}
          <EducationBlock />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof siteData.experience)[number];
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative mb-12"
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-8 top-6 w-3 h-3 rounded-full"
        style={{
          background: "var(--accent-primary)",
          boxShadow: "0 0 12px var(--accent-primary)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="glass-card p-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div>
            <h3
              className="text-[18px] font-semibold tracking-[-0.02em]"
              style={{ color: "var(--text-primary)" }}
            >
              {exp.title}
            </h3>
            <p
              className="text-[14px] mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {exp.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider"
              style={{
                background: "var(--pill-bg)",
                border: "1px solid var(--pill-border)",
                color: "var(--text-muted)",
              }}
            >
              {exp.type}
            </span>
          </div>
        </div>

        {/* Date */}
        <p
          className="font-mono text-[12px] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {exp.date}
        </p>

        {/* Track Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {exp.tracks.map((track) => (
            <TechPill key={track} name={track} />
          ))}
        </div>

        {/* Description */}
        <p
          className="text-[15px] leading-[1.75]"
          style={{ color: "var(--text-secondary)" }}
        >
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
}

function EducationBlock() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const cgpa = parseFloat(siteData.education.cgpa);
  const cgpaMax = parseFloat(siteData.education.cgpaMax);
  const cgpaPercent = (cgpa / cgpaMax) * 100;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-8 top-6 w-3 h-3 rounded-full"
        style={{
          background: "#A78BFA",
          boxShadow: "0 0 12px #A78BFA",
          transform: "translateX(-50%)",
        }}
      />

      <div
        className="glass-card p-6"
        style={{
          borderLeft: "4px solid var(--accent-secondary, #A78BFA)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap size={20} style={{ color: "var(--accent-secondary)" }} />
          <h3
            className="text-[18px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--text-primary)" }}
          >
            {siteData.education.degree}
          </h3>
        </div>
        <p
          className="text-[14px] mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {siteData.education.institution}
        </p>
        <p
          className="font-mono text-[12px] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {siteData.education.graduation}
        </p>

        {/* CGPA Progress Bar */}
        <div className="flex items-center gap-3">
          <span
            className="text-[13px] font-mono font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            CGPA
          </span>
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "var(--pill-bg)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--accent-secondary)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: `${cgpaPercent}%` } : { width: "0%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            />
          </div>
          <span
            className="text-[13px] font-mono font-semibold"
            style={{ color: "var(--accent-secondary)" }}
          >
            {siteData.education.cgpa}/{siteData.education.cgpaMax}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
