import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
