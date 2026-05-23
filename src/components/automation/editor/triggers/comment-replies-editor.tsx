"use client";

import {
    CirclePlus,
    Trash2,
} from "lucide-react";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

const MAX_REPLIES = 5;

export function CommentRepliesEditor() {
    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

    const replies =
        state.commentReplies || [];
    console.log(replies)
    function updateReply(
        index: number,
        value: string
    ) {
        const updated = [
            ...replies,
        ];

        updated[index] = value;

        updateBuilder({
            commentReplies:
                updated,
        });
    }

    function addReply() {
        if (
            replies.length >=
            MAX_REPLIES
        )
            return;

        updateBuilder({
            commentReplies: [
                ...replies,
                "",
            ],
        });
    }

    function removeReply(
        index: number
    ) {
        updateBuilder({
            commentReplies:
                replies.filter(
                    (_, i) =>
                        i !== index
                ),
        });
    }

    return (
        <div className="space-y-3">
            <div
                className="
          flex items-center
          justify-between
        "
            >
                <div>
                    <p
                        className="
              text-sm font-medium
            "
                    >
                        Public replies to comments
                    </p>

                    <p
                        className="
              text-xs
              text-muted-foreground
            "
                    >
                        Random replies help make
                        automations feel natural.
                    </p>
                </div>

                <p
                    className="
            text-xs font-semibold
            text-primary
          "
                >
                    {replies.length} /{" "}
                    {MAX_REPLIES} Active
                </p>
            </div>

            <div className="space-y-3">
                {replies.map(
                    (
                        reply,
                        index
                    ) => (
                        <div
                            key={index}
                            className="
                flex items-center
                gap-3
              "
                        >
                            <input
                                value={reply}
                                onChange={(e) =>
                                    updateReply(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder="
                  Type a reply...
                "
                                className="
                  h-12 flex-1
                  rounded-xl
                  border border-border
                  bg-background
                  px-4
                  text-sm
                  outline-none
                  transition-colors
                  focus:border-primary
                "
                            />

                            <button
                                onClick={() =>
                                    removeReply(
                                        index
                                    )
                                }
                                className="
                  flex h-10 w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-red-500
                  transition-colors
                  hover:bg-red-50
                "
                            >
                                <Trash2
                                    className="
                    h-4 w-4
                  "
                                />
                            </button>
                        </div>
                    )
                )}
            </div>

            {replies.length <
                MAX_REPLIES && (
                    <button
                        onClick={addReply}
                        className="
            flex h-12 w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border border-dashed
            border-border
            text-sm font-medium
            text-muted-foreground
            transition-colors
            hover:border-primary
            hover:text-primary
          "
                    >
                        <CirclePlus
                            className="
              h-4 w-4
            "
                        />

                        Add another reply
                    </button>
                )}
        </div>
    );
}