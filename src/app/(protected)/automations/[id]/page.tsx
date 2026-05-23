"use client";

import { useState } from "react";

import { AutomationBuilderProvider } from "@/context/automation-builder-context";

import { AutomationEditorNavbar } from "@/components/automation/automation-editor-navbar";

import { MessagePreviewCard } from "@/components/automation/editor/message-preview-card";
import { ResponseConfigCard } from "@/components/automation/editor/response-config-card";
import { SelectAccountCard } from "@/components/automation/editor/select-account-card";
import { TriggerConfigCard } from "@/components/automation/editor/trigger-config-card";

function AutomationEditorContent() {
    const [isActive, setIsActive] =
        useState(true);

    return (
        <div
            className="
        -mx-6
        lg:-mx-8
      "
        >
            <AutomationEditorNavbar
                isActive={isActive}
                onToggleActive={
                    setIsActive
                }
                onDelete={() => {
                    console.log("delete");
                }}
                onSave={() => {
                    console.log("save");
                }}
            />

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
    return (
        <AutomationBuilderProvider>
            <AutomationEditorContent />
        </AutomationBuilderProvider>
    );
}