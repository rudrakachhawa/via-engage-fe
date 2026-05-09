"use client"

import { useState } from "react";

interface InstagramUserData {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  instagram_user_id: string;
  username: string;
  name: string;
}

export default function Home() {
  const [userData, setUserData] = useState<InstagramUserData | null>(null);

  // Handler to show Instagram popup and process OAuth result
  const handleConnectInstagram = () => {
    const popup = window.open("", "popup", "width=600,height=800");
    if (popup) {
      popup.location.href =
        "https://www.instagram.com/accounts/login/?force_authentication=true&next=%2Foauth%2Fauthorize%2F%3Fclient_id%3D2187891761969078%26redirect_uri%3Dhttps%253A%252F%252Fvia-engage-fe.vercel.app%252Foauth%26response_type%3Dcode%26scope%3Dinstagram_business_basic%252Cinstagram_business_content_publish%252Cinstagram_business_manage_messages%252Cinstagram_business_manage_comments";

      // await message from popup
      const handleMessage = (event: MessageEvent) => {
        // Optionally validate event.origin, etc.
        if (event.source === popup && event.data && typeof event.data === "object") {
          // Check for the specific expected shape (at least: username and name, plus access_token)
          if (
            typeof event.data.access_token === "string" &&
            typeof event.data.username === "string" &&
            typeof event.data.name === "string"
          ) {
            setUserData({
              access_token: event.data.access_token,
              token_type: event.data.token_type,
              expires_in: event.data.expires_in,
              scope: event.data.scope,
              instagram_user_id: event.data.instagram_user_id,
              username: event.data.username,
              name: event.data.name,
            });
            window.removeEventListener("message", handleMessage);
            popup.close();
          }
        }
      };
      window.addEventListener("message", handleMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
      <main className="w-full max-w-3xl flex flex-col items-center bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-10 sm:p-16 mt-12 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-foreground mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          viaEngage
        </h1>
        {!userData ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Automate your Instagram DMs and supercharge your conversations!
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 text-center max-w-2xl">
              <span className="font-semibold text-foreground">viaEngage</span> helps creators, businesses, and agencies automate direct messages, respond quicker to leads, manage conversations, and connect with your followers — all in one powerful and simple interface. Connect your Instagram to get started and experience seamless engagement automation.
            </p>
            <div className="w-full flex flex-col items-center gap-4">
              <h3 className="text-md sm:text-lg mb-2 font-medium text-gray-900 dark:text-gray-200 tracking-wide">
                Let's Get Started
              </h3>
              <button
                className="flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 text-white px-7 py-2 font-semibold text-lg shadow-lg transition-all hover:scale-105 active:scale-95 focus:ring-2 focus:ring-pink-400 outline-none"
                onClick={handleConnectInstagram}
              >
                <span className="inline-block">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <radialGradient id="insta-gradient" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="40%" stopColor="#fa7e1e" />
                      <stop offset="70%" stopColor="#d62976" />
                      <stop offset="100%" stopColor="#962fbf" />
                    </radialGradient>
                    <rect width="24" height="24" rx="6" fill="url(#insta-gradient)" />
                    <path d="M16 7.5a1.5 1.5 0 11-3-.001A1.5 1.5 0 0116 7.5zM12 9.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm5.25.75a6 6 0 10-12 0 6 6 0 0012 0zm-6-3a3 3 0 11.001 6.001A3 3 0 0111.25 7.5z" fill="#fff" />
                  </svg>
                </span>
                Connect your Instagram
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center mt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👋</span>
              <span className="text-2xl font-bold text-purple-600">{userData.name}</span>
              <span className="text-lg text-gray-500 dark:text-gray-300">@{userData.username}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Welcome to viaEngage!
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-200 text-center max-w-xl mb-6">
              We’re excited to help you automate your Instagram engagement. Here’s what you can do:
            </p>
            <ul className="list-disc list-inside mb-2 text-left text-base sm:text-lg text-gray-700 dark:text-gray-200">
              <li>
                <b>Auto-reply on comments</b> — Instantly respond to comments on your posts with tailored messages.
              </li>
              <li>
                <b>Auto DM on a specific comment</b> — Automatically send DMs whenever someone comments a particular keyword or phrase.
              </li>
              <li>
                <b>Quick reply to leads</b> — Never miss a lead with prompt, automated responses.
              </li>
              <li>
                <b>Seamless conversation management</b> — Track, filter, and reply in a unified dashboard.
              </li>
              <li>
                <b>Supercharged engagement</b> — Connect, nurture, and grow your audience efficiently.
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
              Start exploring the dashboard to configure your automation rules!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
