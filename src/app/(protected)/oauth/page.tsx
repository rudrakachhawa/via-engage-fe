"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { createInstaAccessTokenApi } from "@/api/oauth";
import { BackgroundGlow } from "@/components/marketing/background-glow";
import { InstagramIcon } from "@/components/icons/instagram-icon";

export default function OauthConnectingPage() {
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(
        window.location.search
      )
      : null;

  const code = params?.get("code");

  const { mutate, status } = useMutation({
    mutationFn: createInstaAccessTokenApi,

    onSuccess: (response) => {
      if (window.opener) {
        window.opener.postMessage(
          {
            type:
              "INSTAGRAM_OAUTH_SUCCESS",
            payload: response,
          },
          "*"
        );
      }

      setTimeout(() => {
        window.close();
      }, 1500);
    },

    onError: () => {
      setTimeout(() => {
        window.close();
      }, 5000);
    },
  });

  useEffect(() => {
    if (code) {
      mutate(code);
    } else {
      setTimeout(() => {
        window.close();
      }, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const isLoading =
    status === "pending";

  const isSuccess =
    status === "success";

  const isError =
    status === "error" || !code;

  return (
    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-background px-6
      "
    >
      <BackgroundGlow />

      <div
        className="
          relative z-10
          w-full max-w-md
        "
      >
        <div
          className="
            rounded-3xl
            border border-border/70
            bg-card/90
            p-10
            text-center
            shadow-[var(--shadow-lg)]
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto mb-8
              flex h-20 w-20
              items-center justify-center
              rounded-3xl
              bg-surface
            "
          >
            {isLoading && (
              <Loader2
                className="
                  h-10 w-10
                  animate-spin
                  text-primary
                "
              />
            )}

            {isSuccess && (
              <CheckCircle2
                className="
                  h-10 w-10
                  text-green-500
                "
              />
            )}

            {isError && (
              <AlertCircle
                className="
                  h-10 w-10
                  text-red-500
                "
              />
            )}
          </div>

          <div
            className="
              mb-6 flex
              items-center justify-center
              gap-3
            "
          >
            <InstagramIcon
              className="
                h-7 w-7
              "
            />

            <span
              className="
                text-lg font-semibold
                text-primary
              "
            >
              Instagram Connection
            </span>
          </div>

          {isLoading && (
            <>
              <h1
                className="
                  text-3xl font-bold
                  tracking-tight
                "
              >
                Connecting your account
              </h1>

              <p
                className="
                  mt-4
                  text-base leading-7
                  text-muted-foreground
                "
              >
                Securely linking your Instagram
                workspace. This will only take a
                few seconds.
              </p>
            </>
          )}

          {isSuccess && (
            <>
              <h1
                className="
                  text-3xl font-bold
                  tracking-tight
                "
              >
                Instagram connected
              </h1>

              <p
                className="
                  mt-4
                  text-base leading-7
                  text-muted-foreground
                "
              >
                Your account has been connected
                successfully. Redirecting you back
                to your dashboard.
              </p>
            </>
          )}

          {isError && (
            <>
              <h1
                className="
                  text-3xl font-bold
                  tracking-tight
                "
              >
                Connection failed
              </h1>

              <p
                className="
                  mt-4
                  text-base leading-7
                  text-muted-foreground
                "
              >
                Something went wrong while
                connecting your Instagram account.
                This window will close automatically.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}