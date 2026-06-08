"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import React from "react";

// --- UI Atom Components ---

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full overflow-hidden rounded-[38px] border-[10px] border-black bg-white shadow-2xl">
    {children}
  </div>
);

const Divider: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex justify-center">
    <div className="rounded-full bg-primary/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-primary">
      {text}
    </div>
  </div>
);

const IGHeader: React.FC<{ avatar: string; username: string }> = ({
  avatar,
  username,
}) => (
  <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
    <img src={avatar} className="h-10 w-10 rounded-full object-cover" />
    <div>
      <p className="text-sm font-semibold text-black">@{username}</p>
      <p className="text-xs text-neutral-500">Instagram DM</p>
    </div>
  </div>
);

const AutomationBubble: React.FC<{
  avatar: string;
  children: React.ReactNode;
}> = ({ avatar, children }) => (
  <div className="flex items-end gap-2">
    <img src={avatar} className="h-8 w-8 rounded-full object-cover" />
    <div>{children}</div>
  </div>
);

// --- Response Bubble ---

const ResponseBubble: React.FC<{
  avatar: string;
  responseMessage: string;
  responseButtons: Array<{ title?: string }>;
}> = ({ avatar, responseMessage, responseButtons }) => (
  <AutomationBubble avatar={avatar}>
    <div className="max-w-[260px] rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3">
      <div className="whitespace-pre-wrap">
        {responseMessage || "Automation reply"}
      </div>
      {responseButtons && responseButtons.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {responseButtons.map((button, index) =>
            button?.title ? (
              <button
                key={index}
                className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-center text-sm font-medium"
              >
                {button.title}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  </AutomationBubble>
);

// --- Main Preview Card ---

export function MessagePreviewCard() {
  const { state } = useAutomationBuilder();

  // Memoized UI constants for clarity & small optimization
  const mediaPreview =
    state.targetThumbnailUrl || state.targetContentUrl;
  const avatar =
    state.instaAccount?.avatar || "https://i.pravatar.cc/100?img=32";
  const username =
    state.instaAccount?.userName || "rk.devv";
  const triggerMessage =
    state.keywords?.[0] ??
    (state.triggerType === "STORY_REPLY" ? "link please" : "price?");

  const responseMessage = React.useMemo(
    () =>
      state.responseFlow?.[0]?.attachment?.payload?.text
        ?.replaceAll("{first_name}", "Alex")
        ?.replaceAll("{username}", "@alex") || "",
    [state.responseFlow]
  );

  const responseButtons =
    state.responseFlow?.[0]?.attachment?.payload?.buttons || [];

  // --- Conversation Starter Block (for comment flow) ---
  const renderConversationStarter = () =>
    state.conversationStarter?.message ? (
      <AutomationBubble avatar={avatar}>
        <div className="max-w-[260px] rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3">
          <div className="whitespace-pre-wrap">
            {state.conversationStarter?.message}
          </div>
          <div className="mt-3">
            <button className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-center text-sm font-medium">
              {state.conversationStarter?.buttonText}
            </button>
          </div>
        </div>
      </AutomationBubble>
    ) : null;

  const renderConversationReply = () =>
    state.conversationStarter?.buttonText ? (
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">
          {state.conversationStarter?.buttonText}
        </div>
      </div>
    ) : null;

  // --- Convert To Follower Message Bubble (used in both comment and DM preview) ---
  const renderConvertToFollowerBubble = () =>
    state.convertToFollower && state.convertToFollowerMessage ? (
      <AutomationBubble avatar={avatar}>
        <div className="max-w-[260px] rounded-2xl rounded-bl-md bg-neutral-200 px-4 py-3">
          <div className="whitespace-pre-wrap">
            {state.convertToFollowerMessage.message}
          </div>
          {Array.isArray(state.convertToFollowerMessage.buttons) &&
            state.convertToFollowerMessage.buttons.length > 0 && (
              <div className="mt-3 flex flex-col gap-2">
                {state.convertToFollowerMessage.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-center text-sm font-medium"
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            )}
        </div>
      </AutomationBubble>
    ) : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-surface/30 px-6 py-5">
        <h2 className="text-2xl font-semibold">Live Preview</h2>
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
                    <p className="font-semibold text-sm">alex</p>
                    <p className="text-xs text-neutral-500">Viewing Post</p>
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
                      <p className="text-xs font-semibold">alex</p>
                      {triggerMessage}
                    </div>
                  </div>
                  <div className="ml-11 flex gap-3">
                    <img src={avatar} className="h-8 w-8 rounded-full" />
                    <div className="rounded-2xl bg-primary/10 px-4 py-3">
                      <p className="text-xs font-semibold">@{username}</p>
                      {state.commentReplies?.[0] || "Check your DMs 👀"}
                    </div>
                  </div>
                </div>
              </PhoneFrame>
              <Divider text="DM Sent Automatically" />
              <PhoneFrame>
                <IGHeader avatar={avatar} username={username} />
                <div className="space-y-5 bg-[#fafafa] p-4">
                  {renderConversationStarter()}
                  {renderConversationReply()}
                  {renderConvertToFollowerBubble()}
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
                  <ResponseBubble
                    avatar={avatar}
                    responseMessage={responseMessage}
                    responseButtons={responseButtons}
                  />
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
                    <img
                      src={
                        mediaPreview ||
                        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
                      }
                      className="h-40 w-48 rounded-2xl object-cover"
                    />
                    <div className="mt-2 rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white">
                      {triggerMessage}
                    </div>
                  </div>
                </div>
                <ResponseBubble
                  avatar={avatar}
                  responseMessage={responseMessage}
                  responseButtons={responseButtons}
                />
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
                <ResponseBubble
                  avatar={avatar}
                  responseMessage={responseMessage}
                  responseButtons={responseButtons}
                />
              </div>
            </PhoneFrame>
          )}
        </div>
      </div>
    </section>
  );
}