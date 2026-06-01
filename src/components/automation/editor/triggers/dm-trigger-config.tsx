"use client";

import { KeywordsInput } from "@/components/ui/keywords-input";

export function DmTriggerConfig() {

    return (
        <div className="space-y-2">
            <label
                className="
text-sm font-medium
  text-muted-foreground
"
            >
                Words to watch for
            </label>

            <KeywordsInput />


            <p
                className="
    text-xs
    text-muted-foreground
  "
            >
                Leave empty to trigger on all comments.
            </p>
        </div>
    );
}