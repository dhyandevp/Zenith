"use client";

import { AlertTriangle } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen bg-clovers dark:bg-pine">
      <EmptyState
        icon={AlertTriangle}
        title="A Glitch in the Matrix"
        description="We encountered an unexpected error while trying to process your request."
        action={{ label: "Try Again", onClick: reset }}
      />
    </div>
  );
}
