"use client";

import { useState } from "react";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

import { KeywordsInput } from "@/components/ui/keywords-input";

import { MediaPickerModal } from "@/components/media/media-picker-modal";
import { MediaPickerTrigger } from "@/components/media/media-picker-trigger";

interface Props {
    type: "FEED" | "STORY";

    title: string;

    placeholder: string;

    helperText?: string;
}

export function MediaKeywordTriggerConfig({
    type,
    title,
    placeholder,
    helperText,
}: Props) {
    const [open, setOpen] =
        useState(false);

    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

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
                        {title}
                    </label>

                    <MediaPickerTrigger
                        type={type}
                        onClick={() =>
                            setOpen(true)
                        }
                        label={title}
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

                    <KeywordsInput />

                    {helperText && (
                        <p
                            className="
                text-xs
                text-muted-foreground
              "
                        >
                            {helperText}
                        </p>
                    )}
                </div>
            </div>

            <MediaPickerModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                type={type}


            />
        </>
    );
}