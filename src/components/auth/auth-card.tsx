"use client";

import { useState } from "react";


import { TrustedUsers } from "./trusted-users";
import { GoogleAuthButton } from "./google-auth-button";

export function AuthCard() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div
            className="
        relative overflow-hidden
        rounded-2xl
        border border-border/70
        bg-card
        p-8
        shadow-[var(--shadow-sm)]
      "
        >
            <div
                className="
          absolute left-0 top-0
          h-1 w-full
          bg-[image:var(--gradient-primary)]
        "
            />

            <div className="mb-8">
                <h2
                    className="
            text-2xl font-semibold
            tracking-tight
          "
                >
                    {isLogin
                        ? "Welcome back"
                        : "Join ezzzDM"}
                </h2>

                <p
                    className="
            mt-2
            text-sm leading-6
            text-muted-foreground
          "
                >
                    {isLogin
                        ? "Continue to your dashboard to manage your workflows."
                        : "Start automating your social engagement in seconds."}
                </p>
            </div>

            <div className="space-y-6">
                <GoogleAuthButton />

                <div className="flex justify-center">
                    <button
                        onClick={() =>
                            setIsLogin(!isLogin)
                        }
                        className="
              text-sm font-medium
              text-primary
              transition-colors
              hover:text-tertiary
            "
                    >
                        {isLogin ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <span className="underline">
                                    Create one
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span className="underline">
                                    Sign in
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <TrustedUsers />
        </div>
    );
}