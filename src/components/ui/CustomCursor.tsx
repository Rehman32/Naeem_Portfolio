"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const dx = mousePos.current.x - outerPos.current.x;
    const dy = mousePos.current.y - outerPos.current.y;
    outerPos.current.x += dx * 0.12;
    outerPos.current.y += dy * 0.12;

    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']");
      const isCard = target.closest("[data-cursor='card']");
      const isImage = target.closest("[data-cursor='image']");

      setIsHoveringLink(!!isLink && !isCard && !isImage);
      setIsHoveringCard(!!isCard);
      setIsHoveringImage(!!isImage);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [animate]);

  if (!isVisible) return null;

  const outerSize = isHoveringImage ? 80 : isHoveringCard ? 60 : isHoveringLink ? 60 : 40;
  const outerScale = isClicking ? 0.8 : 1;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: outerSize,
          height: outerSize,
          border: isHoveringLink
            ? "none"
            : `1.5px solid color-mix(in srgb, var(--accent-primary) 40%, transparent)`,
          borderRadius: "50%",
          background: isHoveringLink
            ? "color-mix(in srgb, var(--accent-primary) 8%, transparent)"
            : isHoveringCard
            ? "color-mix(in srgb, var(--accent-primary) 6%, transparent)"
            : "transparent",
          scale: outerScale,
          transition: "width 200ms ease, height 200ms ease, background 200ms ease, border 200ms ease, scale 100ms ease",
          mixBlendMode: isHoveringLink ? "difference" : "normal",
        }}
      >
        {isHoveringCard && (
          <span
            className="font-mono text-[9px] tracking-wider uppercase"
            style={{ color: "var(--accent-primary)" }}
          >
            VIEW
          </span>
        )}
        {isHoveringImage && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent-primary)",
        }}
      />
    </>
  );
}
