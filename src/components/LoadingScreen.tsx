import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"closed" | "open" | "closing" | "done">("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("open"), 600);
    const t2 = setTimeout(() => setPhase("closing"), 2800);
    const t3 = setTimeout(() => setPhase("done"), 3800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-[80vh] w-[min(420px,90vw)] overflow-hidden rounded-2xl border border-primary/30 shadow-[var(--shadow-elegant)]">
            {/* Cabin interior */}
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[oklch(0.22_0.05_260)] to-[oklch(0.14_0.04_260)]">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: phase === "open" ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="mx-auto mb-6 grid place-items-center">
                    <Logo size={64} />
                  </div>
                  <p className="px-6 font-display text-lg text-foreground/90">
                    Welcome to <span className="gold-text font-bold">CIKAY Elevator</span>
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-primary">
                    Private Limited
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Doors */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-1/2 border-r border-primary/40 bg-gradient-to-b from-[oklch(0.30_0.05_260)] to-[oklch(0.18_0.04_260)]"
              animate={{
                x: phase === "open" ? "-100%" : "0%",
              }}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
            >
              <div className="absolute right-2 top-1/2 h-16 w-1 -translate-y-1/2 rounded bg-primary/70" />
            </motion.div>
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-1/2 border-l border-primary/40 bg-gradient-to-b from-[oklch(0.30_0.05_260)] to-[oklch(0.18_0.04_260)]"
              animate={{ x: phase === "open" ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
            >
              <div className="absolute left-2 top-1/2 h-16 w-1 -translate-y-1/2 rounded bg-primary/70" />
            </motion.div>

            {/* Floor indicator */}
            <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded border border-primary/40 bg-black/60 px-3 py-1 font-mono text-primary">
              ▲ 10
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
