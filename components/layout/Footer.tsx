import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-12 mt-32 border-t border-silver/20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-aquamarine">Zenith</span>
          <span className="text-timeless text-sm">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-mono text-timeless">
          <Link href="/privacy" className="hover:text-aquamarine transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-aquamarine transition-colors">Terms</Link>
          <Link href="/about" className="hover:text-aquamarine transition-colors">About</Link>
        </div>
      </div>
    </footer>
  );
}
