
import { Check } from "lucide-react";

interface MediaCardProps {
    media: any;

    type: "FEED" | "STORY";

    selected?: boolean;

    onSelect?: (
        media: any
    ) => void;
}

export function MediaCard({
    media,
    type,
    selected,
    onSelect,
}: MediaCardProps) {
    return (
        <button
            onClick={() =>
                onSelect?.({
                    targetContentId: media.id,
                    targetContentType: media.type,
                    targetContentUrl: media.permalink,
                    targetThumbnailUrl: media.thumbnailUrl || media.mediaUrl,
                })
            }
            className={`
          group overflow-hidden
          rounded-2xl
          border-2
          bg-card
          text-left
          transition-all
          relative
          ${selected
                    ? `
                border-primary
                ring-4 ring-primary/15
              `
                    : `
                border-transparent
                hover:border-primary/40
              `
                }
        `}
        >
            <div
                className="
            aspect-square
            overflow-hidden
            bg-surface
            relative
          "
            >
                <img
                    src={
                        media.thumbnailUrl ||
                        media.mediaUrl
                    }
                    alt="Instagram media"
                    className="
              h-full w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
                />
                {selected && (
                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            z-10
                            flex
                            items-center
                            justify-center
                            h-6 w-6
                            rounded-full
                            bg-primary
                            text-white
                            shadow-lg
                        "
                        aria-label="Selected"
                    >
                        <Check size={18} />
                    </span>
                )}
            </div>

            <div className="p-3">
                <p
                    className="
              line-clamp-2
              text-xs leading-5
              text-muted-foreground
            "
                >
                    {type === "FEED"
                        ? media.caption ||
                        "No caption"
                        : "Instagram Story"}
                </p>
            </div>
        </button>
    );
}