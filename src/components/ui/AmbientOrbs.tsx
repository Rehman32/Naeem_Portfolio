"use client";

export default function AmbientOrbs() {
  return (
    <>
      {/* Orb 1 — deep emerald, top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 1000px 800px at 8% 15%, rgba(6,78,59,0.22) 0%, transparent 70%)",
          animation: "drift-1 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 2 — deep violet, right-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 800px 700px at 92% 45%, rgba(46,16,101,0.16) 0%, transparent 70%)",
          animation: "drift-2 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 3 — deep sky, bottom-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 900px 600px at 50% 88%, rgba(8,47,73,0.14) 0%, transparent 70%)",
          animation: "drift-3 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Light mode overrides — softer pastels */}
      <style>{`
        html.light div[data-orb="1"] {
          background: radial-gradient(ellipse 1000px 800px at 8% 15%, rgba(167,243,208,0.35) 0%, transparent 70%);
        }
        html.light div[data-orb="2"] {
          background: radial-gradient(ellipse 800px 700px at 92% 45%, rgba(221,214,254,0.30) 0%, transparent 70%);
        }
        html.light div[data-orb="3"] {
          background: radial-gradient(ellipse 900px 600px at 50% 88%, rgba(186,230,253,0.25) 0%, transparent 70%);
        }
      `}</style>
    </>
  );
}
