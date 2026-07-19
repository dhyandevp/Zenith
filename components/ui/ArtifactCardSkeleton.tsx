import clsx from "clsx";

export function ArtifactCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[20px] bg-white/5 border border-silver/10 flex flex-col justify-end p-6",
        className
      )}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
      
      <div className="relative z-20 flex flex-col gap-3">
        <div className="w-24 h-3 bg-silver/20 rounded-full" />
        <div className="w-3/4 h-6 bg-silver/20 rounded-md" />
        <div className="w-1/2 h-6 bg-silver/20 rounded-md" />
      </div>
    </div>
  );
}
