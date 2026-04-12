"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { siteData } from "@/config/site-data";

/* ─── Framer Motion Variants ─────────────────────────────── */
const restHover: Variants = {
  rest: {},
  hover: {},
};

const glowVariants: Variants = {
  rest:  { scale: 1,   opacity: 0.6 },
  hover: { scale: 1.3, opacity: 1   },
};

const photoVariants: Variants = {
  rest:  { scale: 1    },
  hover: { scale: 1.04 },
};

/* ─── Pulsing glow animation ─────────────────────────────── */
const pulseTransition = {
  scale:   { duration: 3, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const },
  opacity: { duration: 3, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const },
};

export default function AvatarFrame() {
  return (
    <>
      {/* Desktop */}
      <motion.div
        className="hidden lg:block relative"
        style={{ width: 360, height: 400 }}
        variants={restHover}
        initial="rest"
        whileHover="hover"
      >
        <AvatarLayers
          w={360} h={400}
          borderR={28}
          ringW={376} ringH={416}
          ringBR={30}
        />
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="lg:hidden relative"
        style={{ width: 260, height: 290 }}
        variants={restHover}
        initial="rest"
        whileHover="hover"
      >
        <AvatarLayers
          w={260} h={290}
          borderR={22}
          ringW={272} ringH={302}
          ringBR={24}
        />
      </motion.div>
    </>
  );
}

function AvatarLayers({
  w, h, borderR, ringW, ringH, ringBR,
}: {
  w: number; h: number;
  borderR: number;
  ringW: number; ringH: number;
  ringBR: number;
}) {
  return (
    <>
      {/* ── Layer 0: Outer ambient glow ──────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width:  ringW + 44,
          height: ringH + 44,
          top:    -(ringH - h) / 2 - 22,
          left:   -(ringW - w) / 2 - 22,
          borderRadius: ringBR + 16,
          /* Dark mode colour — light mode override below via className */
          background: "radial-gradient(ellipse at center, rgba(52,211,153,0.19) 0%, transparent 70%)",
          zIndex: 0,
        }}
        variants={glowVariants}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={pulseTransition}
      />

      {/* ── Layer 1: Spinning conic-gradient border ring ── */}
      <motion.div
        className="absolute"
        style={{
          width:  ringW,
          height: ringH,
          top:    -(ringH - h) / 2,
          left:   -(ringW - w) / 2,
          borderRadius: ringBR,
          background: "conic-gradient(from 0deg, #34D399, #A78BFA, #38BDF8, #34D399)",
          /* CSS mask trick: show only a 2px border */
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          padding: "2px",
          zIndex: 1,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        whileHover={{ transition: { duration: 1.5, ease: "linear", repeat: Infinity } }}
      />

      {/* ── Layer 2: Photo ────────────────────────────────── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          width:  w,
          height: h,
          top:    0,
          left:   0,
          borderRadius: borderR,
          zIndex: 2,
          cursor: "default",
        }}
        variants={photoVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={siteData.personal.photo}
          alt="Naeem Ur Rahman"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          sizes={`${w}px`}
        />
      </motion.div>

      {/* ── Layer 3: Floating Available badge ────────────── */}
      <motion.div
        className="absolute left-1/2 z-10"
        style={{ bottom: -14, x: "-50%" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [5, -5, 5] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1.2 },
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap
                     backdrop-blur-md
                     bg-zinc-900/90  border border-zinc-700/60
                     dark:bg-zinc-900/90 dark:border-zinc-700/60
                     shadow-[0_0_20px_rgba(52,211,153,0.15)]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Available</span>
          <span className="opacity-40">·</span>
          <span>Islamabad, PK</span>
        </div>
      </motion.div>
    </>
  );
}
