import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-clovers dark:bg-pine">
      <Navigation />
      <main className="flex-1 flex flex-col relative overflow-x-hidden pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
