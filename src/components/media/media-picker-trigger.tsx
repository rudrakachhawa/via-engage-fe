interface MediaPickerTriggerProps {
    media?: any;
  
    onClick: () => void;
  
    label?: string;
  }
  
  export function MediaPickerTrigger({
    media,
    onClick,
    label,
  }: MediaPickerTriggerProps) {
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
            h-14 w-14
            shrink-0
            overflow-hidden
            rounded-lg
            bg-surface
          "
        >
          {media ? (
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
                text-xs
                text-muted-foreground
              "
            >
              No Media
            </div>
          )}
        </div>
  
        <div className="min-w-0 flex-1">
          <p
            className="
              text-sm font-semibold
            "
          >
            {media
              ? "Selected Media"
              : label ||
                "Select Media"}
          </p>
  
          <p
            className="
              mt-1 truncate
              text-xs
              text-muted-foreground
            "
          >
            {media?.caption ||
              "Choose media for this trigger"}
          </p>
        </div>
      </button>
    );
  }