"use client";

import { useRouter } from "next/navigation";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { useUserState } from "@/store/hooks";

export function HeroSection() {
    const router = useRouter();

    const { id: userId } =
        useUserState();

    const isAuthenticated =
        Boolean(userId)

    const handleNavigation = () => {
        if (isAuthenticated) {
            router.push("/dashboard");
            return;
        }

        router.push("/login");
    };

    return (
        <section
            className="
        relative
        py-24 md:py-32
      "
        >
            <div
                className="
          mx-auto
          flex max-w-4xl
          flex-col items-center
          text-center
        "
            >


                <h1
                    className="
            hero-title
            max-w-5xl
            text-balance
            text-foreground
          "
                >
                    Scale your Instagram engagement{" "}
                    <span className="text-gradient">
                        with AI-powered DMs.
                    </span>
                </h1>

                <p
                    className="
            mt-8
            max-w-2xl
            text-lg leading-8
            text-muted-foreground
            md:text-xl
          "
                >
                    The ultimate automation platform for creators
                    and brands to engage 24/7 without lifting a
                    finger.
                </p>

                <div
                    className="
            mt-10
            flex flex-col gap-4
            sm:flex-row
          "
                >
                    <Button
                        size="lg"
                        onClick={handleNavigation}
                    >
                        {!isAuthenticated && <GoogleIcon />}

                        {isAuthenticated
                            ? "Go to Dashboard"
                            : "Continue with Google"}
                    </Button>

                    <Button
                        size="lg"
                        variant="secondary"
                    >
                        Watch Demo
                    </Button>
                </div>
            </div>
        </section>
    );
}