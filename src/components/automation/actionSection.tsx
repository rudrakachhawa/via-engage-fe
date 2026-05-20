import React, { useState, useEffect } from "react";

interface ActionSectionProps {
    automation: any;
    updateAutomationData?: (key: string, value: any) => void;
}

export default function ActionSection({ automation, updateAutomationData }: ActionSectionProps) {
    const [messageTemplate, setMessageTemplate] = useState<string>(automation?.messageTemplate ?? "");

    useEffect(() => {
        setMessageTemplate(automation?.messageTemplate ?? "");
    }, [automation?.messageTemplate]);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMessageTemplate(value);
        if (updateAutomationData) {
            updateAutomationData("messageTemplate", value);
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Response to Trigger
            </h2>
            <div className="flex flex-col gap-3">
                <label htmlFor="message-template" className="text-zinc-700 dark:text-zinc-300 mb-1">
                    Message to send in DM:
                </label>
                <textarea
                    id="message-template"
                    className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 dark:text-zinc-100"
                    rows={4}
                    value={messageTemplate}
                    onChange={handleTemplateChange}
                    placeholder="Enter a message to send automatically to users..."
                />
            </div>
        </div>
    );
}