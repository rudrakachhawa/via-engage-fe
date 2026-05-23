"use client";

import { useState } from "react";

import {
    History,
    MessageCircle,
    MessageSquare,
} from "lucide-react";

import { EditorCard } from "./editor-card";

import { CommentsTriggerConfig } from "./triggers/comments-trigger-config";
import { DmTriggerConfig } from "./triggers/dm-trigger-config";
import { StoryTriggerConfig } from "./triggers/story-trigger-config";

type TriggerType =
    | "COMMENT"
    | "DM"
    | "STORY_REPLY";

const triggerTabs = [
    {
        type: "COMMENT" as const,
        label: "Comments",
        icon: MessageCircle,
    },

    {
        type: "DM" as const,
        label: "Direct Messages",
        icon: MessageSquare,
    },

    {
        type: "STORY_REPLY" as const,
        label: "Story Replies",
        icon: History,
    },
];

export function TriggerConfigCard() {
    const [triggerType, setTriggerType] =
        useState<TriggerType>(
            "COMMENT"
        );

    return (
        <EditorCard
            title="
        Step 2: When this happens...
      "
            description="
        Choose what starts this automation.
      "
        >
            <div className="space-y-8">
                <div
                    className="
            flex gap-8
            overflow-x-auto
            border-b border-border
          "
                >
                    {triggerTabs.map((tab) => {
                        const Icon = tab.icon;

                        const isActive =
                            triggerType ===
                            tab.type;

                        return (
                            <button
                                key={tab.type}
                                onClick={() =>
                                    setTriggerType(
                                        tab.type
                                    )
                                }
                                className={`
                  flex items-center gap-2
                  border-b-2 pb-4
                  text-sm font-semibold
                  whitespace-nowrap
                  transition-colors
                  ${isActive
                                        ? `
                        border-primary
                        text-primary
                      `
                                        : `
                        border-transparent
                        text-muted-foreground
                        hover:text-foreground
                      `
                                    }
                `}
                            >
                                <Icon
                                    className="
                    h-4 w-4
                  "
                                />

                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {triggerType ===
                    "COMMENT" && (
                        <CommentsTriggerConfig />
                    )}

                {triggerType === "DM" && (
                    <DmTriggerConfig />
                )}

                {triggerType ===
                    "STORY_REPLY" && (
                        <StoryTriggerConfig />
                    )}
            </div>
        </EditorCard>
    );
}