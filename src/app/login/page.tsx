"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useUserState } from "@/store/hooks";

import {
  INSTAGRAM_AUTH_URL,
  ConnectInstagramButton,
} from "@/components/instagram/instagramConnect";
import SocialAuthButtons from "@/components/login/socialAuthButton";
import { setUser } from "@/store/slices/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const popupRef = useRef<Window | null>(null);
  const dispatch = useAppDispatch()
  // Access user state from Redux (id and igUserId)
  const { id, igUserId } = useUserState();

  // ALWAYS define hooks at the top level, do not put useCallback/useRef inside branch
  const handleConnectInstagram = useCallback(() => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }
    const popup = window.open("", "popup", "width=600,height=800");
    if (!popup) return;
    popupRef.current = popup;
    popup.location.href = INSTAGRAM_AUTH_URL;

    function handleMessage(event: MessageEvent) {
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "INSTAGRAM_OAUTH_SUCCESS" &&
        event.data.payload &&
        typeof event.data.payload.access_token === "string" &&
        typeof event.data.payload.username === "string" &&
        typeof event.data.payload.name === "string"
      ) {
        // This is a placeholder; implement your storage and handling logic as needed.
        window.removeEventListener("message", handleMessage);
        dispatch(setUser(event.data.payload))
        if (popup && !popup.closed) {
          popup.close();
        }
        popupRef.current = null;
        router.replace("/dashboard");
      }
    }
    window.addEventListener("message", handleMessage);
  }, [router]);

  // Only renders login page if id is NOT present (not authenticated)
  if (!id) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
        <main className="w-full max-w-3xl flex flex-col items-center bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-10 sm:p-16 mt-12 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
            Welcome to viaEngage 🚀
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
            Effortless Instagram Engagement Automation for Creators, Brands & Agencies
          </h2>
          <div className="mb-8">
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 dark:text-gray-200 text-left max-w-2xl mx-auto mb-6 space-y-2">
              <li>
                <span className="font-bold text-purple-600">Instant Auto-Replies:</span> Respond to comments or DMs within seconds, even when offline.
              </li>
              <li>
                <span className="font-bold text-pink-500">Supercharge Your Leads:</span> Automatically nurture leads so you never miss a business opportunity.
              </li>
              <li>
                <span className="font-bold text-rose-500">Unified Inbox:</span> Filter, track, and manage all conversations in a beautiful, powerful dashboard.
              </li>
              <li>
                <span className="font-bold text-purple-500">Engage At Scale:</span> Grow your Instagram audience with personalized automations tailored for impact.
              </li>
              <li>
                <span className="font-bold text-pink-600">Secure & Simple:</span> Your data and Instagram account are always safe—no passwords required!
              </li>
            </ul>
            <p className="text-base text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Whether you're a creator working solo, a growing brand, or a social marketing agency,
              <span className="ml-1 font-semibold text-foreground">viaEngage</span> gives you everything you need to engage your followers like a pro.
              <br className="hidden sm:block" />
              <span className="font-medium text-purple-600">Connect your account to get started. Experience <i>next-level</i> Instagram automation today!</span>
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4">
            <h3 className="text-md sm:text-lg mb-2 font-medium text-gray-900 dark:text-gray-200 tracking-wide text-center">
              Secure social sign-in to begin your journey
            </h3>
            <SocialAuthButtons />
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs mt-2">
              We never post or message without your permission. Your privacy and security are our top priorities.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // If id is present but igUserId is missing, show connect Instagram prompt
  if (!igUserId) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
        <main className="w-full max-w-3xl flex flex-col items-center bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-10 sm:p-16 mt-12 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-foreground mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
            Connect your Instagram
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            To continue, connect your Instagram Business account.
          </h2>
          <div className="w-full flex flex-col items-center gap-6 mt-4">
            <ConnectInstagramButton onConnect={handleConnectInstagram} />
          </div>
        </main>
      </div>
    );
  }

  // If both id and igUserId are present, redirect to dashboard (shouldn't reach here generally)
  router.replace("/dashboard");
  return null;
}
