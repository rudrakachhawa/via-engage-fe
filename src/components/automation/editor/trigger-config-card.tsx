"use client";

import {
    History,
    MessageCircle,
    MessageSquare,
} from "lucide-react";

import { EditorCard } from "./editor-card";

import { CommentsTriggerConfig } from "./triggers/comments-trigger-config";
import { DmTriggerConfig } from "./triggers/dm-trigger-config";
import { StoryTriggerConfig } from "./triggers/story-trigger-config";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

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
    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

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
                            state.triggerType ===
                            tab.type;

                        return (
                            <button
                                key={tab.type}
                                onClick={() =>
                                    updateBuilder({
                                        triggerType:
                                            tab.type,

                                        targetContentId:
                                            null,

                                        targetContentType:
                                            null,

                                        targetContentUrl:
                                            null,

                                        targetThumbnailUrl:
                                            null,
                                        keywords: []
                                    })
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

                {state.triggerType ===
                    "COMMENT" && (
                        <CommentsTriggerConfig />
                    )}

                {state.triggerType === "DM" && (
                    <DmTriggerConfig />
                )}

                {state.triggerType ===
                    "STORY_REPLY" && (
                        <StoryTriggerConfig />
                    )}
            </div>
        </EditorCard>
    );
}