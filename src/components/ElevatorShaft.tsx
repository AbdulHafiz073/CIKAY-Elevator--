import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FLOORS = ["10", "8", "6", "4", "3", "2", "G"];

export function ElevatorShaft() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  // Cabin position from 4% to 84% of shaft
  const cabinY = useTransform(smooth, [0, 1], ["4%", "84%"]);
  const [floor, setFloor] = useState("10");
  const [doorsOpen, setDoorsOpen] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(smooth, "change", (v) => {
    const idx = Math.min(FLOORS.length - 1, Math.floor(v * FLOORS.length));
    setFloor(FLOORS[idx]);
    setDoorsOpen(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setDoorsOpen(true), 380);
  });

  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  return (
    <>
      {/* Fixed shaft on right side - desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-6 top-0 z-40 hidden h-screen w-[110px] lg:block"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shaft-bg shadow-[var(--shadow-elegant)]">
          {/* Cable */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent" />
          {/* Floor marks */}
          {FLOORS.map((f, i) => (
            <div
              key={f}
              className="absolute left-0 right-0 flex items-center justify-between px-2 text-[10px] font-mono text-white/30"
              style={{ top: `${(i / (FLOORS.length - 1)) * 92 + 4}%` }}
            >
              <span className="h-px w-3 bg-white/20" />
              <span>{f}</span>
              <span className="h-px w-3 bg-white/20" />
            </div>
          ))}

          {/* Cabin */}
          <motion.div
            className="absolute left-1/2 h-[80px] w-[86px] -translate-x-1/2 rounded-md border border-primary/40 bg-gradient-to-b from-[oklch(0.28_0.06_260)] to-[oklch(0.16_0.04_260)] shadow-[var(--shadow-glow)]"
            style={{ top: cabinY }}
          >
            {/* Indicator */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded border border-primary/50 bg-black/70 px-2 py-0.5 font-mono text-[11px] text-primary">
              {parseFloat(scrollYProgress.get?.().toString() ?? "0") > 0 ? "▼" : "▲"} {floor}
            </div>
            {/* Doors */}
            <div className="absolute inset-1 overflow-hidden rounded">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 border-r border-primary/40 bg-gradient-to-b from-[oklch(0.36_0.06_260)] to-[oklch(0.20_0.04_260)]"
                animate={{ x: doorsOpen ? "-100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 border-l border-primary/40 bg-gradient-to-b from-[oklch(0.36_0.06_260)] to-[oklch(0.20_0.04_260)]"
                animate={{ x: doorsOpen ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              {/* Cabin interior glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.18_50/0.25),transparent_70%)]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet compact shaft */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-2 top-20 bottom-20 z-40 w-[46px] lg:hidden"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 shaft-bg shadow-[var(--shadow-elegant)]">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent" />
          {FLOORS.map((f, i) => (
            <div
              key={f}
              className="absolute left-0 right-0 flex items-center justify-center text-[8px] font-mono text-white/30"
              style={{ top: `${(i / (FLOORS.length - 1)) * 92 + 4}%` }}
            >
              {f}
            </div>
          ))}
          <motion.div
            className="absolute left-1/2 h-[46px] w-[36px] -translate-x-1/2 rounded border border-primary/40 bg-gradient-to-b from-[oklch(0.28_0.06_260)] to-[oklch(0.16_0.04_260)] shadow-[var(--shadow-glow)]"
            style={{ top: cabinY }}
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded border border-primary/50 bg-black/70 px-1 font-mono text-[9px] text-primary">
              {floor}
            </div>
            <div className="absolute inset-[1.5px] overflow-hidden rounded-sm">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 border-r border-primary/40 bg-gradient-to-b from-[oklch(0.36_0.06_260)] to-[oklch(0.20_0.04_260)]"
                animate={{ x: doorsOpen ? "-100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 border-l border-primary/40 bg-gradient-to-b from-[oklch(0.36_0.06_260)] to-[oklch(0.20_0.04_260)]"
                animate={{ x: doorsOpen ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.18_50/0.25),transparent_70%)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
