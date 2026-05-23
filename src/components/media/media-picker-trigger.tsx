"use client"

import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import { useUserMedia } from "@/hooks/use-media-picker";
import { useUserData } from "@/hooks/user.hooks";

interface MediaPickerTriggerProps {

  type: "FEED" | "STORY";

  onClick: () => void;

  label?: string;
}

export function MediaPickerTrigger({
  type,
  onClick,
  label,
}: MediaPickerTriggerProps) {
  const { state } = useAutomationBuilder()
  const mediaId = {
    targetContentId: state.targetContentId
  }
  const media = useUserMedia(type, state.igUserId || "").data?.find((item: { id: string }) => item.id == mediaId.targetContentId)
  const hasMedia = !!media;

  return (
    <button
      onClick={onClick}
      className="
        flex w-full
        items-center gap-4
        rounded-xl
        border border-border
        bg-card
        p-3
        text-left
        transition-all
        hover:border-primary
        hover:ring-4
        hover:ring-primary/10
      "
    >
      <div
        className="
          h-16 w-16
          shrink-0
          overflow-hidden
          rounded-xl
          bg-surface
        "
      >
        {hasMedia ? (
          <img
            src={
              media.thumbnailUrl ||
              media.mediaUrl
            }
            alt="Selected media"
            className="
              h-full w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex h-full
              items-center justify-center
              px-2
              text-center
              text-[10px]
              font-medium
              text-muted-foreground
            "
          >
            No{" "}
            {type === "FEED"
              ? "Post/Reel"
              : "Story"}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-sm font-semibold
          "
        >
          {hasMedia
            ? "Selected Media"
            : label ||
            "Select Media"}
        </p>

        <p
          className="
            mt-1 line-clamp-2
            text-xs leading-5
            text-muted-foreground
          "
        >
          {hasMedia
            ? type === "FEED"
              ? media.caption &&
                media.caption.trim()
                ? media.caption
                : "No caption"
              : "Story selected"
            : type === "FEED"
              ? "Choose a post or reel for automation"
              : "Choose a story for automation"}
        </p>
      </div>
    </button>
  );
}