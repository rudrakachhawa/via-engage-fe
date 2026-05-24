"use client";

import { Loader2 } from "lucide-react";
import {
    useCallback,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { INSTAGRAM_AUTH_URL } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { useUserData } from "@/hooks/user.hooks";

export function InstagramAuthButton() {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const popupRef = useRef<Window | null>(null);

    const [loading, setLoading] = useState(false);

    const { refetch: refetchUserData } = useUserData()

    const handleConnectInstagram = useCallback(() => {
        if (
            popupRef.current &&
            !popupRef.current.closed
        ) {
            popupRef.current.focus();
            return;
        }

        setLoading(true);

        const popup = window.open(
            "",
            "popup",
            "width=600,height=800"
        );

        if (!popup) {
            setLoading(false);
            return;
        }

        popupRef.current = popup;

        popup.location.href = INSTAGRAM_AUTH_URL;

        function handleMessage(
            event: MessageEvent
        ) {
            if (
                event.data &&
                typeof event.data === "object" &&
                event.data.type === "INSTAGRAM_OAUTH_SUCCESS" &&
                event.data.payload
            ) {
                window.removeEventListener(
                    "message",
                    handleMessage
                );
                clearInterval(windowClosedInterval);

                dispatch(
                    setUser(event.data.payload)
                );
                refetchUserData()
                if (
                    popup &&
                    !popup.closed
                ) {
                    popup.close();
                }

                popupRef.current = null;
                setLoading(false);

                router.replace("/dashboard");
            }
        }

        window.addEventListener(
            "message",
            handleMessage
        );

        // Poll for popup window close
        const windowClosedInterval = setInterval(() => {
            if (!popupRef.current || popupRef.current.closed) {
                clearInterval(windowClosedInterval);
                popupRef.current = null;
                setLoading(false);
            }
        }, 500);
    }, [router, dispatch]);

    return (
        <Button
            onClick={handleConnectInstagram}
            disabled={loading}
            className="
        gap-2
      "
        >
            {loading ? (
                <Loader2
                    className="
            h-4 w-4 animate-spin
          "
                />
            ) : (
                <InstagramIcon
                    className="
            h-5 w-5
          "
                />
            )}

            {loading
                ? "Connecting..."
                : "Connect Instagram"}
        </Button>
    );
}