"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

function PhoneFrame({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full overflow-hidden rounded-[38px] border-[10px] border-black bg-white shadow-2xl">
            {children}
        </div>
    );
}

function Divider({
    text,
}: {
    text: string;
}) {
    return (
        <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-primary">
                {text}
            </div>
        </div>
    );
}

function IGHeader({
    avatar,
    username,
}: {
    avatar: string;
    username: string;
}) {
    return (
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
            <img
                src={avatar}
                className="h-10 w-10 rounded-full object-cover"
            />

            <div>
                <p className="text-sm font-semibold text-black">
                    @{username}
                </p>

                <p className="text-xs text-neutral-500">
                    Instagram DM
                </p>
            </div>
        </div>
    );
}

function AutomationBubble({
    avatar,
    children,
}: {
    avatar: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-end gap-2">

            <img
                src={avatar}
                className="h-8 w-8 rounded-full object-cover"
            />

            <div>{children}</div>

        </div>
    );
}

function ActionButton({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <button className="mt-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm">
            {children}
        </button>
    );
}

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

    const avatar =
        state.instaAccount?.avatar ||
        "https://i.pravatar.cc/100?img=32";

    const username =
        state.instaAccount?.userName ||
        "rk.devv";

    const triggerMessage =
        state.keywords?.[0] ||
        (
            state.triggerType ===
                "STORY_REPLY"
                ? "link please"
                : "price?"
        );

    return (

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

            <div className="border-b border-border bg-surface/30 px-6 py-5">

                <h2 className="text-2xl font-semibold">
                    Live Preview
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    See how users experience this automation.
                </p>

            </div>

            <div className="p-6">

                <div className="mx-auto max-w-[360px] space-y-6">

                    {/* COMMENT */}

                    {state.triggerType === "COMMENT" && (

                        <>

                            <PhoneFrame>

                                <div className="flex items-center gap-3 border-b px-4 py-3">

                                    <img
                                        src="https://i.pravatar.cc/100?img=12"
                                        className="h-10 w-10 rounded-full"
                                    />

                                    <div>

                                        <p className="font-semibold text-sm">
                                            alex
                                        </p>

                                        <p className="text-xs text-neutral-500">
                                            Viewing Post
                                        </p>

                                    </div>

                                </div>

                                <div className="h-56">

                                    <img
                                        src={
                                            mediaPreview ||
                                            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
                                        }
                                        className="h-full w-full object-cover"
                                    />

                                </div>

                                <div className="space-y-4 p-4">

                                    <div className="flex gap-3">

                                        <img
                                            src="https://i.pravatar.cc/100?img=12"
                                            className="h-8 w-8 rounded-full"
                                        />

                                        <div className="rounded-2xl bg-neutral-100 px-4 py-3">

                                            <p className="text-xs font-semibold">
                                                alex
                                            </p>

                                            {triggerMessage}

                                        </div>

                                    </div>

                                    <div className="ml-11 flex gap-3">

                                        <img
                                            src={avatar}
                                            className="h-8 w-8 rounded-full"
                                        />

                                        <div className="rounded-2xl bg-primary/10 px-4 py-3">

                                            <p className="text-xs font-semibold">

                                                @{username}

                                            </p>

                                            {
                                                state.commentReplies?.[0] ||
                                                "Check your DMs 👀"
                                            }

                                        </div>

                                    </div>

                                </div>

                            </PhoneFrame>

                            <Divider text="DM Sent Automatically" />

                            <PhoneFrame>

                                <IGHeader avatar={avatar} username={username} />

                                <div className="space-y-5 bg-[#fafafa] p-4">

                                    <AutomationBubble avatar={avatar}>

                                        <div>

                                            <div className="rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3 whitespace-pre-wrap">

                                                {
                                                    state.conversationStarter?.message
                                                }

                                            </div>

                                            <ActionButton>

                                                {
                                                    state.conversationStarter?.buttonText
                                                }

                                            </ActionButton>

                                        </div>

                                    </AutomationBubble>

                                    <div className="flex justify-end">

                                        <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">

                                            {
                                                state.conversationStarter?.buttonText
                                            }

                                        </div>

                                    </div>

                                    {state.convertToFollower && (

                                        <AutomationBubble avatar={avatar}>

                                            <div>

                                                <div className="rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3 whitespace-pre-wrap">

                                                    {
                                                        state.convertToFollowerMessage?.message
                                                    }

                                                </div>

                                                <div className="mt-2 flex flex-wrap gap-2">

                                                    {
                                                        state.convertToFollowerMessage?.buttons?.map(
                                                            (btn, i) => (
                                                                <ActionButton key={i}>
                                                                    {btn.text}
                                                                </ActionButton>
                                                            )
                                                        )
                                                    }

                                                </div>

                                            </div>

                                        </AutomationBubble>

                                    )}

                                </div>

                            </PhoneFrame>

                            <Divider
                                text={
                                    state.convertToFollower
                                        ? "User visited profile and followed you"
                                        : "User has received your message"
                                }
                            />

                            <PhoneFrame>

                                <IGHeader avatar={avatar} username={username} />

                                <div className="space-y-4 bg-[#fafafa] p-4">

                                    {state.convertToFollower && (

                                        <div className="flex justify-end">

                                            <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">

                                                I'm Following

                                            </div>

                                        </div>

                                    )}

                                    <AutomationBubble avatar={avatar}>

                                        <div className="rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3 whitespace-pre-wrap">

                                            {
                                                previewMessage ||
                                                "Automation reply"
                                            }

                                        </div>

                                    </AutomationBubble>

                                </div>

                            </PhoneFrame>

                        </>

                    )}

                    {/* STORY */}

                    {state.triggerType === "STORY_REPLY" && (

                        <PhoneFrame>

                            <IGHeader avatar={avatar} username={username} />

                            <div className="space-y-4 bg-[#fafafa] p-4">

                                <div className="flex justify-end">

                                    <div>

                                        <div className="mb-2 overflow-hidden rounded-2xl border">

                                            <img
                                                src={
                                                    mediaPreview ||
                                                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
                                                }
                                                className="h-40 w-48 object-cover"
                                            />

                                        </div>

                                        <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">

                                            {triggerMessage}

                                        </div>

                                    </div>

                                </div>

                                <AutomationBubble avatar={avatar}>

                                    <div className="rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3 whitespace-pre-wrap">

                                        {
                                            previewMessage ||
                                            "Automation reply"
                                        }

                                    </div>

                                </AutomationBubble>

                            </div>

                        </PhoneFrame>

                    )}

                    {/* DM */}

                    {state.triggerType === "DM" && (

                        <PhoneFrame>

                            <IGHeader avatar={avatar} username={username} />

                            <div className="space-y-4 bg-[#fafafa] p-4">

                                <div className="flex justify-end">

                                    <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">

                                        {triggerMessage}

                                    </div>

                                </div>

                                <AutomationBubble avatar={avatar}>

                                    <div className="rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3 whitespace-pre-wrap">

                                        {
                                            previewMessage ||
                                            "Automation reply"
                                        }

                                    </div>

                                </AutomationBubble>

                            </div>

                        </PhoneFrame>

                    )}

                </div>

            </div>

        </section>

    );
}