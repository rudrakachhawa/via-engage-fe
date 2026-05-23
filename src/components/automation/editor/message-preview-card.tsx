"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

export function MessagePreviewCard() {
    const { state } =
        useAutomationBuilder();

    const previewMessage =
        state.messageTemplate
            ?.replaceAll(
                "{first_name}",
                "Alex"
            )
            .replaceAll(
                "{username}",
                "@alex"
            ) || "";

    const mediaPreview =
        state.targetThumbnailUrl ||
        state.targetContentUrl;

    const triggerMessage =
        state.keywords?.length
            ? state.keywords[0]
            : state.triggerType ===
                "COMMENT"
                ? "price?"
                : state.triggerType ===
                    "STORY_REPLY"
                    ? "link please"
                    : "pricing";

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
                    Live Preview
                </h2>

                <p
                    className="
            mt-1
            text-sm
            text-muted-foreground
          "
                >
                    See how users experience this
                    automation.
                </p>
            </div>

            <div className="p-6">
                <div
                    className="
            mx-auto
            w-full max-w-[360px]
          "
                >
                    {/* COMMENT TRIGGER */}
                    {state.triggerType ===
                        "COMMENT" && (
                            <div
                                className="
                flex flex-col
                items-center
                gap-6
              "
                            >
                                {/* PHONE 1 */}
                                <div
                                    className="
                  w-full
                  overflow-hidden
                  rounded-[38px]
                  border-[10px]
                  border-black
                  bg-white
                  shadow-2xl
                "
                                >
                                    {/* Header */}
                                    <div
                                        className="
                    flex items-center
                    gap-3
                    border-b border-neutral-200
                    px-4 py-3
                  "
                                    >
                                        <img
                                            src="https://i.pravatar.cc/100?img=12"
                                            alt="Alex"
                                            className="
                      h-10 w-10
                      rounded-full
                      object-cover
                    "
                                        />

                                        <div>
                                            <p
                                                className="
                          text-sm
                          font-semibold
                          text-black
                        "
                                            >
                                                alex
                                            </p>

                                            <p
                                                className="
                          text-xs
                          text-neutral-500
                        "
                                            >
                                                Viewing Post
                                            </p>
                                        </div>
                                    </div>

                                    {/* Post */}
                                    <div
                                        className="
                    relative
                    h-56
                    overflow-hidden
                    bg-neutral-100
                  "
                                    >
                                        {mediaPreview ? (
                                            <img
                                                src={
                                                    mediaPreview
                                                }
                                                alt="Trigger content"
                                                className="
                          h-full w-full
                          object-cover
                        "
                                            />
                                        ) : (
                                            <img
                                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
                                                alt="Dummy preview"
                                                className="
                          h-full w-full
                          object-cover
                        "
                                            />
                                        )}
                                    </div>

                                    {/* Comments */}
                                    <div className="space-y-4 p-4">
                                        {/* User Comment */}
                                        <div
                                            className="
                        flex items-start gap-3
                      "
                                        >
                                            <img
                                                src="https://i.pravatar.cc/100?img=12"
                                                alt="Alex"
                                                className="
                          mt-0.5
                          h-8 w-8
                          rounded-full
                          object-cover
                        "
                                            />

                                            <div
                                                className="
                          rounded-2xl
                          rounded-tl-md
                          bg-neutral-100
                          px-4 py-3
                        "
                                            >
                                                <p
                                                    className="
                            text-xs
                            font-semibold
                            text-black
                          "
                                                >
                                                    alex
                                                </p>

                                                <p
                                                    className="
                            mt-1
                            text-sm
                            text-black
                          "
                                                >
                                                    {triggerMessage}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Public Reply */}
                                        <div
                                            className="
                        ml-11
                        flex items-start gap-3
                      "
                                        >
                                            <img
                                                src={
                                                    state
                                                        .instaAccount
                                                        ?.avatar ||
                                                    "https://i.pravatar.cc/100?img=32"
                                                }
                                                alt="Automation"
                                                className="
                          mt-0.5
                          h-8 w-8
                          rounded-full
                          object-cover
                        "
                                            />

                                            <div
                                                className="
                          rounded-2xl
                          rounded-tl-md
                          bg-primary/10
                          px-4 py-3
                        "
                                            >
                                                <p
                                                    className="
                            text-xs
                            font-semibold
                            text-black
                          "
                                                >
                                                    @
                                                    {state
                                                        .instaAccount
                                                        ?.userName ||
                                                        "rk.devv"}
                                                </p>

                                                <p
                                                    className="
                            mt-1
                            text-sm
                            text-black
                          "
                                                >
                                                    {state
                                                        .commentReplies?.[0] ||
                                                        "Check your DMs 👀"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FLOW INDICATOR */}
                                <div
                                    className="
                  rounded-full
                  bg-primary/10
                  px-4 py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-primary
                "
                                >
                                    DM Sent Automatically
                                </div>

                                {/* PHONE 2 */}
                                <div
                                    className="
                  w-full
                  overflow-hidden
                  rounded-[38px]
                  border-[10px]
                  border-black
                  bg-white
                  shadow-2xl
                "
                                >
                                    {/* DM Header */}
                                    <div
                                        className="
                    flex items-center
                    gap-3
                    border-b border-neutral-200
                    px-4 py-3
                  "
                                    >
                                        <div
                                            className="
                      h-10 w-10
                      overflow-hidden
                      rounded-full
                      bg-neutral-200
                    "
                                        >
                                            <img
                                                src={
                                                    state
                                                        .instaAccount
                                                        ?.avatar ||
                                                    "https://i.pravatar.cc/100?img=32"
                                                }
                                                alt="Instagram"
                                                className="
                          h-full w-full
                          object-cover
                        "
                                            />
                                        </div>

                                        <div>
                                            <p
                                                className="
                          text-sm
                          font-semibold
                          text-black
                        "
                                            >
                                                @
                                                {state
                                                    .instaAccount
                                                    ?.userName ||
                                                    "rk.devv"}
                                            </p>

                                            <p
                                                className="
                          text-xs
                          text-neutral-500
                        "
                                            >
                                                Instagram DM
                                            </p>
                                        </div>
                                    </div>

                                    {/* DM Chat */}
                                    <div
                                        className="
                    bg-[#fafafa]
                    p-4
                  "
                                    >
                                        <div
                                            className="
                      flex items-end gap-2
                    "
                                        >
                                            <img
                                                src={
                                                    state
                                                        .instaAccount
                                                        ?.avatar ||
                                                    "https://i.pravatar.cc/100?img=32"
                                                }
                                                alt="Automation"
                                                className="
                          h-8 w-8
                          rounded-full
                          object-cover
                        "
                                            />

                                            <div
                                                className="
                          max-w-[85%]
                          whitespace-pre-wrap
                          rounded-2xl
                          rounded-bl-md
                          bg-neutral-200
                          px-4 py-3
                          text-sm
                          leading-6
                          text-black
                        "
                                            >
                                                {previewMessage ||
                                                    "Your automated response appears here."}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* STORY REPLY */}
                    {state.triggerType ===
                        "STORY_REPLY" && (
                            <div
                                className="
                overflow-hidden
                rounded-[38px]
                border-[10px]
                border-black
                bg-white
                shadow-2xl
              "
                            >
                                {/* Header */}
                                <div
                                    className="
                  flex items-center
                  gap-3
                  border-b border-neutral-200
                  px-4 py-3
                "
                                >
                                    <div
                                        className="
                    h-10 w-10
                    overflow-hidden
                    rounded-full
                    bg-neutral-200
                  "
                                    >
                                        <img
                                            src={
                                                state
                                                    .instaAccount
                                                    ?.avatar ||
                                                "https://i.pravatar.cc/100?img=32"
                                            }
                                            alt="Instagram"
                                            className="
                        h-full w-full
                        object-cover
                      "
                                        />
                                    </div>

                                    <div>
                                        <p
                                            className="
                        text-sm
                        font-semibold
                        text-black
                      "
                                        >
                                            @
                                            {state
                                                .instaAccount
                                                ?.userName ||
                                                "rk.devv"}
                                        </p>

                                        <p
                                            className="
                        text-xs
                        text-neutral-500
                      "
                                        >
                                            Instagram DM
                                        </p>
                                    </div>
                                </div>

                                {/* Chat */}
                                <div
                                    className="
                  space-y-4
                  bg-[#fafafa]
                  p-4
                "
                                >
                                    {/* User Side */}
                                    <div
                                        className="
                    flex justify-end
                  "
                                    >
                                        <div>
                                            {/* Story Preview */}
                                            <div
                                                className="
                        mb-2
                        overflow-hidden
                        rounded-2xl
                        border border-neutral-200
                        bg-white
                      "
                                            >
                                                <div
                                                    className="
                          relative
                          h-40 w-48
                          overflow-hidden
                          bg-neutral-100
                        "
                                                >
                                                    {mediaPreview ? (
                                                        <img
                                                            src={
                                                                mediaPreview
                                                            }
                                                            alt="Trigger content"
                                                            className="
                              h-full w-full
                              object-cover
                            "
                                                        />
                                                    ) : (
                                                        <img
                                                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
                                                            alt="Dummy preview"
                                                            className="
                              h-full w-full
                              object-cover
                            "
                                                        />
                                                    )}

                                                    <div
                                                        className="
                              absolute left-3 top-3
                              rounded-full
                              bg-black/60
                              px-2 py-1
                              text-[10px]
                              font-semibold
                              text-white
                              backdrop-blur
                            "
                                                    >
                                                        STORY
                                                    </div>
                                                </div>
                                            </div>

                                            {/* User Message */}
                                            <div
                                                className="
                        ml-auto
                        max-w-[220px]
                        rounded-2xl
                        rounded-br-md
                        bg-primary
                        px-4 py-3
                        text-sm
                        text-white
                      "
                                            >
                                                {triggerMessage}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Automation Response */}
                                    <div
                                        className="
                    flex items-end gap-2
                  "
                                    >
                                        <img
                                            src={
                                                state
                                                    .instaAccount
                                                    ?.avatar ||
                                                "https://i.pravatar.cc/100?img=32"
                                            }
                                            alt="Automation"
                                            className="
                      h-8 w-8
                      rounded-full
                      object-cover
                    "
                                        />

                                        <div
                                            className="
                      max-w-[85%]
                      whitespace-pre-wrap
                      rounded-2xl
                      rounded-bl-md
                      bg-neutral-200
                      px-4 py-3
                      text-sm
                      leading-6
                      text-black
                    "
                                        >
                                            {previewMessage ||
                                                "Your automated response appears here."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* DM TRIGGER */}
                    {state.triggerType ===
                        "DM" && (
                            <div
                                className="
                overflow-hidden
                rounded-[38px]
                border-[10px]
                border-black
                bg-white
                shadow-2xl
              "
                            >
                                {/* Header */}
                                <div
                                    className="
                  flex items-center
                  gap-3
                  border-b border-neutral-200
                  px-4 py-3
                "
                                >
                                    <div
                                        className="
                    h-10 w-10
                    overflow-hidden
                    rounded-full
                    bg-neutral-200
                  "
                                    >
                                        <img
                                            src={
                                                state
                                                    .instaAccount
                                                    ?.avatar ||
                                                "https://i.pravatar.cc/100?img=32"
                                            }
                                            alt="Instagram"
                                            className="
                        h-full w-full
                        object-cover
                      "
                                        />
                                    </div>

                                    <div>
                                        <p
                                            className="
                        text-sm
                        font-semibold
                        text-black
                      "
                                        >
                                            @
                                            {state
                                                .instaAccount
                                                ?.userName ||
                                                "rk.devv"}
                                        </p>

                                        <p
                                            className="
                        text-xs
                        text-neutral-500
                      "
                                        >
                                            Instagram DM
                                        </p>
                                    </div>
                                </div>

                                {/* Chat */}
                                <div
                                    className="
                  space-y-4
                  bg-[#fafafa]
                  p-4
                "
                                >
                                    {/* User Message */}
                                    <div
                                        className="
                    flex justify-end
                  "
                                    >
                                        <div
                                            className="
                      max-w-[220px]
                      rounded-2xl
                      rounded-br-md
                      bg-primary
                      px-4 py-3
                      text-sm
                      text-white
                    "
                                        >
                                            {triggerMessage}
                                        </div>
                                    </div>

                                    {/* Automation Response */}
                                    <div
                                        className="
                    flex items-end gap-2
                  "
                                    >
                                        <img
                                            src={
                                                state
                                                    .instaAccount
                                                    ?.avatar ||
                                                "https://i.pravatar.cc/100?img=32"
                                            }
                                            alt="Automation"
                                            className="
                      h-8 w-8
                      rounded-full
                      object-cover
                    "
                                        />

                                        <div
                                            className="
                      max-w-[85%]
                      whitespace-pre-wrap
                      rounded-2xl
                      rounded-bl-md
                      bg-neutral-200
                      px-4 py-3
                      text-sm
                      leading-6
                      text-black
                    "
                                        >
                                            {previewMessage ||
                                                "Your automated response appears here."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
}