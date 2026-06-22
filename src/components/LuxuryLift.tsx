import { motion } from "framer-motion";

/**
 * Decorative luxury elevator cabin SVG for the hero / Floor 10.
 * Features: chandelier, warm interior lighting, marble walls,
 * gold trim, mirrored back wall, animated opening doors.
 */
export function LuxuryLift({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.18_50/0.35),transparent_70%)] blur-2xl opacity-70" />

      <svg
        viewBox="0 0 360 560"
        className="h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        role="img"
        aria-label="Luxury elevator cabin"
      >
        <defs>
          {/* Marble back wall */}
          <linearGradient id="marble" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.96 0.02 80)" />
            <stop offset="45%" stopColor="oklch(0.88 0.03 70)" />
            <stop offset="100%" stopColor="oklch(0.78 0.04 60)" />
          </linearGradient>
          {/* Floor reflection */}
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.35 0.04 60)" />
            <stop offset="100%" stopColor="oklch(0.15 0.02 60)" />
          </linearGradient>
          {/* Gold trim */}
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.13 90)" />
            <stop offset="50%" stopColor="oklch(0.75 0.16 70)" />
            <stop offset="100%" stopColor="oklch(0.55 0.14 50)" />
          </linearGradient>
          {/* Door panel */}
          <linearGradient id="door" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.30 0.05 260)" />
            <stop offset="50%" stopColor="oklch(0.42 0.07 260)" />
            <stop offset="100%" stopColor="oklch(0.22 0.04 260)" />
          </linearGradient>
          {/* Warm light */}
          <radialGradient id="warm" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="oklch(0.95 0.15 80 / 0.85)" />
            <stop offset="60%" stopColor="oklch(0.85 0.14 70 / 0.25)" />
            <stop offset="100%" stopColor="oklch(0.85 0.14 70 / 0)" />
          </radialGradient>
          <radialGradient id="bulb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8d6" />
            <stop offset="60%" stopColor="oklch(0.9 0.15 85)" />
            <stop offset="100%" stopColor="oklch(0.7 0.18 60 / 0)" />
          </radialGradient>
        </defs>

        {/* Cabin frame (gold) */}
        <rect x="10" y="10" width="340" height="540" rx="18" fill="url(#gold)" />
        {/* Inner cabin */}
        <rect x="22" y="22" width="316" height="516" rx="12" fill="oklch(0.18 0.03 260)" />

        {/* Back wall marble */}
        <rect x="38" y="38" width="284" height="430" rx="6" fill="url(#marble)" />
        {/* Marble veins */}
        <path d="M50 120 Q160 90 320 160" stroke="oklch(0.55 0.03 60 / 0.35)" strokeWidth="1.2" fill="none" />
        <path d="M40 240 Q180 220 320 280" stroke="oklch(0.55 0.03 60 / 0.25)" strokeWidth="1" fill="none" />
        <path d="M60 360 Q200 340 310 400" stroke="oklch(0.55 0.03 60 / 0.3)" strokeWidth="1" fill="none" />

        {/* Gold paneling lines on side walls */}
        <rect x="38" y="38" width="14" height="430" fill="url(#gold)" opacity="0.85" />
        <rect x="308" y="38" width="14" height="430" fill="url(#gold)" opacity="0.85" />

        {/* Mirror panel center */}
        <rect x="120" y="80" width="120" height="280" rx="4" fill="oklch(0.25 0.04 260)" stroke="url(#gold)" strokeWidth="2" />
        <rect x="120" y="80" width="120" height="280" rx="4" fill="url(#warm)" opacity="0.5" />

        {/* Floor (reflective marble) */}
        <rect x="38" y="468" width="284" height="70" fill="url(#floor)" />
        {/* Floor tile pattern */}
        <line x1="38" y1="490" x2="322" y2="490" stroke="oklch(0.6 0.08 70 / 0.4)" strokeWidth="1" />
        <line x1="38" y1="514" x2="322" y2="514" stroke="oklch(0.6 0.08 70 / 0.3)" strokeWidth="1" />
        <line x1="180" y1="468" x2="180" y2="538" stroke="oklch(0.6 0.08 70 / 0.3)" strokeWidth="1" />

        {/* Ceiling cove with warm light */}
        <rect x="38" y="38" width="284" height="32" fill="oklch(0.20 0.03 260)" />
        <rect x="46" y="44" width="268" height="6" rx="3" fill="url(#bulb)" />
        <ellipse cx="180" cy="80" rx="160" ry="40" fill="url(#warm)" />

        {/* Chandelier */}
        <line x1="180" y1="70" x2="180" y2="110" stroke="url(#gold)" strokeWidth="1.5" />
        <motion.g
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <circle cx="180" cy="118" r="14" fill="url(#bulb)" />
          <circle cx="180" cy="118" r="6" fill="#fff8d6" />
          <circle cx="160" cy="124" r="4" fill="url(#bulb)" />
          <circle cx="200" cy="124" r="4" fill="url(#bulb)" />
          <circle cx="170" cy="134" r="3" fill="url(#bulb)" />
          <circle cx="190" cy="134" r="3" fill="url(#bulb)" />
        </motion.g>

        {/* Floor indicator panel above doors */}
        <rect x="140" y="30" width="80" height="18" rx="4" fill="oklch(0.10 0.02 260)" stroke="url(#gold)" />
        <motion.text
          x="180" y="44" textAnchor="middle"
          fontFamily="ui-monospace, monospace" fontSize="12"
          fill="oklch(0.78 0.18 55)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ▲ 10 F
        </motion.text>

        {/* Doors (animated) */}
        <motion.rect
          x="38" y="38" width="142" height="430"
          fill="url(#door)" stroke="url(#gold)" strokeWidth="2"
          initial={{ x: 38 }}
          animate={{ x: [38, 38, -110, -110, 38] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.45, 0.85, 1], ease: "easeInOut" }}
        />
        <motion.rect
          x="180" y="38" width="142" height="430"
          fill="url(#door)" stroke="url(#gold)" strokeWidth="2"
          initial={{ x: 180 }}
          animate={{ x: [180, 180, 328, 328, 180] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.45, 0.85, 1], ease: "easeInOut" }}
        />

        {/* Door handles / vertical gold strips */}
        <motion.rect
          x="170" y="220" width="4" height="80" rx="2" fill="url(#gold)"
          initial={{ x: 170 }}
          animate={{ x: [170, 170, 22, 22, 170] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.45, 0.85, 1], ease: "easeInOut" }}
        />
        <motion.rect
          x="186" y="220" width="4" height="80" rx="2" fill="url(#gold)"
          initial={{ x: 186 }}
          animate={{ x: [186, 186, 334, 334, 186] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.45, 0.85, 1], ease: "easeInOut" }}
        />

        {/* Subtle frame highlight */}
        <rect x="10" y="10" width="340" height="540" rx="18" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" />
      </svg>
    </div>
  );
}
