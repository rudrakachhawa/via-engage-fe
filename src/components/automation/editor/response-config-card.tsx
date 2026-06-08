"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import type React from "react";

type Button = {
    type: string;
    title: string;
    url: string;
    // Optionally add 'text' to avoid ts error in preview:
    text?: string;
};

type Payload = {
    template_type: string;
    text: string;
    buttons: Button[];
};


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
                            Welcome Message
                        </h3>

                        <p
                            className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
                        >
                            Display a welcome message and button before continuing.
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
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                                        Follow Before Continue
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
                                    type="button"
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
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
                {/* Response Flow */}

                <div>



                    {/* Add Message */}

                    {(!state.responseFlow ||
                        state.responseFlow.length === 0) && (

                            <div className="relative">

                                <details
                                    className="
            overflow-hidden
            rounded-2xl
            border border-dashed
            border-border
            bg-background
          "
                                >

                                    <summary
                                        className="
              cursor-pointer
              list-none
              px-6 py-5
              font-medium
            "
                                    >

                                        + Add Message

                                    </summary>

                                    <div className="border-t border-border p-4 space-y-3">

                                        {/* TEXT */}

                                        <button

                                            onClick={() => {

                                                updateBuilder({

                                                    responseFlow: [

                                                        {

                                                            type: "TEXT",

                                                            attachment: {

                                                                type: "template",

                                                                payload: {

                                                                    template_type: "button",

                                                                    text: "",

                                                                    buttons: []

                                                                }

                                                            }

                                                        }

                                                    ]

                                                });

                                            }}

                                            className="
                flex
                w-full
                flex-col
                rounded-xl
                border border-border
                bg-card
                p-4
                text-left
                transition-colors
                hover:bg-surface
              "
                                            type="button"
                                        >

                                            <span className="font-medium">

                                                Text Message

                                            </span>

                                            <span
                                                className="
                  text-sm
                  text-muted-foreground
                "
                                            >

                                                Send text with optional buttons

                                            </span>

                                        </button>

                                        {/* IMAGE */}

                                        <button
                                            disabled
                                            className="
                flex
                w-full
                flex-col
                rounded-xl
                border border-border
                bg-card
                p-4
                text-left
                opacity-50
              "
                                            type="button"
                                        >

                                            <span className="font-medium">

                                                Image Message

                                            </span>

                                            <span
                                                className="
                  text-sm
                  text-muted-foreground
                "
                                            >

                                                Coming Soon

                                            </span>

                                        </button>

                                        {/* CARD */}

                                        <button
                                            disabled
                                            className="
                flex
                w-full
                flex-col
                rounded-xl
                border border-border
                bg-card
                p-4
                text-left
                opacity-50
              "
                                            type="button"
                                        >

                                            <span className="font-medium">

                                                Card Message

                                            </span>

                                            <span
                                                className="
                  text-sm
                  text-muted-foreground
                "
                                            >

                                                Coming Soon

                                            </span>

                                        </button>

                                    </div>

                                </details>

                            </div>

                        )}

                    {/* Message Block */}

                    {

                        state.responseFlow?.map(
                            (
                                message,
                                index
                            ) => {

                                // Adapt payload.buttons to fit the Button[] type with non-optional url
                                const rawPayload = message.attachment?.payload as
                                    | {
                                        template_type: string;
                                        text: string;
                                        buttons?: {
                                            type: "web_url" | "postback";
                                            url?: string;
                                            payload?: string;
                                            title: string;
                                        }[];
                                    }
                                    | undefined;

                                const payload: Payload | undefined = rawPayload
                                    ? {
                                        template_type: rawPayload.template_type,
                                        text: rawPayload.text,
                                        buttons: (rawPayload.buttons || []).map((b) => ({
                                            type: b.type,
                                            title: b.title,
                                            url: b.url ?? "", // enforce url to be string
                                        })),
                                    }
                                    : undefined;



                                const buttons: Button[] =
                                    payload
                                        ?.buttons || [];

                                return (

                                    <div
                                        key={index}
                                        className="
              rounded-2xl
              border border-border
              bg-background
              p-6
              space-y-6
            "
                                    >

                                        <div>

                                            <h3
                                                className="
                     text-lg
              font-semibold
                "
                                            >

                                                Text Message

                                            </h3>

                                            <p
                                                className="
                  text-sm
                  text-muted-foreground
                "
                                            >

                                                Send text with optional buttons

                                            </p>

                                        </div>

                                        {/* Message */}

                                        <textarea

                                            value={
                                                payload?.text ||
                                                ""
                                            }

                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {

                                                const flow = [
                                                    ...(state.responseFlow || [])
                                                ];

                                                flow[index] = {
                                                    ...message,
                                                    attachment: {
                                                        // Ensure type is always present and is a string
                                                        type: message.attachment?.type ?? "",
                                                        payload: {
                                                            ...payload,
                                                            text: e.target.value,
                                                            // Ensure template_type is always a string
                                                            template_type: payload?.template_type ?? "",
                                                            // Ensure buttons is always an array
                                                            buttons: (payload?.buttons ?? []).filter(
                                                                (btn: any) =>
                                                                    (btn.type === "web_url" || btn.type === "postback")
                                                            ).map((btn: any) => ({
                                                                type: btn.type as "web_url" | "postback",
                                                                title: btn.title,
                                                                url: btn.url,
                                                                payload: btn.payload
                                                            })) as {
                                                                type: "web_url" | "postback";
                                                                url?: string;
                                                                payload?: string;
                                                                title: string;
                                                            }[]
                                                        }
                                                    }
                                                };



                                                updateBuilder({
                                                    responseFlow: flow
                                                });

                                            }}

                                            className="
                min-h-[220px]
                w-full
                rounded-2xl
                border border-border
                bg-card
                p-5
              "
                                        />

                                        {/* Buttons */}

                                        <div className="space-y-4">

                                            <div
                                                className="
                  flex items-center
                  justify-between
                "
                                            >

                                                <p className="font-medium">

                                                    Buttons

                                                </p>

                                                <button

                                                    disabled={
                                                        buttons.length >= 3
                                                    }

                                                    onClick={() => {

                                                        const flow = [
                                                            ...(state.responseFlow || [])
                                                        ];

                                                        // Defensive: make sure the array exists
                                                        if (
                                                            flow[index] &&
                                                            flow[index].attachment &&
                                                            flow[index].attachment.payload &&
                                                            Array.isArray(flow[index].attachment.payload.buttons)
                                                        ) {
                                                            flow[index]
                                                                .attachment
                                                                .payload
                                                                .buttons
                                                                .push({

                                                                    type: "web_url",

                                                                    title: "",

                                                                    url: ""

                                                                });
                                                        }

                                                        updateBuilder({
                                                            responseFlow: flow
                                                        });

                                                    }}

                                                    className="
                    text-sm
                    text-primary
                    disabled:opacity-40
                  "
                                                    type="button"
                                                >

                                                    + Add Button

                                                </button>

                                            </div>

                                            {

                                                buttons.map(
                                                    (
                                                        button,
                                                        buttonIndex
                                                    ) => (

                                                        <div
                                                            key={
                                                                buttonIndex
                                                            }
                                                            className="
                        grid
                        gap-3
                        md:grid-cols-[1fr_1fr_auto]
                      "
                                                        >

                                                            <input

                                                                value={
                                                                    button.title
                                                                }

                                                                placeholder="
Button Title
"

                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                                                    const flow = [
                                                                        ...(state.responseFlow || [])
                                                                    ];

                                                                    if (
                                                                        flow[index] &&
                                                                        flow[index].attachment &&
                                                                        flow[index].attachment.payload &&
                                                                        Array.isArray(flow[index].attachment.payload.buttons)
                                                                    ) {
                                                                        flow[index]
                                                                            .attachment
                                                                            .payload
                                                                            .buttons[
                                                                            buttonIndex
                                                                        ]
                                                                            .title =
                                                                            e.target.value;
                                                                    }

                                                                    updateBuilder({
                                                                        responseFlow: flow
                                                                    });

                                                                }}

                                                                className="
                          h-12
                          rounded-xl
                          border border-border
                          px-4
                        "
                                                            />

                                                            <input

                                                                value={
                                                                    button.url ||
                                                                    ""
                                                                }

                                                                placeholder="
https://...
"

                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                                                    const flow = [
                                                                        ...(state.responseFlow || [])
                                                                    ];

                                                                    if (
                                                                        flow[index] &&
                                                                        flow[index].attachment &&
                                                                        flow[index].attachment.payload &&
                                                                        Array.isArray(flow[index].attachment.payload.buttons)
                                                                    ) {
                                                                        flow[index]
                                                                            .attachment
                                                                            .payload
                                                                            .buttons[
                                                                            buttonIndex
                                                                        ]
                                                                            .url =
                                                                            e.target.value;
                                                                    }

                                                                    updateBuilder({
                                                                        responseFlow: flow
                                                                    });

                                                                }}

                                                                className="
                          h-12
                          rounded-xl
                          border border-border
                          px-4
                        "
                                                            />

                                                            <button

                                                                onClick={() => {

                                                                    const flow = [
                                                                        ...(state.responseFlow || [])
                                                                    ];

                                                                    if (
                                                                        flow[index] &&
                                                                        flow[index].attachment &&
                                                                        flow[index].attachment.payload &&
                                                                        Array.isArray(flow[index].attachment.payload.buttons)
                                                                    ) {
                                                                        flow[index]
                                                                            .attachment
                                                                            .payload
                                                                            .buttons
                                                                            .splice(
                                                                                buttonIndex,
                                                                                1
                                                                            );
                                                                    }

                                                                    updateBuilder({
                                                                        responseFlow: flow
                                                                    });

                                                                }}

                                                                className="
                          text-red-500
                        "
                                                                type="button"
                                                            >

                                                                Remove

                                                            </button>

                                                        </div>

                                                    )
                                                )

                                            }

                                        </div>

                                    </div>

                                )

                            }
                        )

                    }

                </div>
            </div>
        </section>
    );
}