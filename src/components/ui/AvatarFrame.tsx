"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteData } from "@/config/site-data";

/* ─── Orbiting light dot ─────────────────────────────────── */
function OrbitDot({
  color,
  size,
  orbitRadius,
  duration,
  delay,
  startAngle,
  centerOffset,
}: {
  color: string;
  size: number;
  orbitRadius: number;
  duration: number;
  delay: number;
  startAngle: number;
  centerOffset: number; /* half of parent container px */
}) {
  const rad = (startAngle * Math.PI) / 180;
  const startX = centerOffset + orbitRadius * Math.sin(rad) - size / 2;
  const startY = centerOffset - orbitRadius * Math.cos(rad) - size / 2;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: startX,
        top: startY,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 3}px ${size + 2}px ${color}`,
      }}
      animate={{
        left: [
          centerOffset + orbitRadius * Math.sin((startAngle * Math.PI) / 180) - size / 2,
          centerOffset + orbitRadius * Math.sin(((startAngle + 90) * Math.PI) / 180) - size / 2,
          centerOffset + orbitRadius * Math.sin(((startAngle + 180) * Math.PI) / 180) - size / 2,
          centerOffset + orbitRadius * Math.sin(((startAngle + 270) * Math.PI) / 180) - size / 2,
          centerOffset + orbitRadius * Math.sin(((startAngle + 360) * Math.PI) / 180) - size / 2,
        ],
        top: [
          centerOffset - orbitRadius * Math.cos((startAngle * Math.PI) / 180) - size / 2,
          centerOffset - orbitRadius * Math.cos(((startAngle + 90) * Math.PI) / 180) - size / 2,
          centerOffset - orbitRadius * Math.cos(((startAngle + 180) * Math.PI) / 180) - size / 2,
          centerOffset - orbitRadius * Math.cos(((startAngle + 270) * Math.PI) / 180) - size / 2,
          centerOffset - orbitRadius * Math.cos(((startAngle + 360) * Math.PI) / 180) - size / 2,
        ],
      }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export default function AvatarFrame() {
  /* Photo circle is 240px mobile / 320px desktop.
     Outer decorations need ~64px of extra space on each side.
     The outer container is larger so effects are visible. */

  return (
    <>
      {/* ─── Desktop ────────────────────────────────── */}
      <div className="hidden lg:block">
        <AvatarCore photoSizePx={320} outerPad={70} />
      </div>
      {/* ─── Mobile / Tablet ────────────────────────── */}
      <div className="lg:hidden">
        <AvatarCore photoSizePx={200} outerPad={52} />
      </div>
    </>
  );
}

function AvatarCore({
  photoSizePx,
  outerPad,
}: {
  photoSizePx: number;
  outerPad: number;
}) {
  const total = photoSizePx + outerPad * 2;
  const center = total / 2;
  const r = photoSizePx / 2; /* photo radius */

  /* Ring radii — strictly OUTSIDE photo */
  const r1 = r + 10;
  const r2 = r + 22;
  const r3 = r + 36;
  const r4 = r + 52;   /* outermost arcs */

  return (
    <div
      role="img"
      aria-label="Photo of Naeem Ur Rahman"
      data-cursor="image"
      className="relative group"
      style={{ width: total, height: total }}
    >

      {/* ══ 1. DEEP BLOOM GLOW ═══════════════════════════════ */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: total,
          height: total,
          top: 0,
          left: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.20) 0%, rgba(167,139,250,0.10) 40%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />

      {/* ══ 2. PHOTO — clean perfect circle ══════════════════ */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{
          width: photoSizePx,
          height: photoSizePx,
          left: outerPad,
          top: outerPad,
          zIndex: 10,
        }}
      >
        <Image
          src={siteData.personal.photo}
          alt="Naeem Ur Rahman"
          fill
          priority
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
          sizes={`${photoSizePx}px`}
        />
        {/* Bottom vignette for depth */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 110%, rgba(0,0,0,0.3) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ══ 3. SVG OUTER DECORATIONS ══════════════════════════ */}
      <svg
        width={total}
        height={total}
        viewBox={`0 0 ${total} ${total}`}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id={`grad-a-${photoSizePx}`} x1="0" y1="-1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#34D399" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#A78BFA" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`grad-b-${photoSizePx}`} x1="-1" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g transform={`translate(${center},${center})`}>

          {/* ── Solid ring tight to photo edge ── */}
          <circle cx="0" cy="0" r={r1}
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

          {/* ── Rotating dashed coloured ring ── */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            <circle cx="0" cy="0" r={r2}
              fill="none"
              stroke={`url(#grad-a-${photoSizePx})`}
              strokeWidth="1.5"
              strokeDasharray="10 16"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── Counter-rotating finer dotted ring ── */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <circle cx="0" cy="0" r={r3}
              fill="none"
              stroke={`url(#grad-b-${photoSizePx})`}
              strokeWidth="1"
              strokeDasharray="3 22"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── Three spinning arc strokes (outermost layer) ── */}
          {/* Emerald arc */}
          <motion.circle cx="0" cy="0" r={r4}
            fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * r4 * 0.22} ${2 * Math.PI * r4 * 0.78}`}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ originX: "0px", originY: "0px" }}
            opacity="0.75"
          />
          {/* Violet arc */}
          <motion.circle cx="0" cy="0" r={r4 + 2}
            fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * (r4+2) * 0.18} ${2 * Math.PI * (r4+2) * 0.82}`}
            animate={{ rotate: [120, 480] }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
            style={{ originX: "0px", originY: "0px" }}
            opacity="0.6"
          />
          {/* Sky arc */}
          <motion.circle cx="0" cy="0" r={r4 + 4}
            fill="none" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * (r4+4) * 0.15} ${2 * Math.PI * (r4+4) * 0.85}`}
            animate={{ rotate: [240, 600] }}
            transition={{ duration: 13, ease: "linear", repeat: Infinity }}
            style={{ originX: "0px", originY: "0px" }}
            opacity="0.5"
          />

        </g>
      </svg>

      {/* ══ 4. ORBITING GLOW DOTS — outside the circle ═══════ */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
        <OrbitDot color="rgba(52,211,153,0.95)"  size={8}  orbitRadius={r2 + 2} duration={7}  delay={0}   startAngle={0}   centerOffset={center} />
        <OrbitDot color="rgba(167,139,250,0.90)" size={6}  orbitRadius={r3 + 3} duration={11} delay={2}   startAngle={180} centerOffset={center} />
        <OrbitDot color="rgba(56,189,248,0.85)"  size={5}  orbitRadius={r4 - 2} duration={15} delay={1}   startAngle={90}  centerOffset={center} />
      </div>

      {/* ══ 5. COLOUR LIGHT LEAK HALOS at fixed positions ════ */}
      {/* Top */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 56, height: 56,
          left: center - 28,
          top: outerPad - r3 - 14,
          background: "radial-gradient(circle, rgba(52,211,153,0.6), transparent 70%)",
          filter: "blur(10px)",
          zIndex: 4,
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.1, 0.85] }}
        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Right */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 48, height: 48,
          left: outerPad + photoSizePx + r3 - 30,
          top: center - 24,
          background: "radial-gradient(circle, rgba(167,139,250,0.6), transparent 70%)",
          filter: "blur(10px)",
          zIndex: 4,
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.05, 0.85] }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
      />
      {/* Left */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 44, height: 44,
          left: outerPad - r3 - 10,
          top: center - 22,
          background: "radial-gradient(circle, rgba(56,189,248,0.55), transparent 70%)",
          filter: "blur(10px)",
          zIndex: 4,
        }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.7 }}
      />
      {/* Bottom-right subtle warm */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 36, height: 36,
          left: center + r2,
          top: center + r2,
          background: "radial-gradient(circle, rgba(251,146,60,0.45), transparent 70%)",
          filter: "blur(8px)",
          zIndex: 4,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      />

      {/* ══ 6. FLOATING BADGE ════════════════════════════════ */}
      <motion.div
        className="absolute z-20"
        style={{
          left: "50%",
          bottom: outerPad - 32,
          x: "-50%",
        }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <div
          className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap"
          style={{
            color: "var(--text-secondary)",
            boxShadow: "0 0 20px rgba(52,211,153,0.18)",
          }}
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                backgroundColor: "#34D399",
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span>Available</span>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span>Islamabad, PK</span>
        </div>
      </motion.div>
    </div>
  );
}
