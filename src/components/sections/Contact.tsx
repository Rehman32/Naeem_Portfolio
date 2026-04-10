"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, ExternalLink, Zap } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { siteData } from "@/config/site-data";
import { containerVariants, itemVariants } from "@/components/animations/variants";

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [eyebrowRef, eyebrowInView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [underlineRef, underlineInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-[640px] mx-auto px-6 text-center">
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
            Get In Touch
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="mt-6 mb-6 font-semibold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "var(--text-primary)",
            }}
          >
            {siteData.contact.headline}
            <br />
            <span ref={underlineRef} className="relative inline-block">
              <span style={{ color: "var(--accent-primary)" }}>
                {siteData.contact.headlineAccent}
              </span>
              {/* SVG underline that draws on scroll */}
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 overflow-visible"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 C50 2, 150 2, 198 8"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={underlineInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
              </svg>
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-[16px] leading-[1.75] mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteData.contact.subtext}
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Email Card */}
          <motion.a
            href={`mailto:${siteData.personal.email}`}
            variants={itemVariants}
            className="glass-card contact-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--accent-primary) 12%, transparent)",
              }}
            >
              <Mail size={18} style={{ color: "var(--accent-primary)" }} />
            </div>
            <div>
              <p
                className="text-[14px] font-medium mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                Email
              </p>
              <p
                className="text-[12px] font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                {siteData.personal.email}
              </p>
            </div>
            <span
              className="text-[12px] font-medium flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "var(--accent-primary)" }}
            >
              Send Email <span>→</span>
            </span>
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/923193625232"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="glass-card contact-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(37, 211, 102, 0.12)",
              }}
            >
              <WhatsAppIcon size={18} />
            </div>
            <div>
              <p
                className="text-[14px] font-medium mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                WhatsApp
              </p>
              <p
                className="text-[12px] font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                {siteData.personal.whatsappDisplay}
              </p>
            </div>
            <span
              className="text-[12px] font-medium flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "#25D366" }}
            >
              Message <span>→</span>
            </span>
          </motion.a>

          {/* LinkedIn Card */}
          <motion.a
            href={siteData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="glass-card contact-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--accent-tertiary) 12%, transparent)",
              }}
            >
              <LinkedInIcon size={18} />
            </div>
            <div>
              <p
                className="text-[14px] font-medium mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                LinkedIn
              </p>
              <p
                className="text-[12px] font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                naeem-ur-rahman
              </p>
            </div>
            <span
              className="text-[12px] font-medium flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "var(--accent-tertiary)" }}
            >
              Connect <span>→</span>
            </span>
          </motion.a>
        </motion.div>

        {/* GitHub Full-width Card */}
        <motion.a
          href={siteData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-6 rounded-2xl flex items-center justify-between mb-8 transition-all duration-200 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-left">
            <GitHubIcon size={24} />
            <div>
              <p
                className="text-[14px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                github.com/Rehman32
              </p>
              <p
                className="text-[13px]"
                style={{ color: "var(--text-muted)" }}
              >
                Explore my repositories and open-source contributions
              </p>
            </div>
          </div>
          <span
            className="flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200"
            style={{ color: "var(--accent-primary)" }}
          >
            View GitHub
            <ExternalLink
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </motion.a>

        {/* Response Time Badge */}
        <motion.p
          className="flex items-center justify-center gap-2 text-[13px] font-mono"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Zap size={13} style={{ color: "var(--accent-primary)" }} />
          {siteData.personal.responseTime} · {siteData.personal.location}{" "}
          {siteData.personal.locationFlag}
        </motion.p>
      </div>
    </section>
  );
}
