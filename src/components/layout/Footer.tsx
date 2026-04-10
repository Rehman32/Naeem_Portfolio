"use client";

import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { siteData } from "@/config/site-data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full py-6 px-6"
      style={{
        background: "var(--footer-bg)",
        borderTop: "1px solid var(--footer-border)",
        color: "var(--footer-text)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p className="text-sm">© 2025 {siteData.personal.name}</p>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={siteData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--footer-text)" }}
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={siteData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--footer-text)" }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={`https://wa.me/${siteData.personal.whatsapp.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--footer-text)" }}
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-sm transition-all duration-200 hover:scale-105 group"
          style={{ color: "var(--footer-text)" }}
        >
          <span>Back to Top</span>
          <ArrowUp
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </footer>
  );
}
