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
              src="/image/Cikay-logo1.jpeg"
              className="object-cover rounded-[10%]"
              onError={() => setImgFailed(true)}
              style={{
                width: size,
                height: size * 0.9,
              }}
              alt="CIKAY"
            />
          ) : (
            <img
              src="/image/fallback-logo.png"
              alt="Fallback Logo"
              className="object-cover rounded-[10%]"
              style={{
                width: size * 0.7,
                height: size * 0.7,
              }}
            />
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