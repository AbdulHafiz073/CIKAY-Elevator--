import { useState } from "react";

export function Logo({ size = 48 }: { size?: number }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  // Resilient sources for the logo image.
  // When deploying to Vercel, the file MUST be placed in the "public" folder (i.e. /public/logo.jpg).
  // Vite copies files in "public" directly to the production build root, making "/logo.jpg" load flawlessly.
  const sources = [
    "/logo.jpg",
    "logo.jpg",
    "/src/logo.jpg"
  ];

  const handleImgError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setImgFailed(true);
    }
  };

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
              src={sources[srcIndex]}  
              className="object-cover rounded-[10%]"
              onError={handleImgError}
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

