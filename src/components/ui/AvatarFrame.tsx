"use client";

import { motion } from "framer-motion";
import { siteData } from "@/config/site-data";

// 5 organic blob shapes for morphing
const blobPaths = [
  "M44.5,-60.2C56.3,-51.8,63.6,-36.8,67.2,-21.2C70.8,-5.6,70.7,10.6,64.8,24.3C58.9,38,47.2,49.2,33.8,56.6C20.4,64,-4.7,67.6,-24.6,62.3C-44.5,57,-59.2,42.8,-66.3,26C-73.4,9.2,-73,-10.2,-65.7,-25.8C-58.4,-41.4,-44.2,-53.2,-29.6,-60.3C-15,-67.4,0,-69.8,14.3,-67.5C28.6,-65.2,32.7,-68.6,44.5,-60.2Z",
  "M39.9,-53.1C50.7,-45.5,57.5,-32.1,61.4,-17.8C65.3,-3.5,66.3,11.7,61.1,24.6C55.9,37.5,44.5,48.1,31.4,55.2C18.3,62.3,3.5,65.9,-12.3,64.2C-28.1,62.5,-44.9,55.5,-55.1,43.5C-65.3,31.5,-68.9,14.5,-67.7,-1.8C-66.5,-18.1,-60.5,-33.7,-49.8,-41.4C-39.1,-49.1,-23.7,-48.9,-9.3,-50.8C5.1,-52.7,29.1,-60.7,39.9,-53.1Z",
  "M46.8,-62.8C58.8,-52.9,65.3,-36.1,68.1,-19.3C70.9,-2.5,70,14.3,63.1,28.2C56.2,42.1,43.3,53.1,28.7,59.3C14.1,65.5,-2.2,66.9,-18.9,63.3C-35.6,59.7,-52.7,51.1,-61.3,37.7C-69.9,24.3,-70,6.1,-65.3,-9.3C-60.6,-24.7,-51.1,-37.3,-39.2,-47.2C-27.3,-57.1,-13.7,-64.3,2.3,-67.2C18.3,-70.1,34.8,-72.7,46.8,-62.8Z",
  "M41.3,-55.3C52.4,-47.4,59.8,-34,63.8,-19.6C67.8,-5.2,68.4,10.2,63.2,23.4C58,36.6,47,47.6,34.1,54.8C21.2,62,6.4,65.4,-8.5,63.8C-23.4,62.2,-38.4,55.6,-49.6,44.8C-60.8,34,-68.2,19,-68.4,3.8C-68.6,-11.4,-61.6,-26.8,-50.8,-34.9C-40,-43,-25.4,-43.8,-12.1,-50.5C1.2,-57.2,30.2,-63.2,41.3,-55.3Z",
  "M43.8,-57.4C55.5,-49.6,62.9,-34.6,66.7,-19C70.5,-3.4,70.7,12.8,64.7,26.3C58.7,39.8,46.5,50.6,32.6,57.2C18.7,63.8,3.1,66.2,-13.5,64.3C-30.1,62.4,-47.7,56.2,-57.7,44C-67.7,31.8,-70.1,13.6,-67.3,-2.8C-64.5,-19.2,-56.5,-33.8,-44.9,-41.7C-33.3,-49.6,-18.1,-50.8,-1.2,-49.3C15.7,-47.8,32.1,-65.2,43.8,-57.4Z",
];

export default function AvatarFrame() {
  return (
    <div
      className="relative w-[240px] h-[240px] lg:w-[340px] lg:h-[340px] group"
      data-cursor="image"
      role="img"
      aria-label="Photo of Naeem Ur Rahman"
    >
      {/* Layer 3: Pulsing Outer Glow */}
      <div
        className="absolute inset-[-20px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--avatar-glow, rgba(52,211,153,0.2)), transparent 70%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Layer 2: Rotating Gradient Ring */}
      <div
        className="absolute inset-[-6px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #34D399, #A78BFA, #38BDF8, #34D399)",
          animation: "spin 6s linear infinite",
          opacity: "var(--ring-opacity, 1)",
        }}
      >
        {/* Inner mask to create ring effect */}
        <div
          className="absolute inset-[2px] rounded-full"
          style={{ background: "var(--bg-page)" }}
        />
      </div>

      {/* Layer 1: Morphing Blob with Photo */}
      <div className="absolute inset-0 overflow-hidden">
        <svg viewBox="-80 -80 160 160" className="w-full h-full">
          <defs>
            <clipPath id="blob-clip">
              <motion.path
                d={blobPaths[0]}
                animate={{
                  d: blobPaths,
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#blob-clip)">
            <image
              href={siteData.personal.photo}
              x="-80"
              y="-80"
              width="160"
              height="160"
              preserveAspectRatio="xMidYMid slice"
              className="transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </g>
        </svg>
      </div>

      {/* Layer 4: Floating Badge */}
      <motion.div
        className="absolute -bottom-2 -right-2 lg:bottom-2 lg:right-[-12px] z-10"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <div
          className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono"
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
          <span>Available</span>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span>Islamabad, PK</span>
        </div>
      </motion.div>
    </div>
  );
}
