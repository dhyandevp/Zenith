// app/sign-up/[[...sign-up]]/page.tsx — Aurora Forest styled sign-up
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b12] overflow-hidden relative">
      {/* Ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a3a5c] opacity-25 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0f2a1a] opacity-30 blur-[120px] pointer-events-none" />

      {/* Glass card */}
      <div className="relative z-10 flex flex-col items-center bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-[32px] p-10">
        <h1 className="text-white text-2xl font-light tracking-widest mb-1">
          ZENITH
        </h1>
        <p className="text-sm text-white/40 tracking-wide mb-6">
          Start curating the internet
        </p>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none p-0",
              headerTitle: "text-white font-light",
              headerSubtitle: "text-white/50",
              formButtonPrimary:
                "bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-colors",
              footerActionLink:
                "text-emerald-400 hover:text-emerald-300 transition-colors",
              socialButtonsBlockButton:
                "border-white/15 text-white/80 hover:bg-white/[0.06] transition-colors rounded-full",
              socialButtonsBlockButtonText: "text-white/80",
              formFieldLabel: "text-white/60",
              formFieldInput:
                "bg-white/[0.06] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:ring-emerald-500 focus:border-emerald-500",
              footerAction: "text-white/40",
              identityPreviewEditButton: "text-emerald-400",
              formFieldAction__password: "text-emerald-400",
            },
          }}
        />
      </div>
    </div>
  );
}
