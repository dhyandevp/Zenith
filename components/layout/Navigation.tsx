// components/layout/Navigation.tsx
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

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

        <div className="h-6 w-px bg-silver/30 mx-2" />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="border border-white/15 text-white/80 hover:text-white hover:border-white/30 rounded-full px-4 py-1.5 text-sm transition-all">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
