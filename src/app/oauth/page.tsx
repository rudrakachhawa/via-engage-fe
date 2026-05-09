"use client";

import { useEffect } from "react";
import { createInstaAccessToken } from "../../api/oauth";
import { useMutation } from "@tanstack/react-query";

export default function OauthConnectingPage() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const code = params?.get("code");

  const { mutate, status } = useMutation({
    mutationFn: createInstaAccessToken,
    onSuccess: (response) => {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "INSTAGRAM_OAUTH_SUCCESS",
            payload: response,
          },
          "*"
        );
      }
      setTimeout(() => {
        window.close();
      }, 1000);
    },
    onError: () => {
      setTimeout(() => {
        window.close();
      }, 5000);
    }
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

  if (status === "pending" || status === "idle") {
    return null;
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Connecting with your Instagram...</h1>
        <p className="text-lg text-gray-600">Please wait while we finish connecting your Instagram account.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-red-600">An error occurred!</h1>
      <p className="text-lg text-gray-600">
        Something went wrong connecting to Instagram. This window will close in a few seconds.
      </p>
    </div>
  );
}