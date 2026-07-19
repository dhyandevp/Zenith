import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-silver/20 rounded-[24px] bg-white/5 dark:bg-pine/10 backdrop-blur-md">
      <div className="w-20 h-20 rounded-full bg-aquamarine/10 flex items-center justify-center mb-6">
        <Icon size={32} className="text-aquamarine" />
      </div>
      <h3 className="font-display text-2xl font-bold text-pine dark:text-clovers mb-2">{title}</h3>
      <p className="font-body text-timeless max-w-md mx-auto mb-8">{description}</p>
      
      {action && (
        action.href ? (
          <Link 
            href={action.href}
            className="inline-flex items-center justify-center bg-aquamarine text-white px-6 py-3 rounded-full font-body font-medium hover:bg-mayan-jade transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button 
            onClick={action.onClick}
            className="inline-flex items-center justify-center bg-aquamarine text-white px-6 py-3 rounded-full font-body font-medium hover:bg-mayan-jade transition-colors"
          >
            {action.label}
          </button>
        )
      )}
      {children}
    </div>
  );
}
