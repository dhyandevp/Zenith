// app/(public)/artifact/[slug]/loading.tsx — Aurora Forest skeleton loader
export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#080b12] pb-24 overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a3a5c] opacity-25 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0f2a1a] opacity-30 blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-6 py-8 max-w-[1000px] mx-auto w-full">
        {/* Back link skeleton */}
        <div className="w-32 h-6 bg-white/[0.06] rounded-md mb-8 animate-pulse" />

        {/* Hero — two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          {/* Cover art skeleton */}
          <div className="w-full lg:w-[300px] shrink-0">
            <div
              className="w-full aspect-[4/5] rounded-[32px] bg-white/[0.03] border border-white/[0.06] animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            {/* External link button skeleton */}
            <div
              className="mt-4 h-11 w-full rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse"
              style={{ animationDelay: "80ms" }}
            />
          </div>

          {/* Metadata skeleton */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Type badge pill */}
            <div
              className="w-20 h-6 rounded-full bg-white/[0.06] mb-4 animate-pulse"
              style={{ animationDelay: "80ms" }}
            />

            {/* Title — two lines */}
            <div
              className="w-4/5 h-9 rounded-lg bg-white/[0.06] mb-3 animate-pulse"
              style={{ animationDelay: "160ms" }}
            />
            <div
              className="w-2/3 h-9 rounded-lg bg-white/[0.06] mb-4 animate-pulse"
              style={{ animationDelay: "240ms" }}
            />

            {/* Creator/source line */}
            <div
              className="w-1/3 h-5 rounded-md bg-white/[0.06] mb-6 animate-pulse"
              style={{ animationDelay: "320ms" }}
            />

            {/* Horizontal rule */}
            <div className="h-px w-full bg-white/5 mb-6" />

            {/* Description — four lines */}
            <div
              className="w-full h-4 rounded-md bg-white/[0.06] mb-2 animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
            <div
              className="w-full h-4 rounded-md bg-white/[0.06] mb-2 animate-pulse"
              style={{ animationDelay: "480ms" }}
            />
            <div
              className="w-full h-4 rounded-md bg-white/[0.06] mb-2 animate-pulse"
              style={{ animationDelay: "560ms" }}
            />
            <div
              className="w-3/4 h-4 rounded-md bg-white/[0.06] mb-6 animate-pulse"
              style={{ animationDelay: "640ms" }}
            />

            {/* Tags row — five pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[16, 20, 24, 16, 20].map((w, i) => (
                <div
                  key={i}
                  className="h-6 rounded-full bg-white/[0.06] animate-pulse"
                  style={{
                    width: `${w * 4}px`,
                    animationDelay: `${720 + i * 80}ms`,
                  }}
                />
              ))}
            </div>

            {/* Horizontal rule */}
            <div className="h-px w-full bg-white/5 mb-6" />
          </div>
        </div>

        {/* Metadata grid — three cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 animate-pulse"
              style={{ animationDelay: `${1080 + i * 80}ms` }}
            >
              <div className="w-16 h-3 rounded bg-white/[0.06] mb-3" />
              <div className="w-24 h-5 rounded bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
