import { motion } from "framer-motion";

/**
 * Cross-section of a building with an elevator cabin
 * traveling up and down between floors. Used in About / Floor 8.
 */
export function BuildingLift({ className = "" }: { className?: string }) {
  const floors = [0, 1, 2, 3, 4, 5];
  const floorHeight = 70;
  const topY = 30;

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 320 480" className="h-full w-full">
        <defs>
          <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.30 0.05 260)" />
            <stop offset="100%" stopColor="oklch(0.18 0.04 260)" />
          </linearGradient>
          <linearGradient id="cabinG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.17 60)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 45)" />
          </linearGradient>
          <linearGradient id="shaftG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.10 0.03 260)" />
            <stop offset="100%" stopColor="oklch(0.06 0.02 260)" />
          </linearGradient>
        </defs>

        {/* Building outline */}
        <rect x="20" y="20" width="280" height="440" rx="6" fill="url(#bldg)" stroke="oklch(1 0 0 / 0.12)" />
        {/* Roof */}
        <rect x="14" y="14" width="292" height="12" rx="3" fill="oklch(0.40 0.06 260)" />

        {/* Floors */}
        {floors.map((f) => {
          const y = topY + f * floorHeight;
          return (
            <g key={f}>
              {/* Slab */}
              <rect x="20" y={y + floorHeight - 4} width="280" height="4" fill="oklch(0.45 0.06 260)" />
              {/* Left office */}
              <rect x="34" y={y + 10} width="80" height={floorHeight - 18} rx="2" fill="oklch(0.22 0.04 260)" stroke="oklch(1 0 0 / 0.06)" />
              {/* Windows */}
              <rect x="42" y={y + 18} width="22" height="20" fill="oklch(0.75 0.12 80 / 0.6)" />
              <rect x="72" y={y + 18} width="22" height="20" fill="oklch(0.75 0.12 80 / 0.5)" />
              {/* Right office */}
              <rect x="206" y={y + 10} width="80" height={floorHeight - 18} rx="2" fill="oklch(0.22 0.04 260)" stroke="oklch(1 0 0 / 0.06)" />
              <rect x="214" y={y + 18} width="22" height="20" fill="oklch(0.75 0.12 80 / 0.55)" />
              <rect x="244" y={y + 18} width="22" height="20" fill="oklch(0.75 0.12 80 / 0.65)" />
              {/* Floor label */}
              <text x="30" y={y + floorHeight - 10} fontFamily="ui-monospace, monospace" fontSize="9" fill="oklch(0.7 0.05 60 / 0.7)">
                F{floors.length - f}
              </text>
            </g>
          );
        })}

        {/* Elevator shaft */}
        <rect x="130" y="20" width="60" height="440" fill="url(#shaftG)" stroke="oklch(1 0 0 / 0.1)" />
        {/* Rails */}
        <line x1="138" y1="20" x2="138" y2="460" stroke="oklch(0.6 0.05 260 / 0.4)" strokeWidth="1" />
        <line x1="182" y1="20" x2="182" y2="460" stroke="oklch(0.6 0.05 260 / 0.4)" strokeWidth="1" />

        {/* Cable */}
        <motion.line
          x1="160" y1="20" x2="160"
          stroke="oklch(0.78 0.17 60)" strokeWidth="1.2"
          animate={{ y2: [60, 380, 60] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Counterweight (opposite direction) */}
        <motion.rect
          x="118" width="10" height="40" rx="2" fill="oklch(0.45 0.05 260)"
          animate={{ y: [340, 40, 340] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cabin */}
        <motion.g
          animate={{ y: [40, 360, 40] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="136" y="0" width="48" height="56" rx="4" fill="url(#cabinG)" stroke="oklch(0.95 0.05 80)" strokeWidth="0.8" />
          {/* Door split */}
          <line x1="160" y1="6" x2="160" y2="50" stroke="oklch(0.25 0.05 260)" strokeWidth="0.8" />
          {/* Light inside */}
          <rect x="139" y="3" width="42" height="6" rx="2" fill="oklch(0.95 0.12 80 / 0.9)" />
          {/* Floor indicator */}
          <rect x="148" y="-9" width="24" height="7" rx="1" fill="oklch(0.10 0.02 260)" stroke="oklch(0.78 0.17 60)" strokeWidth="0.4" />
        </motion.g>

        {/* People silhouettes waiting on some floors */}
        <circle cx="60" cy={topY + 1 * floorHeight - 18} r="3" fill="oklch(0.78 0.17 60)" />
        <rect x="57" y={topY + 1 * floorHeight - 16} width="6" height="12" rx="1" fill="oklch(0.78 0.17 60)" />
        <circle cx="240" cy={topY + 3 * floorHeight - 18} r="3" fill="oklch(0.85 0.05 60)" />
        <rect x="237" y={topY + 3 * floorHeight - 16} width="6" height="12" rx="1" fill="oklch(0.85 0.05 60)" />
      </svg>
    </div>
  );
}
