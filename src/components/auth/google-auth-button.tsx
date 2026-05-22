"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { userLoginApi } from "@/api/user";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
    auth,
    googleProvider,
} from "@/lib/firebase";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

import { signInWithPopup } from "firebase/auth";
import { setItemInStorage } from "@/utils/localStorageUtility";

interface GoogleAuthButtonProps {
    className?: string;
}

export function GoogleAuthButton({
    className,
}: GoogleAuthButtonProps) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            const token =
                await result.user.getIdToken();

            setItemInStorage('accessToken', token)

            const response =
                await userLoginApi();

            dispatch(setUser(response.user));
            // Navigate to the dashboard after successful login
            if (typeof window !== "undefined") {
                window.location.replace("/dashboard");
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            size="lg"
            variant="secondary"
            disabled={loading}
            onClick={handleLogin}
            className={`
        h-14 w-full
        justify-center
        rounded-xl
        bg-background
        text-foreground
        hover:bg-muted
        ${className || ""}
      `}
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <GoogleIcon />
            )}

            {loading
                ? "Connecting..."
                : "Continue with Google"}
        </Button>
    );
}