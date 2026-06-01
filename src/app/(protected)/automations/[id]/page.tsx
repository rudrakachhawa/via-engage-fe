"use client";

import { useParams } from "next/navigation";


import {
  AutomationBuilderProvider,
  AutomationBuilderState,
} from "@/context/automation-builder-context";

import { AutomationEditorNavbar } from "@/components/automation/automation-editor-navbar";

import { MessagePreviewCard } from "@/components/automation/editor/message-preview-card";
import { ResponseConfigCard } from "@/components/automation/editor/response-config-card";
import { SelectAccountCard } from "@/components/automation/editor/select-account-card";
import { TriggerConfigCard } from "@/components/automation/editor/trigger-config-card";
import { useAutomationById } from "@/hooks/automation.hooks";

function AutomationEditorContent() {
  return (
    <div
      className="
        -mx-6
        lg:-mx-8
      "
    >
      <AutomationEditorNavbar />

      <div
        className="
          mx-auto
          max-w-[1440px]
          px-6 py-8
          lg:px-8
        "
      >
        <div className="space-y-8">
          <SelectAccountCard />

          <TriggerConfigCard />

          <section
            className="
              grid grid-cols-1
              gap-8
              xl:grid-cols-2
            "
          >
            <ResponseConfigCard />

            <MessagePreviewCard />
          </section>
        </div>
      </div>
    </div>
  );
}

export default function AutomationEditorPage() {
  const params = useParams();

  const automationId = params.id as string;

  const { data, status } = useAutomationById(automationId);

  if (status === "pending") {
    return (
      <div
        className="
          flex min-h-[70vh]
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  const initialState: Partial<AutomationBuilderState> = data
    ? {
        id: data.id,

        userId: data.userId,

        igUserId: data.igUserId,

        name: data.name,

        description: data.description,

        messageTemplate: data.messageTemplate,

        triggerType: data.triggerType,

        keywords: data.keywords || [],

        targetContentId: data.targetContentId,

        targetContentType: data.targetContentType,

        targetContentUrl: data.targetContentUrl,

        targetThumbnailUrl: data.targetThumbnailUrl,

        isActive: data.isActive,

        createdAt: data.createdAt,

        updatedAt: data.updatedAt,

        instaAccount: data.instaAccount || null,
        commentReplies: data.commentReplies || [
          "Done! Check your inbox 📬",
          "Just sent it 😊 Check your messages!",
          "Your link is on the way 🚀 Check your DMs",
          "Sent successfully ✨ Go check your inbox!",
          "All set 🙌 Check your messages 📩",
        ],
        conversationStarter: data.conversationStarter || {
          message: `Hey there! 👋

So glad you're here — thanks so much for your interest 😊

Just click below, and I’ll send you the link in a moment!
`,
          buttonText: "Sure, send it!",
        },
        convertToFollower: data.convertToFollower || false,
        convertToFollowerMessage: data.convertToFollowerMessage || {
          message: `Oh no! Looks like you're not following me yet 👀

It would mean a lot if you could visit my profile and hit that follow button 😁

Once you're done, click the "I'm Following" button below and I'll send it right away ✨
`,
          buttons: [
            {
              text: "Visit Profile",
            },
            {
              text: "I'm Following",
            },
          ],
        },
      }
    : {};

  return (
    <AutomationBuilderProvider initialState={initialState}>
      <AutomationEditorContent />
    </AutomationBuilderProvider>
  );
}
