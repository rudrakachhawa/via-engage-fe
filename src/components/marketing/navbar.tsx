"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { useUserState } from "@/store/hooks";

export function Navbar() {
    const router = useRouter();

    const { id: userId } =
        useUserState();

    const isAuthenticated =
        Boolean(userId);

    const handleNavigation = () => {
        if (isAuthenticated) {
            router.push("/dashboard");
            return;
        }

        router.push("/login");
    };

    return (
        <header
            className="
        sticky top-0 z-50
        border-b border-white/10
        bg-background/80
        backdrop-blur-xl
      "
        >
            <div
                className="
          container-app
          flex h-16 items-center justify-between
        "
            >
                <div className="flex items-center gap-10">
                    <Link
                        href="/"
                        className="
              text-xl font-bold tracking-tight
              text-primary
            "
                    >
                        Engage via DM
                    </Link>

                    <nav
                        className="
              hidden md:flex
              items-center gap-8
            "
                    >
                        <Link
                            href="#features"
                            className="
                text-sm font-medium
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
                        >
                            Features
                        </Link>

                        <Link
                            href="#pricing"
                            className="
                text-sm font-medium
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
                        >
                            Pricing
                        </Link>
                    </nav>
                </div>

                <Button onClick={handleNavigation}>
                    {!isAuthenticated && <GoogleIcon />}

                    {isAuthenticated
                        ? "Go to Dashboard"
                        : "Continue with Google"}
                </Button>
            </div>
        </header>
    );
}