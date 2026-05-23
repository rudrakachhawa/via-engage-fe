"use client";

import { usePathname } from "next/navigation";

import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({
    children,
}: AppShellProps) {
    const pathname = usePathname();

    const isAutomationDetailPage =
        /^\/automations\/[^/]+$/.test(
            pathname
        );

    return (
        <div
            className="
        flex
        min-h-screen
        bg-background
      "
        >
            <AppSidebar />

            <div
                className="
          flex min-h-screen flex-1
          flex-col
          pl-20
        "
            >
                {!isAutomationDetailPage && (
                    <AppTopbar />
                )}

                <main className="flex-1">
                    {isAutomationDetailPage ? (
                        children
                    ) : (
                        <div
                            className="
                mx-auto
                w-full
                max-w-[1440px]
                px-6 py-8
                lg:px-8
              "
                        >
                            {children}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}