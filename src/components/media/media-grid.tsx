import { MediaCard } from "./media-card";

interface MediaGridProps {
    media: any[];

    selectedMediaId?: string;

    onSelect?: (
        media: any
    ) => void;
}

export function MediaGrid({
    media,
    selectedMediaId,
    onSelect,
}: MediaGridProps) {
    return (
        <div
            className="
        grid grid-cols-2
        gap-4
        md:grid-cols-3
        lg:grid-cols-4
      "
        >
            {media.map((item) => (
                <MediaCard
                    key={item.id}
                    media={item}
                    selected={
                        selectedMediaId ===
                        item.id
                    }
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}