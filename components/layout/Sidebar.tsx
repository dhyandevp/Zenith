"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Library, Folder, Star, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Library", href: "/library", icon: Library },
  { name: "Collections", href: "/collections", icon: Folder },
  { name: "Favorites", href: "/favorites", icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white/30 dark:bg-pine/30 backdrop-blur-2xl border-r border-silver/20 flex flex-col justify-between py-8 px-4 z-40">
      <div>
        <div className="px-4 mb-10">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-aquamarine">
            Zenith
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all font-body text-sm font-medium",
                  isActive 
                    ? "bg-aquamarine/10 text-aquamarine"
                    : "text-pine/70 dark:text-clovers/70 hover:bg-white/40 dark:hover:bg-pine/40 hover:text-pine dark:hover:text-clovers"
                )}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/settings"
          className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all font-body text-sm font-medium",
            pathname === "/settings"
              ? "bg-aquamarine/10 text-aquamarine"
              : "text-pine/70 dark:text-clovers/70 hover:bg-white/40 dark:hover:bg-pine/40 hover:text-pine dark:hover:text-clovers"
          )}
        >
          <Settings size={18} />
          Settings
        </Link>
        <div className="px-4 py-3 flex items-center justify-between border-t border-silver/20 mt-2 pt-5">
          <div className="flex items-center gap-3">
             <UserButton />
             <span className="text-sm font-medium text-pine dark:text-clovers">Profile</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
