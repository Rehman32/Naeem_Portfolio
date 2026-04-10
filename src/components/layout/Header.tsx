"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { siteData } from "@/config/site-data";
import { itemVariants } from "@/components/animations/variants";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "var(--header-bg)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: scrolled
            ? `1px solid var(--header-border)`
            : "1px solid transparent",
          boxShadow: scrolled
            ? `0 1px 0 var(--border-default)`
            : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-[16px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--accent-primary)" }} className="font-mono text-sm">
              &lt; /&gt;
            </span>
            <span className="tracking-[-0.01em]">Naeem</span>
          </a>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                style={{
                  background: "var(--pill-bg)",
                  border: "1px solid var(--pill-border)",
                }}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun size={16} style={{ color: "var(--accent-primary)" }} />
                ) : (
                  <Moon size={16} style={{ color: "var(--accent-primary)" }} />
                )}
                {isDark && (
                  <span
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      boxShadow: "0 0 12px var(--accent-primary)",
                    }}
                  />
                )}
              </button>
            )}

            {/* Download CV — Desktop */}
            <a
              href={siteData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-105"
              style={{
                border: "1px solid var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              <Download size={13} />
              Download CV
              <span className="text-[10px]">↗</span>
            </a>

            {/* WhatsApp — Desktop */}
            <a
              href={`https://wa.me/${siteData.personal.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(37, 211, 102, 0.1)",
                border: "1px solid rgba(37, 211, 102, 0.2)",
                color: "#25D366",
              }}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={16} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: "var(--pill-bg)",
                border: "1px solid var(--pill-border)",
                color: "var(--text-primary)",
              }}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "var(--header-bg)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                  style={{
                    background: "var(--pill-bg)",
                    border: "1px solid var(--pill-border)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-semibold tracking-[-0.03em]"
                    style={{ color: "var(--text-primary)" }}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.08 + 0.15 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col gap-4 pb-8">
                <div className="flex gap-4">
                  <a
                    href={siteData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={siteData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
                <a
                  href={`mailto:${siteData.personal.email}`}
                  className="shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                  style={{
                    background: "var(--accent-primary)",
                    color: "#09090B",
                  }}
                >
                  {siteData.contact.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="relative flex items-center gap-1 text-[14px] font-medium tracking-[0.01em] transition-all duration-150"
      style={{ color: hovered ? "var(--accent-primary)" : "var(--text-secondary)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span animate={{ x: hovered ? -3 : 0 }} transition={{ duration: 0.15 }}>
        {label}
      </motion.span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            style={{ color: "var(--accent-primary)" }}
            className="text-xs"
          >
            ›
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
