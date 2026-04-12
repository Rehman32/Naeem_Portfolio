"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, ChevronDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { siteData } from "@/config/site-data";
import AvatarFrame from "@/components/ui/AvatarFrame";

/* ─── Letter-flip animation variants ─────────────────────── */
const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};
const letterVariant: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -90, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─── Section-level stagger ───────────────────────────────── */
const sectionContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const NAME = "Naeem Ur Rahman";
const letters = NAME.split("");

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  /* Scroll-based fade for scroll indicator */
  const { scrollY } = useScroll();
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* ─── Two-column grid ─────────────────────────────── */}
      <div
        className="
          max-w-7xl mx-auto px-6 lg:px-20
          grid grid-cols-1 lg:grid-cols-[55fr_45fr]
          gap-8 lg:gap-16
          items-center
          min-h-screen
          pt-24 pb-16
        "
      >
        {/* ── Mobile: Avatar above text ─────────────────── */}
        <div className="lg:hidden flex justify-center w-full pt-4 pb-2">
          <AvatarFrame />
        </div>

        {/* ── LEFT COLUMN — Text ────────────────────────── */}
        <motion.div
          className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left"
          variants={sectionContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Availability pill */}
          <motion.div variants={fadeUp}>
            <span
              className="glass-card inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"
                  style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {siteData.personal.availability}
            </span>
          </motion.div>

          {/* Name — 3D letter flip */}
          <motion.div
            variants={nameContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ perspective: "800px" }}
            aria-label={NAME}
          >
            <h1
              className="font-bold leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: "clamp(52px, 8vw, 88px)" }}
            >
              {letters.map((char, i) =>
                char === " " ? (
                  <motion.span
                    key={i}
                    variants={letterVariant}
                    className="inline-block"
                    style={{ width: "0.28em" }}
                  >
                    &nbsp;
                  </motion.span>
                ) : (
                  <motion.span
                    key={i}
                    variants={letterVariant}
                    className="inline-block"
                    style={{
                      transformStyle: "preserve-3d",
                      color: "var(--text-primary)",
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </h1>
          </motion.div>

          {/* Role — animated gradient */}
          <motion.p
            variants={fadeUp}
            className="gradient-text font-normal"
            style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}
          >
            {siteData.personal.role}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-[15px] leading-[1.8] max-w-[520px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteData.personal.bio}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-1"
          >
            {siteData.stats.map((stat, i) => (
              <span key={stat.label} className="font-mono text-sm flex items-center gap-1.5">
                {i > 0 && (
                  <span className="text-zinc-700 dark:text-zinc-700 text-stone-300 mx-1">·</span>
                )}
                <span className="text-emerald-400 dark:text-emerald-400 font-semibold">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </span>
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row lg:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 mt-2"
          >
            <a
              href="#work"
              className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
              style={{ background: "var(--accent-primary)", color: "#09090B" }}
            >
              View My Work <span>↓</span>
            </a>
            <a
              href="https://wa.me/923193625232"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(37,211,102,0.3)",
                color: "#25D366",
                background: "rgba(37,211,102,0.06)",
              }}
            >
              WhatsApp <ExternalLink size={13} />
            </a>
            <a
              href="/NaeemUpdatedResume.pdf"
              download="Naeem_Ur_Rahman_CV.pdf"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-200 hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Download CV ↓
            </a>
          </motion.div>

          {/* Social icons + location */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-5 justify-center lg:justify-start"
          >
            <a
              href={siteData.personal.github}
              target="_blank" rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              style={{ color: "var(--text-primary)" }}
              aria-label="GitHub"
            >
              <GitHubIcon size={22} />
            </a>
            <a
              href={siteData.personal.linkedin}
              target="_blank" rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              style={{ color: "var(--text-primary)" }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={22} />
            </a>
            <div className="h-4 w-px opacity-20" style={{ background: "var(--text-secondary)" }} />
            <span
              className="font-mono text-[11px] uppercase tracking-wider opacity-50"
              style={{ color: "var(--text-secondary)" }}
            >
              {siteData.personal.location} {siteData.personal.locationFlag}
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Avatar (desktop) ───────────── */}
        <motion.div
          className="hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <AvatarFrame />
        </motion.div>
      </div>

      {/* ── Marquee strip ──────────────────────────────── */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-20 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 1.1 }}
      >
        <div
          className="marquee-container w-full overflow-hidden py-4 rounded-2xl"
          style={{ background: "var(--marquee-bg)" }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 30s linear infinite" }}
          >
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

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
        style={{ opacity: chevronOpacity }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
