"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserState } from "@/store/hooks";
import { AppShell } from "@/components/layout/app-shell";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const { id: userId } = useUserState();

    const isAuthenticated = Boolean(userId);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    // If the current route includes "oauth", do not wrap in AppShell
    if (pathname && pathname.includes("oauth")) {
        return <>{children}</>;
    }

    return <AppShell>{children}</AppShell>;
}