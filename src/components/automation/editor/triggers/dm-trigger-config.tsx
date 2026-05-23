"use client";

import { useState } from "react";

import { KeywordsInput } from "@/components/ui/keywords-input";

export function DmTriggerConfig() {
    const [keywords, setKeywords] =
        useState([
            "coupon",
            "help",
        ]);

    return (
        <div className="space-y-6">
            <div
                className="
          flex items-center
          justify-between
          rounded-2xl
          border border-border
          bg-surface/40
          p-5
        "
            >
                <div>
                    <p
                        className="
              text-sm font-semibold
            "
                    >
                        Trigger for Any Keyword
                    </p>

                    <p
                        className="
              mt-1 text-sm
              text-muted-foreground
            "
                    >
                        Respond to every new direct
                        message received.
                    </p>
                </div>

                <button
                    className="
            relative h-6 w-11
            rounded-full
            bg-primary
          "
                >
                    <div
                        className="
              absolute right-0.5 top-0.5
              h-5 w-5
              rounded-full
              bg-white
            "
                    />
                </button>
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
            coupon, support, pricing...
          "
                />
            </div>
        </div>
    );
}