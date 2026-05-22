"use client"
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { BackgroundGlow } from "@/components/marketing/background-glow";

export default function LoginPage() {
  return (
    <>
      <BackgroundGlow />

      <main
        className="
          flex min-h-screen
          items-center justify-center
          px-6
        "
      >
        <div className="w-full max-w-md">
          <AuthHeader />

          <AuthCard />

          <AuthFooter />
        </div>
      </main>
    </>
  );
}