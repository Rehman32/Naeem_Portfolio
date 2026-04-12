"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, ChevronDown } from "lucide-react";
import { siteData } from "@/config/site-data";
import AvatarFrame from "@/components/ui/AvatarFrame";

/* ─── Typewriter Component ───────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 100;
    const currentWord = words[index];

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        const nextText = isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1);
        setText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="inline-block relative">
      <span className="relative z-10" style={{ color: "var(--text-primary)" }}>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] ml-[2px] -mb-[2px] align-baseline"
        style={{ background: "var(--text-primary)" }}
      />
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
// Removed 'ease' override array from fadeUp variants to prevent Framer Motion Typescript tuple mismatch
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6 },
  },
};

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const { scrollY } = useScroll();
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const ROLES = ["Full-Stack Engineer", "AI/ML Developer", "SaaS Builder"];

  return (
    <section ref={ref} id="hero" className="relative min-h-screen pt-28 pb-16 overflow-hidden flex flex-col justify-center">

      {/* Background Subtle Dot-Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Shimmer Animation Keys */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-text { animation: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">

          <div className="lg:hidden flex justify-center w-full pb-4">
            <AvatarFrame />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col items-start text-left w-full"
          >
            {/* 1. "Available" Pulse Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium border"
                style={{
                  background: "var(--badge-bg)",
                  borderColor: "var(--badge-border)",
                  color: "var(--badge-text)"
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--badge-text)" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--badge-text)" }} />
                </span>
                {siteData.personal.availability}
              </span>
            </motion.div>

            {/* 2. Name heading */}
            <motion.div variants={fadeUp} className="w-full mb-6">
              <h1 className="font-[800] leading-[0.95] tracking-[-0.03em] m-0 p-0 flex flex-col items-start uppercase">
                <span
                  className="shimmer-text block text-transparent bg-clip-text"
                  style={{
                    fontSize: "var(--font-name-size, clamp(72px, 10vw, 108px))",
                    backgroundImage: "var(--hero-gradient)",
                    backgroundSize: "200%",
                    animation: "shimmer 4s ease infinite",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 80px rgba(79, 255, 176, 0.15)",
                  }}
                >
                  NAEEM
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: "var(--font-name-size, clamp(72px, 10vw, 90px))",
                    color: "var(--text-primary)"
                  }}
                >
                  UR RAHMAN
                </span>
              </h1>
              <style>{`
                @media (max-width: 639px) {
                  .shimmer-text { animation: none !important; }
                  h1 span { --font-name-size: clamp(52px, 14vw, 72px); }
                }
              `}</style>
            </motion.div>

            {/* 3. Typewriter Role Title */}
            <motion.div variants={fadeUp}>
              <h2 className="text-[18px] sm:text-[22px] font-normal h-[30px]" style={{ color: "var(--text-muted)" }}>
                I am a <Typewriter words={ROLES} />
              </h2>
            </motion.div>

            {/* 4. Intro / Bio Text */}
            <motion.p
              variants={fadeUp}
              className="mt-4 mb-7 text-[17px] leading-[1.75] max-w-[520px] w-full"
              style={{ color: "var(--text-secondary)" }}
            >
              I design and ship production-grade systems—from scalable Full-Stack SaaS
              platforms to intelligent AI pipelines—that drive business growth and solve
              complex operational problems. I specialize in building end-to-end architectures
              that automate workflows, scale efficiently, and deliver measurable, real-world value.
            </motion.p>

            {/* 5. Stats Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              {siteData.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
                    <span className="font-bold text-[15px]" style={{ color: "var(--accent-primary)" }}>
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="text-[12px] uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>
                      {stat.label}
                    </span>
                  </div>
                  {idx !== siteData.stats.length - 1 && (
                    <span className="mx-3 hidden sm:inline-block" style={{ color: "var(--divider)" }}>|</span>
                  )}
                  {idx !== siteData.stats.length - 1 && (
                    <span className="mx-2 sm:hidden inline-block" style={{ color: "var(--divider)" }}>·</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* 6. CTAs Row (44px height, 8px radius) */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] text-white font-medium text-[14px] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "var(--accent-primary)" }}
              >
                View My Work
              </a>
              <a
                href={`https://wa.me/${siteData.personal.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] rounded-[8px] border bg-transparent font-medium text-[14px] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: "var(--accent-primary)",
                  borderColor: "color-mix(in srgb, var(--accent-primary) 40%, transparent)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "color-mix(in srgb, var(--accent-primary) 10%, transparent)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                WhatsApp <ExternalLink size={14} />
              </a>
              <a
                href="/NaeemUpdatedResume.pdf"
                download="Naeem_Ur_Rahman_CV.pdf"
                className="inline-flex items-center justify-center gap-1.5 px-3 h-[44px] rounded-[8px] font-medium text-[14px] transition-all duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "var(--tag-bg)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Download CV <span>↓</span>
              </a>
            </motion.div>

          </motion.div>

          <div className="hidden lg:flex items-center justify-center z-10 relative lg:-mt-20 ">
            <AvatarFrame />
          </div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
        style={{ opacity: chevronOpacity }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>

    </section>
  );
}
