import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface FloorProps {
  id: string;
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function Floor({ id, number, label, children, className = "" }: FloorProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-[90vh] w-full px-4 py-20 md:py-28 lg:px-12 lg:pr-[150px] overflow-hidden ${className}`}
    >
      {/* Floor marker */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-4 select-none"
      >
        <div className="glass rounded-md px-3 py-1 font-mono text-xs text-primary font-semibold">
          FLOOR {number}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-display font-medium">
          {label}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
