import { motion } from "framer-motion";

/**
 * Animated cutaway/exploded diagram of a lift, labeling all
 * major service parameters. Used in the Services section.
 */
const PARTS = [
  { id: "motor", label: "Traction Motor", x: 80, y: 60 },
  { id: "controller", label: "Controller", x: 80, y: 110 },
  { id: "cable", label: "Steel Cables", x: 90, y: 175 },
  { id: "rails", label: "Guide Rails", x: 60, y: 260 },
  { id: "cabin", label: "Cabin / Doors", x: 90, y: 340 },
  { id: "counter", label: "Counterweight", x: 220, y: 250 },
  { id: "brake", label: "Safety Brake", x: 230, y: 340 },
  { id: "buffer", label: "Buffer / Pit", x: 150, y: 470 },
];

export function LiftCutaway({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 380 540" className="h-full w-full">
        <defs>
          <linearGradient id="cuShaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.12 0.03 260)" />
            <stop offset="100%" stopColor="oklch(0.06 0.02 260)" />
          </linearGradient>
          <linearGradient id="cuCabin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.80 0.16 60)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 45)" />
          </linearGradient>
          <linearGradient id="cuGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.13 90)" />
            <stop offset="100%" stopColor="oklch(0.65 0.16 60)" />
          </linearGradient>
        </defs>

        {/* Cutaway shaft */}
        <rect x="120" y="30" width="140" height="470" rx="8" fill="url(#cuShaft)" stroke="oklch(1 0 0 / 0.15)" />
        {/* Floor lines */}
        {[80, 160, 240, 320, 400, 480].map((y) => (
          <line key={y} x1="120" y1={y} x2="260" y2={y} stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 4" />
        ))}

        {/* Machine room */}
        <rect x="120" y="30" width="140" height="50" fill="oklch(0.22 0.04 260)" stroke="oklch(1 0 0 / 0.15)" />
        {/* Motor */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "165px 55px" }}
        >
          <circle cx="165" cy="55" r="14" fill="oklch(0.35 0.05 260)" stroke="url(#cuGold)" strokeWidth="1.5" />
          <circle cx="165" cy="55" r="4" fill="url(#cuGold)" />
          <line x1="165" y1="41" x2="165" y2="69" stroke="oklch(0.78 0.17 60)" strokeWidth="1.2" />
          <line x1="151" y1="55" x2="179" y2="55" stroke="oklch(0.78 0.17 60)" strokeWidth="1.2" />
        </motion.g>
        {/* Controller box */}
        <rect x="195" y="42" width="50" height="26" rx="2" fill="oklch(0.20 0.04 260)" stroke="url(#cuGold)" strokeWidth="0.8" />
        <motion.circle cx="205" cy="55" r="2" fill="oklch(0.7 0.2 145)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }} />
        <motion.circle cx="215" cy="55" r="2" fill="oklch(0.78 0.17 60)" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
        <motion.circle cx="225" cy="55" r="2" fill="oklch(0.7 0.2 25)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="235" cy="55" r="2" fill="oklch(0.78 0.17 60)" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />

        {/* Rails */}
        <line x1="135" y1="80" x2="135" y2="490" stroke="oklch(0.6 0.05 260 / 0.6)" strokeWidth="2" />
        <line x1="245" y1="80" x2="245" y2="490" stroke="oklch(0.6 0.05 260 / 0.6)" strokeWidth="2" />

        {/* Cable */}
        <motion.line
          x1="170" y1="70" x2="170"
          stroke="url(#cuGold)" strokeWidth="1.5"
          animate={{ y2: [120, 380, 120] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="210" y1="70" x2="210"
          stroke="oklch(0.5 0.05 260)" strokeWidth="1.5"
          animate={{ y2: [380, 120, 380] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Counterweight */}
        <motion.rect
          x="200" width="22" height="48" rx="2" fill="oklch(0.45 0.05 260)" stroke="url(#cuGold)" strokeWidth="0.6"
          animate={{ y: [360, 100, 360] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cabin */}
        <motion.g
          animate={{ y: [100, 360, 100] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="142" y="0" width="60" height="70" rx="4" fill="url(#cuCabin)" stroke="oklch(0.95 0.05 80)" strokeWidth="0.8" />
          {/* Ceiling light */}
          <rect x="146" y="3" width="52" height="5" rx="2" fill="oklch(0.95 0.15 80)" />
          {/* Door split */}
          <line x1="172" y1="10" x2="172" y2="64" stroke="oklch(0.25 0.05 260)" strokeWidth="0.8" />
          {/* Person */}
          <circle cx="172" cy="28" r="3" fill="oklch(0.20 0.04 260)" />
          <rect x="168" y="32" width="8" height="14" rx="1" fill="oklch(0.20 0.04 260)" />
          {/* Safety brake clamps */}
          <rect x="138" y="60" width="6" height="10" fill="oklch(0.7 0.2 25)" />
          <rect x="200" y="60" width="6" height="10" fill="oklch(0.7 0.2 25)" />
          {/* Floor indicator */}
          <rect x="158" y="-10" width="28" height="8" rx="1" fill="oklch(0.10 0.02 260)" stroke="url(#cuGold)" strokeWidth="0.4" />
        </motion.g>

        {/* Pit buffer */}
        <rect x="150" y="492" width="80" height="8" fill="oklch(0.35 0.05 260)" />
        <rect x="165" y="478" width="14" height="14" rx="2" fill="url(#cuGold)" opacity="0.8" />
        <rect x="201" y="478" width="14" height="14" rx="2" fill="url(#cuGold)" opacity="0.8" />

        {/* Labels with leader lines */}
        {PARTS.map((p, i) => {
          const onLeft = p.x < 190;
          const tx = onLeft ? 10 : 255;
          const anchor = "start";
          return (
            <motion.g
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            >
              <line
                x1={p.x} y1={p.y}
                x2={onLeft ? 110 : 270} y2={p.y}
                stroke="oklch(0.78 0.17 60 / 0.7)" strokeWidth="0.8" strokeDasharray="2 3"
              />
              <circle cx={p.x} cy={p.y} r="2.5" fill="oklch(0.78 0.17 60)" />
              <text
                x={tx} y={p.y + 3}
                textAnchor={anchor}
                fontFamily="ui-sans-serif, system-ui" fontSize="10" fontWeight="600"
                fill="currentColor"
                className="text-foreground transition-colors"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                {p.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
