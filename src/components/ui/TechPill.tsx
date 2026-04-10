"use client";

interface TechPillProps {
  name: string;
  brandColor?: string;
}

export default function TechPill({ name, brandColor }: TechPillProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-150 group/pill"
      style={{
        background: "var(--pill-bg)",
        border: `1px solid var(--pill-border)`,
        color: "var(--pill-text)",
      }}
      onMouseEnter={(e) => {
        if (brandColor) {
          const el = e.currentTarget;
          el.style.background = `color-mix(in srgb, ${brandColor} 15%, transparent)`;
          el.style.borderColor = `color-mix(in srgb, ${brandColor} 40%, transparent)`;
          el.style.color = brandColor;
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pill-bg)";
        el.style.borderColor = "var(--pill-border)";
        el.style.color = "var(--pill-text)";
      }}
    >
      {name}
    </span>
  );
}
