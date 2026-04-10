"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { siteData } from "@/config/site-data";
import { containerVariants, letterVariants, itemVariants } from "@/components/animations/variants";
import AvatarFrame from "@/components/ui/AvatarFrame";

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const nameChars = siteData.personal.name.split("");

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-8 overflow-hidden"
      id="hero"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Mobile: Avatar on top */}
          <div className="lg:hidden flex justify-center">
            <AvatarFrame />
          </div>

          {/* Left Column — Text (55%) */}
          <motion.div
            className="flex-[0_0_55%] flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Availability Pill */}
            <motion.div variants={itemVariants}>
              <span
                className="glass-card inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{
                      backgroundColor: "#34D399",
                      animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {siteData.personal.availability}
              </span>
            </motion.div>

            {/* Name — 3D Letter Flip */}
            <motion.h1
              className="hero-name font-bold tracking-[-0.04em] leading-[1.05]"
              style={{
                fontSize: "clamp(56px, 8vw, 96px)",
                perspective: "800px",
                color: "var(--text-primary)",
              }}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role — Gradient text */}
            <motion.p
              variants={itemVariants}
              className="gradient-text font-normal tracking-[-0.01em]"
              style={{
                fontSize: "clamp(20px, 3vw, 28px)",
              }}
            >
              {siteData.personal.role}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-[16px] leading-[1.75] max-w-[480px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {siteData.personal.bio}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 font-mono text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              {siteData.stats.map((stat, i) => (
                <span key={stat.label} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="mr-3" style={{ color: "var(--text-muted)" }}>
                      ·
                    </span>
                  )}
                  <span style={{ color: "var(--accent-primary)" }} className="font-semibold">
                    {stat.value}{stat.suffix}
                  </span>
                  <span>{stat.label}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mt-2">
              {/* Primary CTA */}
              <a
                href="#work"
                className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--accent-primary)",
                  color: "#09090B",
                }}
              >
                View My Work
                <span className="text-sm">↓</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923193625232"
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all duration-200 hover:scale-105"
                style={{
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25D366",
                  background: "rgba(37, 211, 102, 0.05)",
                }}
              >
                WhatsApp
                <ExternalLink size={13} />
              </a>

              {/* Email link */}
              <a
                href={`mailto:${siteData.personal.email}`}
                className="text-[14px] transition-all duration-200 hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {siteData.personal.email}
                <span className="ml-1">→</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mt-1">
              <a
                href={siteData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ color: "var(--text-muted)" }}
                aria-label="GitHub"
              >
                <GitHubIcon size={20} />
              </a>
              <a
                href={siteData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ color: "var(--text-muted)" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Avatar (45%) — Desktop only */}
          <motion.div
            className="hidden lg:flex flex-[0_0_45%] items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <AvatarFrame />
          </motion.div>
        </div>

        {/* Hero Bottom — Marquee Strip */}
        <motion.div
          className="mt-16 lg:mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.8 }}
        >
          <div
            className="marquee-container w-full overflow-hidden py-4 rounded-xl"
            style={{ background: "var(--marquee-bg)" }}
          >
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
              {[...siteData.marqueeItems, ...siteData.marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 px-4 text-[14px] font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-primary)" }} className="text-xs">
                    ✦
                  </span>
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
