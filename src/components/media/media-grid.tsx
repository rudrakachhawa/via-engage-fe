"use client"
import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import { MediaCard } from "./media-card";

interface MediaGridProps {
    type: "FEED" | "STORY";

    media: any[];
    onSelect?: (data: any
    ) => void;
}

export function MediaGrid({
    type,
    media,
    onSelect
}: MediaGridProps) {
    const selectedMediaId = useAutomationBuilder().state.targetContentId

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
                    type={type}
                    selected={item.id == selectedMediaId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}