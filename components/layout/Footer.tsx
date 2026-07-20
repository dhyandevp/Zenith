import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="w-full py-12 mt-32 border-t border-silver/20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 text-timeless text-sm">
          <div className="flex items-center gap-3">
            <Logo variant="footer" />
            <span>
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <span className="hidden md:inline text-silver/30">•</span>
          <span className="flex items-center gap-1.5">
            Built with ❤️ by
            <a
              href="https://linktr.ee/DhyandevRTX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pine/70 dark:text-clovers/70 hover:text-aquamarine transition-colors duration-300 font-medium"
            >
              Dhyandev P
            </a>
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-mono text-timeless">
          <Link
            href="/explore"
            className="hover:text-aquamarine transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/collections"
            className="hover:text-aquamarine transition-colors"
          >
            Collections
          </Link>
        </div>
      </div>
    </footer>
  );
}
