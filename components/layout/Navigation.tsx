import Link from 'next/link';
import { UserButton, SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export async function Navigation() {
  const { userId } = await auth();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-7xl bg-white/10 dark:bg-surface-dark/40 backdrop-blur-xl rounded-[20px] border border-silver/20 shadow-sm px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-display font-bold text-2xl tracking-tight text-aquamarine">
        Zenith
      </Link>
      <div className="flex items-center gap-6">
        {userId ? (
          <>
            <Link href="/dashboard" className="text-pine dark:text-clovers hover:text-aquamarine transition-colors text-sm font-medium">Library</Link>
            <Link href="/collections" className="text-pine dark:text-clovers hover:text-aquamarine transition-colors text-sm font-medium">Collections</Link>
            <UserButton />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-aquamarine text-white px-5 py-2.5 rounded-[12px] text-sm font-medium hover:bg-mayan-jade transition-colors shadow-sm">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
