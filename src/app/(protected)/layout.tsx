"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/store/hooks";


export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { id: userId, igUserId } =
        useUserState();

    const isAuthenticated =
        Boolean(userId) && Boolean(igUserId);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}