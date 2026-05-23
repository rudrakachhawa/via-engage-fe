interface InstagramMedia {
    id: string;

    mediaUrl: string;

    thumbnailUrl?: string;

    caption?: string;

    createdAt: string;
}

interface MediaCardProps {
    media: InstagramMedia;

    selected?: boolean;

    onSelect?: (
        media: InstagramMedia
    ) => void;
}

export function MediaCard({
    media,
    selected,
    onSelect,
}: MediaCardProps) {
    return (
        <button
            onClick={() =>
                onSelect?.(media)
            }
            className={`
          group relative
          overflow-hidden
          rounded-2xl
          border-2
          transition-all
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
            </div>

            {selected && (
                <div
                    className="
              absolute right-3 top-3
              flex h-7 w-7
              items-center justify-center
              rounded-full
              bg-primary
              text-sm font-bold
              text-white
              shadow-lg
            "
                >
                    ✓
                </div>
            )}
        </button>
    );
}