"use client";

import { X } from "lucide-react";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

import { MediaGrid } from "./media-grid";
import { useUserMedia } from "@/hooks/use-media-picker";

interface MediaPickerModalProps {
    open: boolean;

    onClose: () => void;

    type: "FEED" | "STORY";

}

export function MediaPickerModal({
    open,
    onClose,
    type,
}: MediaPickerModalProps) {
    const { state, updateBuilder } =
        useAutomationBuilder();
    const {
        data,
        status,
    } = useUserMedia(
        type,
        state.igUserId || ""
    );

    if (!open) return null;

    return (
        <div
            className="
        fixed inset-0 z-[100]
        flex items-center
        justify-center
        bg-black/60
        p-6
        backdrop-blur-sm
      "
        >
            <div
                className="
          flex h-[85vh]
          w-full max-w-6xl
          flex-col
          overflow-hidden
          rounded-3xl
          border border-border
          bg-background
          shadow-2xl
        "
            >
                <div
                    className="
            flex items-center
            justify-between
            border-b border-border
            px-6 py-5
          "
                >
                    <div>
                        <h2
                            className="
                text-2xl font-bold
                tracking-tight
              "
                        >
                            Select{" "}
                            {type === "FEED"
                                ? "Post / Reel"
                                : "Story"}
                        </h2>

                        <p
                            className="
                mt-1 text-sm
                text-muted-foreground
              "
                        >
                            Choose media for your
                            automation trigger.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              transition-colors
              hover:bg-surface
            "
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div
                    className="
            flex-1 overflow-y-auto
            p-6
          "
                >
                    {status === "pending" ? (
                        <div
                            className="
                flex h-full
                items-center
                justify-center
              "
                        >
                            Loading...
                        </div>
                    ) : !data?.length ? (
                        <div
                            className="
                flex h-full
                flex-col
                items-center
                justify-center
                text-center
              "
                        >
                            <div
                                className="
                  rounded-full
                  bg-surface
                  px-4 py-2
                  text-sm
                  text-muted-foreground
                "
                            >
                                No{" "}
                                {type === "FEED"
                                    ? "Posts or Reels"
                                    : "Stories"}{" "}
                                Available
                            </div>

                            <p
                                className="
                  mt-4
                  max-w-md
                  text-sm leading-6
                  text-muted-foreground
                "
                            >
                                {type === "FEED"
                                    ? `
                    Publish posts or reels from
                    Instagram to use them in
                    automations.
                  `
                                    : `
                    Only active stories posted
                    within the last 24 hours
                    appear here.
                  `}
                            </p>
                        </div>
                    ) : (
                        <MediaGrid
                            type={type}
                            media={data}
                            onSelect={(data) => {
                                onClose();
                                updateBuilder(data)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}