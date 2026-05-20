"use client";

import { useRouter } from "next/navigation";
import { UserDashboard } from "@/components/instagram/instagramConnect";

export default function DashboardPage() {
  const router = useRouter();

  const handleSeeAutomations = () => {
    router.push("/automations");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
      <main className="w-full max-w-3xl flex flex-col items-center bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-10 sm:p-16 mt-12 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-foreground mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          viaEngage
        </h1>
        <UserDashboard />
        <button
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 text-white font-semibold text-lg shadow-lg transition-all hover:scale-105 active:scale-95 focus:ring-2 focus:ring-pink-400 outline-none"
          onClick={handleSeeAutomations}
        >
          See Automations
        </button>
      </main>
    </div>
  );
}
