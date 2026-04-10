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
  const nameWords = siteData.personal.name.split(" ");

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-8 overflow-hidden"
      id="hero"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-20">

          {/* Mobile: Avatar on top — AvatarFrame handles mobile size internally */}
          <div className="lg:hidden flex justify-center w-full py-4">
            <AvatarFrame />
          </div>

          {/* Left Column — Text (60%) */}
          <motion.div
            className="flex-1 flex flex-col gap-5 min-w-0"
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

            {/* Name — 3D Letter Flip — word-per-line, no wrapping */}
            <div style={{ perspective: "800px" }}>
              {nameWords.map((word, wi) => (
                <motion.div
                  key={wi}
                  className="block whitespace-nowrap overflow-hidden"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <h1
                    className="hero-name font-bold tracking-tight leading-[1.0] whitespace-nowrap"
                    style={{
                      fontSize: "clamp(48px, 7vw, 88px)",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {word.split("").map((char, ci) => (
                      <motion.span
                        key={ci}
                        variants={letterVariants}
                        className="inline-block"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>
              ))}
            </div>

            {/* Role — Gradient text */}
            <motion.p
              variants={itemVariants}
              className="gradient-text font-normal tracking-[-0.01em]"
              style={{
                fontSize: "clamp(18px, 2.5vw, 26px)",
              }}
            >
              {siteData.personal.role}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] leading-[1.8] max-w-[500px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {siteData.personal.bio}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              {siteData.stats.map((stat, i) => (
                <span key={stat.label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span className="opacity-30">·</span>
                  )}
                  <span style={{ color: "var(--accent-primary)" }} className="font-semibold text-[13px]">
                    {stat.value}{stat.suffix}
                  </span>
                  <span>{stat.label}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary CTA */}
              <a
                href="#work"
                className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
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
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-105"
                style={{
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25D366",
                  background: "rgba(37, 211, 102, 0.06)",
                }}
              >
                WhatsApp
                <ExternalLink size={13} />
              </a>

              {/* Email link */}
              <a
                href={`mailto:${siteData.personal.email}`}
                className="hidden sm:inline text-[13px] transition-all duration-200 hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {siteData.personal.email} →
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-1">
              <a
                href={siteData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:opacity-100 opacity-60"
                style={{ color: "var(--text-primary)" }}
                aria-label="GitHub"
              >
                <GitHubIcon size={22} />
              </a>
              <a
                href={siteData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:opacity-100 opacity-60"
                style={{ color: "var(--text-primary)" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={22} />
              </a>
              <div
                className="h-4 w-px opacity-20"
                style={{ background: "var(--text-secondary)" }}
              />
              <span
                className="font-mono text-[11px] tracking-wider uppercase opacity-50"
                style={{ color: "var(--text-secondary)" }}
              >
                {siteData.personal.location} {siteData.personal.locationFlag}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column — Avatar — Desktop only */}
          <motion.div
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <AvatarFrame />
          </motion.div>
        </div>

        {/* Hero Bottom — Marquee Strip */}
        <motion.div
          className="mt-16 lg:mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.9 }}
        >
          <div
            className="marquee-container w-full overflow-hidden py-4 rounded-2xl"
            style={{ background: "var(--marquee-bg)" }}
          >
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
              {[...siteData.marqueeItems, ...siteData.marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 px-5 text-[13px] font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-primary)" }} className="text-xs">✦</span>
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

