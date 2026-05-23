"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    BarChart3,
    LayoutDashboard,
    Plus,
    Settings,
    Wand2,
    Mail,
    User, // use profile icon
} from "lucide-react";
import { CreateAutomationButton } from "../automation/create-automation-button";

// Ensure unique keys for nav items
const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        key: "dashboard",
    },
    {
        label: "Automations",
        href: "/automations",
        icon: Wand2,
        key: "automations",
    },
    {
        label: "IG Accounts",
        href: "/ig-accounts", // Use a unique route for IG Accounts
        icon: User,
        key: "ig-accounts",
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        key: "analytics",
    },
    {
        label: "Contact Us",
        href: "/contact-us",
        icon: Mail,
        key: "contact-us",
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        key: "settings",
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="
        fixed left-0 top-0 z-50
        flex h-screen w-20
        flex-col
        border-r border-border
        bg-card/80
        px-4 py-6
        backdrop-blur-xl
        transition-all duration-300
        hover:w-64
        group
      "
        >
            <div className="mb-10">
                <div
                    className="
            flex items-center gap-4
          "
                >
                    <div
                        className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-xl
              bg-[image:var(--gradient-primary)]
              text-white
            "
                    >
                        <Wand2 className="h-5 w-5" />
                    </div>

                    <span
                        className="
              whitespace-nowrap
              text-xl font-bold
              text-primary
              opacity-0
              transition-opacity
              duration-200
              group-hover:opacity-100

              
            "
                    >
                        Engage via DM
                    </span>
                </div>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    // If current pathname is /settings, highlight only the real "Settings" nav item
                    const isActive =
                        pathname === item.href;

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`
                flex items-center gap-4
                rounded-xl
                px-3 py-3
                transition-all
                ${isActive
                                    ? `
                      bg-primary
                      text-white
                      shadow-md
                    `
                                    : `
                      text-muted-foreground
                      hover:bg-surface
                      hover:text-foreground
                    `
                                }
              `}
                        >
                            <Icon
                                className="
                  h-5 w-5 shrink-0
                "
                            />

                            <span
                                className="
                  whitespace-nowrap
                  text-sm font-semibold
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <div
                    className="
            overflow-hidden
          "
                >
                    <CreateAutomationButton
                        className="
              w-full
              justify-start
              gap-4
              overflow-hidden
              whitespace-nowrap
            "
                    />
                </div>
            </div>
        </aside>
    );
}