import React, { useState } from "react";
import { MediaPicker } from "./userMediaPicker";

type TriggerType = "COMMENT" | "DM" | "LIVE_COMMENT" | "STORY_REPLY" | "MENTION";

const TRIGGER_OPTIONS: { type: TriggerType; label: string }[] = [
    { type: "COMMENT", label: "User Comments on your post or reel" },
    { type: "DM", label: "User DMs to you" },
    // { type: "LIVE_COMMENT", label: "User Comments on your LIVE" },
    { type: "STORY_REPLY", label: "User replies to your stories" },
    // { type: "MENTION", label: "User Mentions you in a story" }, // Mention excluded per UI requests
];

interface TriggerSectionProps {
    automation: any;
    updateAutomationData?: (key: string, value: any) => void;
}

function parseKeywords(input: string): string[] {
    return input
        .split(",")
        .map((kw: string) => kw.trim())
        .filter((kw: string) => kw.length > 0);
}

export default function TriggerSection({ automation, updateAutomationData }: TriggerSectionProps) {
    const [replyInput, setReplyInput] = useState<string>("");
    const selectedTrigger: TriggerType | undefined = automation?.triggerType as TriggerType | undefined;

    const replies: string[] = Array.isArray(automation?.replies)
        ? automation?.replies?.map((item: any) => (item?.message || item))
        : [];
    // console.log(replies)
    const targetContentId: string = automation?.targetContentId ?? "";

    // Handlers for per-field updates
    const handleTriggerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as TriggerType;
        if (updateAutomationData) {
            updateAutomationData("triggerType", newType);
            // Clear trigger fields on change
            updateAutomationData("keywords", []);
            updateAutomationData("replies", []);
            updateAutomationData("targetContentId", "");
        }
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const keywordsArr = parseKeywords(val);
        updateAutomationData?.("keywords", keywordsArr);
    };

    const handleTargetContentIdChange = ({
        targetContentId,
        targetContentType,
        targetContentUrl,
        targetThumbnailUrl
    }: {
        targetContentId: string;
        targetContentType: string;
        targetContentUrl: string;
        targetThumbnailUrl: string;
    }) => {
        updateAutomationData?.("targetContentId", targetContentId);
        updateAutomationData?.("targetContentType", targetContentType);
        updateAutomationData?.("targetContentUrl", targetContentUrl);
        updateAutomationData?.("targetThumbnailUrl", targetThumbnailUrl);
    };

    const handleReplyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplyInput(e.target.value);
    };

    const handleAddReply = () => {
        if (replyInput.trim() && replies.length < 10) {
            const newReplies = [...replies, replyInput.trim()];
            updateAutomationData?.("replies", newReplies);
            setReplyInput("");
        }
    };

    const handleRemoveReply = (idx: number) => {
        const newReplies = replies.filter((_: string, i: number) => i !== idx);
        updateAutomationData?.("replies", newReplies);
    };

    function renderTriggerFields() {
        // Prompt override for keyword input everywhere
        const keywordLabel = (
            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Enter comma separated keywords (e.g., offer, discount, hello)
            </label>
        );
        const keywordInput = (
            <input
                key={selectedTrigger}
                type="text"
                className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white dark:bg-zinc-900 dark:text-zinc-100"
                defaultValue={
                    Array.isArray(automation?.keywords)
                        ? automation?.keywords.join(", ")
                        : typeof automation?.keywords === "string"
                            ? automation?.keywords
                            : ""
                }
                onChange={handleKeywordChange}
                placeholder="offer, discount, hello"
            />
        );

        switch (selectedTrigger) {
            case "COMMENT":
                return (
                    <div className="mt-4 flex flex-col gap-4">
                        <MediaPicker
                            triggerType={selectedTrigger}
                            targetContentId={targetContentId}
                            onChange={handleTargetContentIdChange}
                        />
                        <div>
                            {keywordLabel}
                            {keywordInput}
                        </div>
                        <div>
                            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                What do you want to reply to those comments?
                                <span className="text-xs text-gray-500 ml-2">(Enter 5-10 replies to send randomly)</span>
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={replyInput}
                                    onChange={handleReplyInputChange}
                                    placeholder="Type reply and press Add"
                                    className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-white dark:bg-zinc-900 dark:text-zinc-100"
                                    maxLength={300}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddReply}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-40"
                                    disabled={
                                        !replyInput.trim() ||
                                        replies.length >= 10
                                    }
                                >
                                    Add
                                </button>
                            </div>
                            <ul>
                                {replies.map((reply: string, idx: number) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-2 mt-1 bg-zinc-50 dark:bg-zinc-800 rounded px-2 py-1"
                                    >
                                        <span className="flex-1">{reply}</span>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 text-xs"
                                            onClick={() => handleRemoveReply(idx)}
                                            title="Remove reply"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {replies.length < 3 && (
                                <p className="text-xs text-yellow-500 mt-1">
                                    Please add at least 3 replies.
                                </p>
                            )}
                            {replies.length > 10 && (
                                <p className="text-xs text-red-500 mt-1">
                                    Maximum 10 replies allowed.
                                </p>
                            )}
                        </div>
                    </div>
                );
            case "DM":
                return (
                    <div className="mt-4 flex flex-col gap-4">
                        {keywordLabel}
                        {keywordInput}
                    </div>
                );
            case "LIVE_COMMENT":
                return (
                    <div className="mt-4 flex flex-col gap-4">
                        <MediaPicker
                            triggerType={selectedTrigger}
                            targetContentId={targetContentId}
                            onChange={handleTargetContentIdChange}
                        />
                        <div>
                            {keywordLabel}
                            {keywordInput}
                        </div>
                    </div>
                );
            case "STORY_REPLY":
                return (
                    <div className="mt-4 flex flex-col gap-4">
                        <MediaPicker
                            triggerType={selectedTrigger}
                            targetContentId={targetContentId}
                            onChange={handleTargetContentIdChange}
                        />
                        <div>
                            {keywordLabel}
                            {keywordInput}
                        </div>
                    </div>
                );
            // No UI for 'MENTION' per instruction
            default:
                return null;
        }
    }

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Trigger
            </h2>
            <div className="flex items-center gap-3">
                <label htmlFor="triggerType" className="text-zinc-700 dark:text-zinc-300">
                    {selectedTrigger ? "Current trigger:" : "Choose a trigger:"}
                </label>
                <select
                    id="triggerType"
                    value={selectedTrigger || ""}
                    onChange={handleTriggerTypeChange}
                    className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 dark:text-zinc-100"
                >
                    <option value="" disabled>
                        Select Trigger
                    </option>
                    {TRIGGER_OPTIONS.map(option => (
                        <option key={option.type} value={option.type}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {renderTriggerFields()}
        </div>
    );
}