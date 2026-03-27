import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
