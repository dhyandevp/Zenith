import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Settings</h1>
        <p className="font-body text-timeless mt-2">Manage your Zenith preferences and integrations.</p>
      </header>
      
      <div className="border border-silver/20 rounded-[24px] bg-white/5 dark:bg-pine/10 backdrop-blur-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <SettingsIcon className="text-aquamarine" size={24} />
          <h2 className="font-display text-xl font-semibold text-pine dark:text-clovers">Account Preferences</h2>
        </div>
        <p className="font-body text-timeless">User profile and subscription settings will appear here, powered by Clerk.</p>
      </div>
    </div>
  );
}
