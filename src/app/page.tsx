"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/store/hooks";

export default function Home() {
  const router = useRouter();
  const { id: userId, igUserId } = useUserState()
  useEffect(() => {
    if (userId && igUserId) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [userId, igUserId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
    </div>
  );
}
