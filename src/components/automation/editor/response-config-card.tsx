"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

export function ResponseConfigCard() {
    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

    return (
        <section
            className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
        shadow-sm
      "
        >
            {/* Header */}

            <div
                className="
          border-b border-border
          bg-surface/30
          px-6 py-5
        "
            >
                <h2
                    className="
            text-2xl font-semibold
            tracking-tight
          "
                >
                    Step 3: What happens next...
                </h2>

                <p
                    className="
            mt-1
            text-sm
            text-muted-foreground
          "
                >
                    Configure what users
                    receive after triggering
                    your automation.
                </p>
            </div>

            <div className="space-y-8 p-6">

                {/* Conversation Starter */}
                {state.triggerType === "COMMENT" && (
                    <div
                        className="
                rounded-2xl
                border border-border
                bg-background
                p-5
              "
                    >
                        <h3
                            className="
                  text-lg
                  font-semibold
                "
                        >
                            Conversation Starter
                        </h3>

                        <p
                            className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
                        >
                            Show users a message and button before the automation continues.
                        </p>

                        <div className="mt-5 space-y-4">

                            {/* Message */}

                            <div>
                                <label
                                    className="
                      mb-2 block
                      text-sm
                      font-medium
                    "
                                >
                                    Starter Message
                                </label>

                                <textarea
                                    value={
                                        state
                                            .conversationStarter
                                            ?.message || ""
                                    }
                                    onChange={(e) =>
                                        updateBuilder({
                                            conversationStarter: {
                                                ...state.conversationStarter,
                                                message: e.target.value,
                                                buttonText: state.conversationStarter?.buttonText ?? "",
                                            },
                                        })

                                    }
                                    placeholder="
                      Example:
                      Choose an option below 👇
                    "
                                    className="
                      min-h-[150px]
                      w-full
                      rounded-xl
                      border border-border
                      bg-card
                      p-4
                      outline-none
                      focus:border-primary
                    "
                                />
                            </div>

                            {/* Button */}

                            <div>
                                <label
                                    className="
                      mb-2 block
                      text-sm
                      font-medium
                    "
                                >
                                    Button Text
                                </label>

                                <input
                                    value={
                                        state
                                            .conversationStarter
                                            ?.buttonText || ""
                                    }
                                    onChange={(e) =>
                                        updateBuilder({
                                            conversationStarter: {
                                                message: state.conversationStarter?.message ?? "",
                                                buttonText: e.target.value,
                                            },
                                        })

                                    }
                                    placeholder="
                      Example:
                      Learn More
                    "
                                    className="
                      h-12
                      w-full
                      rounded-xl
                      border border-border
                      bg-card
                      px-4
                      outline-none
                      focus:border-primary
                    "
                                />
                            </div>

                        </div>
                    </div>
                )}


                {/* Convert To Follower */}

                {state.triggerType ===
                    "COMMENT" && (
                        <div
                            className="
      rounded-2xl
      border border-border
      bg-background
      p-5
    "
                        >
                            {/* Header */}

                            <div
                                className="
        flex items-center
        justify-between
        gap-4
      "
                            >
                                <div>
                                    <h3
                                        className="
              text-lg
              font-semibold
            "
                                    >
                                        Convert To Follower
                                    </h3>

                                    <p
                                        className="
              mt-1
              text-sm
              text-muted-foreground
            "
                                    >
                                        Ask users to follow
                                        before receiving
                                        automation replies.
                                    </p>
                                </div>

                                {/* Toggle */}

                                <button
                                    onClick={() =>
                                        updateBuilder({
                                            convertToFollower:
                                                !state.convertToFollower,
                                        })
                                    }
                                    className={`
          relative
          h-7
          w-12
          rounded-full
          transition-all

          ${state.convertToFollower
                                            ? "bg-primary"
                                            : "bg-border"
                                        }
        `}
                                >
                                    <div
                                        className={`
            absolute top-1
            h-5 w-5
            rounded-full
            bg-white
            transition-all

            ${state.convertToFollower
                                                ? "left-6"
                                                : "left-1"
                                            }
          `}
                                    />
                                </button>
                            </div>

                            {/* Editable Message */}

                            {state.convertToFollower && (
                                <div className="mt-6">

                                    <label
                                        className="
              mb-2 block
              text-sm
              font-medium
            "
                                    >
                                        Follow Message
                                    </label>

                                    <textarea
                                        value={
                                            state
                                                .convertToFollowerMessage
                                                ?.message ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            updateBuilder({
                                                convertToFollowerMessage: {
                                                    ...state.convertToFollowerMessage,
                                                    message: e.target.value,
                                                    buttons:
                                                        state.convertToFollowerMessage?.buttons || []
                                                },
                                            })

                                        }
                                        className="
              min-h-[220px]
              w-full
              rounded-xl
              border border-border
              bg-card
              p-4
              outline-none
              focus:border-primary
            "
                                    />

                                    {/* Buttons Preview */}

                                    <div
                                        className="
              mt-4
              flex gap-3
              flex-wrap
            "
                                    >
                                        {state
                                            .convertToFollowerMessage
                                            ?.buttons?.map(
                                                (
                                                    button,
                                                    index
                                                ) => (
                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="
                    rounded-full
                    border border-border
                    bg-surface
                    px-4 py-2
                    text-sm
                  "
                                                    >
                                                        {
                                                            button.text
                                                        }
                                                    </div>
                                                )
                                            )}
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                {/* DM Response */}

                <div>

                    <h3
                        className="
              mb-3
              text-lg
              font-semibold
            "
                    >
                        Automation Reply
                    </h3>

                    <textarea
                        value={
                            state.messageTemplate || ""
                        }
                        onChange={(e) =>
                            updateBuilder({
                                messageTemplate:
                                    e.target.value,
                            })
                        }
                        placeholder="
              Write your automation response...
            "
                        className="
              min-h-[260px]
              w-full
              resize-none
              rounded-2xl
              border border-border
              bg-background
              p-6
              text-base
              leading-7
              outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
                    />

                </div>

            </div>
        </section>
    );
}