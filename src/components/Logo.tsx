import { useState } from "react";

export function Logo({ size = 48 }: { size?: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="relative grid place-items-center rounded-md"
        style={{
          width: size,
          height: size,
          background: "var(--gradient-gold)",
          padding: 2,
        }}
      >
        <div className="grid h-full w-full place-items-center rounded-[4px] bg-background overflow-hidden">
          {!imgFailed ? (
            <img 
              src="/src/components/public/image/Cikay-logo1.jpeg"  
              className="object-cover rounded-[10%]"
              onError={() => setImgFailed(true)}
              style={{
                width: size,
                height: size * 0.9 
              }} 
              alt="CIKAY"
            />
          ) : (
            <span
              className="gold-text font-display font-bold leading-none"
              style={{ fontSize: size * 0.5 }}
            >
              C
            </span>
          )}
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-wide text-foreground">
          CIKAY
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
          Elevator Pvt Ltd
        </div>
      </div>
    </div>
  );
}
