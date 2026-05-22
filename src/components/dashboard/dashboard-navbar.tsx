import {
    Bell,
    History,
} from "lucide-react";

import { ProfileAvatar } from "./profile-avatar";

export function DashboardNavbar() {
    return (
        <header
            className="
          sticky top-0 z-40
          bg-background/80
          backdrop-blur-md
        "
        >
            <div
                className="
            mx-auto
            flex h-16
            max-w-[1440px]
            items-center justify-between
            px-6
            lg:px-8
          "
            >
                <div className="flex items-center gap-8">
                    <span
                        className="
                text-[24px]
                font-bold
                tracking-tight
                text-primary
              "
                    >
                        Engage via DM
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            className="
                  text-muted-foreground
                  transition-colors
                  hover:text-primary
                "
                        >
                            <Bell className="h-5 w-5" />
                        </button>


                    </div>

                    <ProfileAvatar />
                </div>
            </div>
        </header>
    );
}