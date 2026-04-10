"use client";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isDeployed = status.toLowerCase() === "deployed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider ${
        isDeployed ? "status-deployed" : ""
      }`}
      style={
        !isDeployed
          ? {
              background: "var(--pill-bg)",
              border: "1px solid var(--pill-border)",
              color: "var(--accent-primary)",
            }
          : undefined
      }
    >
      {isDeployed && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              backgroundColor: "var(--accent-primary)",
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <span
            className="relative inline-flex rounded-full h-1.5 w-1.5"
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
        </span>
      )}
      {status}
    </span>
  );
}
