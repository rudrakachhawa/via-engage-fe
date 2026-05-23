"use client";

import { useState } from "react";

import { KeywordsInput } from "@/components/ui/keywords-input";

import { MediaPickerModal } from "@/components/media/media-picker-modal";
import { MediaPickerTrigger } from "@/components/media/media-picker-trigger";

export function StoryTriggerConfig() {
    const [keywords, setKeywords] =
        useState([
            "wow",
            "deal",
        ]);

    const [selectedMedia, setSelectedMedia] =
        useState<any>(null);

    const [open, setOpen] =
        useState(false);

    return (
        <>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label
                        className="
              text-sm
              text-muted-foreground
            "
                    >
                        Select Story
                    </label>

                    <MediaPickerTrigger
                        media={selectedMedia}
                        onClick={() =>
                            setOpen(true)
                        }
                        label="
              Browse Stories
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
              wow, fire, link...
            "
                    />
                </div>
            </div>

            <MediaPickerModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                type="STORY"
                igUserId="123"
                selectedMediaId={
                    selectedMedia?.id
                }
                onSelect={setSelectedMedia}
            />
        </>
    );
}