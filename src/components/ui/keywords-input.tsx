"use client";

import {
    KeyboardEvent,
    useState,
} from "react";

import { X } from "lucide-react";
import { useAutomationBuilder } from "@/hooks/use-automation-builder";


export function KeywordsInput() {
    const { state, updateBuilder } = useAutomationBuilder()
    const value = state.keywords
    const onChange = (arr: string[]) => {
        updateBuilder({
            keywords: arr
        })
    }
    const [input, setInput] =
        useState("");

    const addKeyword = (
        keyword: string
    ) => {
        const trimmed =
            keyword.trim();

        if (!trimmed) return;

        if (
            value.includes(trimmed)
        )
            return;

        onChange([
            ...value,
            trimmed,
        ]);
    };

    const removeKeyword = (
        keyword: string
    ) => {
        onChange(
            value.filter(
                (item) =>
                    item !== keyword
            )
        );
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "," ||
            e.key === "Enter"
        ) {
            e.preventDefault();

            addKeyword(input);

            setInput("");
        }

        if (
            e.key === "Backspace" &&
            !input &&
            value.length > 0
        ) {
            removeKeyword(
                value[
                value.length - 1
                ]
            );
        }
    };

    return (
        <div
            className="
        flex min-h-[52px]
        flex-wrap items-center
        gap-2
        rounded-xl
        border border-border
        bg-background
        px-3 py-2
        transition-all
        focus-within:border-primary
        focus-within:ring-4
        focus-within:ring-primary/10
      "
        >
            {value.map((keyword) => (
                <div
                    key={keyword}
                    className="
            flex items-center gap-2
            rounded-full
            bg-primary/10
            px-3 py-1.5
            text-sm font-medium
            text-primary
          "
                >
                    <span>{keyword}</span>

                    <button
                        onClick={() =>
                            removeKeyword(
                                keyword
                            )
                        }
                        className="
              rounded-full
              transition-colors
              hover:bg-primary/10
            "
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}

            <input
                value={input}
                onChange={(e) =>
                    setInput(
                        e.target.value
                    )
                }
                onKeyDown={handleKeyDown}
                placeholder="Type and press enter..."
                className="
          h-8 flex-1
          border-none
          bg-transparent
          px-1
          text-sm
          outline-none
          placeholder:text-muted-foreground
        "
            />
        </div>
    );
}