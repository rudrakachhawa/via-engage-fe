"use client";

import { useRouter } from "next/navigation";
import { useUserState } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { id: userId, igUserId } = useUserState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAction = () => {
    if (userId && igUserId) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9ff]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface relative overflow-hidden flex flex-col font-sans">
      {/* TopAppBar */}
      <header className="flex justify-between items-center h-16 px-container-padding-desktop sticky top-0 z-40 bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <span 
            className="font-headline-md text-headline-md font-bold text-primary cursor-pointer select-none" 
            onClick={() => router.push("/")}
          >
            Engage via DM
          </span>
          <nav className="hidden md:flex items-center gap-8 ml-8">
            <a 
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" 
              href="#features-grid"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("features-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Features
            </a>
            <a 
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" 
              href="#"
            >
              Pricing
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          {userId && igUserId ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="primary-gradient text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md btn-shadow transition-all cursor-pointer"
            >
              Go to Dashboard
            </button>
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push("/login")}
                className="text-label-md font-label-md text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all border border-primary/20 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/login")}
                className="primary-gradient text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md btn-shadow transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 bg-white p-0.5 rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                  </svg>
                  Sign Up
                </div>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-container-padding-desktop py-12 flex-grow flex flex-col justify-center">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="font-display-lg text-display-lg text-primary mb-6 tracking-tight">
            Scale your Instagram engagement <br />
            <span className="text-secondary">with AI-powered DMs.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            The ultimate automation platform for creators and brands to engage 24/7 without lifting a finger.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleAction}
              className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-headline-md text-label-md btn-shadow transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 bg-white p-0.5 rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              {userId && igUserId ? "Go to Dashboard" : "Get Started for Free"}
            </button>
            
            <button 
              onClick={() => {
                document.getElementById("features-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-surface-container text-primary border border-primary/20 px-8 py-4 rounded-xl font-headline-md text-label-md hover:bg-surface-container-high transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>
        </section>

        {/* Section Gap */}
        <div className="py-12"></div>

        {/* Bottom Grid: Knowledge Base & Benefits */}
        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center gap-6 p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">shield</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Secure &amp; Compliant</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We use official Instagram Graph APIs to ensure your account remains safe and compliant. Your security is our top priority with 256-bit encryption.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-6 p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">rocket_launch</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Rapid Engagement</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Scale your interaction rates without increasing your manual workload. Respond to every comment and DM in milliseconds, 24/7.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-6 p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">analytics</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Advanced Insights</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Get granular data on how your automations are performing. Track conversion rates, engagement lift, and total time saved daily.
                </p>
              </div>
            </div>
          </main>

          {/* Subtle Background Element */}
          <div className="fixed top-0 right-0 -z-10 w-1/2 h-screen overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px] floating-anim"></div>
            <div className="absolute top-1/2 -right-12 w-64 h-64 bg-secondary rounded-full blur-[80px] floating-anim" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      );
    }

