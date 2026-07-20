import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "footer";
}

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      aria-label="Zenith Home"
      className={`group relative flex items-center gap-3 transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-aquamarine focus-visible:ring-offset-2 focus-visible:ring-offset-clovers dark:focus-visible:ring-offset-pine rounded-full ${
        isFooter ? "opacity-80 hover:opacity-100" : "hover:scale-[1.03]"
      } ${className}`}
    >
      {/* Outer Container (Glass effect + Shadow) */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${
          !isFooter
            ? "bg-white/10 dark:bg-surface-dark/40 backdrop-blur-md border border-silver/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:bg-white/20 dark:group-hover:bg-surface-dark/60 group-hover:border-aquamarine/40 group-hover:shadow-[0_0_20px_rgba(16,93,94,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]"
            : ""
        }`}
      />

      <div
        className={`relative z-10 flex items-center ${
          isFooter ? "gap-2" : "gap-3 px-4 py-2"
        }`}
      >
        {/* Brand Icon */}
        <div
          className={`relative flex shrink-0 items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 ${
            isFooter ? "w-6 h-6" : "w-7 h-7"
          }`}
        >
          {/* Subtle Glow behind icon */}
          <div className="absolute inset-0 bg-aquamarine/40 blur-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-sm"
          >
            {/* Left Facet */}
            <path
              d="M16 2L4 12V24L16 14V2Z"
              className="fill-mayan-jade/80 dark:fill-mayan-jade/90 transition-colors duration-500 group-hover:fill-mayan-jade"
            />
            {/* Right Facet */}
            <path
              d="M16 2L28 12V24L16 14V2Z"
              className="fill-aquamarine/90 dark:fill-aquamarine transition-colors duration-500 group-hover:fill-aquamarine"
            />
            {/* Bottom Facet */}
            <path
              d="M4 24L16 32L28 24L16 14L4 24Z"
              className="fill-pine/80 dark:fill-clovers/80 transition-colors duration-500 group-hover:fill-pine dark:group-hover:fill-clovers"
            />
            {/* Inner Core Highlight */}
            <path
              d="M16 8L10 13V19L16 14V8Z"
              className="fill-white/60 dark:fill-white/30"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <span
          className={`font-display font-extrabold tracking-tighter text-pine dark:text-clovers transition-colors duration-500 ${
            isFooter ? "text-xl" : "text-2xl group-hover:text-aquamarine"
          }`}
        >
          Zenith
        </span>
      </div>
    </Link>
  );
}
