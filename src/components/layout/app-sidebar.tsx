"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    BarChart3,
    LayoutDashboard,
    Mail,
    Settings,
    User,
    Wand2,
} from "lucide-react";

import { useState } from "react";

import { CreateAutomationButton } from "../automation/create-automation-button";

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
        href: "/ig-accounts",
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
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    const [expanded, setExpanded] =
        useState(false);

    return (
        <aside
            onMouseEnter={() =>
                setExpanded(true)
            }
            onMouseLeave={() =>
                setExpanded(false)
            }
            className={`
        fixed left-0 top-0 z-50
        flex h-screen
        flex-col
        border-r border-border
        bg-card/80
        px-4 py-6
        backdrop-blur-xl
        transition-all duration-300
        ${expanded
                    ? "w-64"
                    : "w-20"
                }
      `}
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
                        className={`
              whitespace-nowrap
              text-xl font-bold
              text-primary
              transition-all duration-200
              ${expanded
                                ? `
                    opacity-100
                    translate-x-0
                  `
                                : `
                    opacity-0
                    -translate-x-2
                    pointer-events-none
                  `
                            }
            `}
                    >
                        Engage via DM
                    </span>
                </div>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;

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
                                className={`
                  whitespace-nowrap
                  text-sm font-semibold
                  transition-all duration-200
                  ${expanded
                                        ? `
                        opacity-100
                        translate-x-0
                      `
                                        : `
                        opacity-0
                        -translate-x-2
                        pointer-events-none
                      `
                                    }
                `}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto overflow-hidden">
                <CreateAutomationButton
                    className="
            w-full
            justify-start
            gap-4
            whitespace-nowrap
          "
                />
            </div>
        </aside>
    );
}