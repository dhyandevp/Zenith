import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Navigation() {
  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-7xl bg-white/10 dark:bg-surface-dark/40 backdrop-blur-xl rounded-[20px] border border-silver/20 shadow-sm px-6 py-4 flex items-center justify-between"
      role="navigation"
      aria-label="Main navigation"
    >
      <Logo />
      <div className="flex items-center gap-6">
        <Link
          href="/explore"
          className="text-pine dark:text-clovers hover:text-aquamarine transition-colors text-sm font-medium"
        >
          Explore
        </Link>
        <Link
          href="/collections"
          className="text-pine dark:text-clovers hover:text-aquamarine transition-colors text-sm font-medium"
        >
          Collections
        </Link>
      </div>
    </nav>
  );
}
