"use client";

import { Bell } from "lucide-react";

import { ProfileAvatar } from "@/components/dashboard/profile-avatar";

export function AppTopbar() {
    return (
        <header

            className="
          z-40
        flex h-16
        items-center justify-between
        bg-background/90
        px-6
        backdrop-blur-xl
        lg:px-8
      "
        >
            <div
                className="
          text-[28px]
          font-bold
          tracking-[-0.03em]
          text-primary
        "
            >
                Engage via DM
            </div>

            <div
                className="
          ml-auto
          flex items-center gap-4
        "
            >
                <button
                    className="
            relative rounded-xl
            p-2
            text-muted-foreground
            transition-colors
            hover:bg-surface
            hover:text-foreground
          "
                >
                    <Bell className="h-5 w-5" />

                    <div
                        className="
              absolute right-2 top-2
              h-2 w-2
              rounded-full
              bg-secondary
            "
                    />
                </button>

                <ProfileAvatar />
            </div>
        </header>
    );
}