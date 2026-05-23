"use client";

import { useState } from "react";

import { KeywordsInput } from "@/components/ui/keywords-input";

import { MediaPickerModal } from "@/components/media/media-picker-modal";
import { MediaPickerTrigger } from "@/components/media/media-picker-trigger";

export function CommentsTriggerConfig() {
    const [keywords, setKeywords] =
        useState([
            "sale",
            "price",
        ]);

    const [selectedMedia, setSelectedMedia] =
        useState<any>(null);

    const [open, setOpen] =
        useState(false);

    return (
        <>
            <div
                className="
          grid grid-cols-1
          gap-6
          lg:grid-cols-2
        "
            >
                <div className="space-y-2">
                    <label
                        className="
              text-sm
              text-muted-foreground
            "
                    >
                        Select Post / Reel
                    </label>

                    <MediaPickerTrigger
                        media={selectedMedia}
                        onClick={() =>
                            setOpen(true)
                        }
                        label="
              Select Post / Reel
            "
                    />
                </div>

                <div className="space-y-2">
                    <label
                        className="
              text-sm
              text-muted-foreground
            "
                    >
                        Words to watch for
                    </label>

                    <KeywordsInput
                        value={keywords}
                        onChange={setKeywords}
                        placeholder="
              Type and press enter...
            "
                    />

                    <p
                        className="
              text-xs
              text-muted-foreground
            "
                    >
                        Leave empty to trigger on all
                        comments.
                    </p>
                </div>
            </div>

            <MediaPickerModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                type="FEED"
                igUserId="123"
                selectedMediaId={
                    selectedMedia?.id
                }
                onSelect={setSelectedMedia}
            />
        </>
    );
}