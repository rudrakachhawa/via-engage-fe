"use client";

import { useAutomationById } from "@/hooks/automation.hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    toggleAutomationApi,
    deleteAutomationApi,
    updateAutomationApi
} from "@/api/automations.api";
import { useMutation } from "@tanstack/react-query";
import TriggerSection from "@/components/automation/triggerSection";
import ActionSection from "@/components/automation/actionSection";
import { InstagramAccountsDropdown } from "@/components/auth/instagram-accounts-dropdown";

export default function AutomationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = typeof params?.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const { data: automation, isLoading, error, refetch } = useAutomationById(id);
    const [data, setData] = useState(automation);

    useEffect(() => {
        if (automation) {
            setData(automation);
        }
    }, [automation]);

    const [actionError, setActionError] = useState<string | null>(null);

    const toggleMutation = useMutation({
        mutationFn: () => toggleAutomationApi(id),
        onSuccess: async () => {
            await refetch();
        },
        onError: (e: any) => {
            setActionError(e?.message || 'Failed to toggle live state');
        }
    });

    const saveMutation = useMutation({
        mutationFn: () => data ? updateAutomationApi(id, { ...data }) : Promise.resolve(),
        onSuccess: async () => {
            await refetch();
        },
        onError: (e: any) => {
            setActionError(e?.message || 'Failed to save automation');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteAutomationApi(id),
        onSuccess: () => {
            router.push("/automations");
        },
        onError: (e: any) => {
            setActionError(e?.message || 'Failed to delete automation');
        }
    });

    // use status property ("idle" | "pending" | "success" | "error") for mutation states
    const togglePending = toggleMutation.status === "pending";
    const savePending = saveMutation.status === "pending";
    const deletePending = deleteMutation.status === "pending";

    if (isLoading) {
        return (
            <div className="p-8 text-center text-gray-600 dark:text-gray-300">
                Loading automation details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                Error: {error.toString()}
            </div>
        );
    }

    if (!automation) {
        return (
            <div className="p-8 text-center text-gray-500">
                Automation not found.
            </div>
        );
    }

    const updateAutomationData = (key: string, value: any) => {
        setData((prev: any) => ({ ...prev, [key]: value }));
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-zinc-900 rounded-lg shadow px-8 py-6">
            {/* Back Button */}
            <button
                className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => router.push("/automations")}
                type="button"
            >
                {/* Simple left arrow SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Automations
            </button>
            {/* Heading and action buttons aligned in a row, spaced evenly */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Automation Detail
                </h1>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md font-semibold ${automation.isActive
                            ? "bg-green-100 text-green-800 border border-green-700"
                            : "bg-gray-100 text-gray-700 border border-gray-400"
                            } ${togglePending ? "opacity-70 cursor-wait" : ""}`}
                        onClick={() => {
                            setActionError(null);
                            toggleMutation.mutate();
                        }}
                        disabled={togglePending}
                    >
                        {automation.isActive ? (togglePending ? "Deactivating..." : "Live") : (togglePending ? "Activating..." : "Go Live")}
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md font-semibold bg-blue-600 text-white ${savePending ? "opacity-70 cursor-wait" : "hover:bg-blue-700"
                            }`}
                        onClick={() => {
                            setActionError(null);
                            saveMutation.mutate();
                        }}
                        disabled={savePending}
                    >
                        {savePending ? "Saving..." : "Save"}
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md font-semibold ${automation.isActive
                            ? "bg-gray-300 text-gray-500 border border-gray-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                            } ${deletePending ? "opacity-70 cursor-wait" : ""}`}
                        onClick={() => {
                            if (!automation.isActive) {
                                setActionError(null);
                                deleteMutation.mutate();
                            }
                        }}
                        disabled={automation.isActive || deletePending}
                        title={automation.isActive ? "Can't delete while automation is live" : "Delete this automation"}
                    >
                        {deletePending ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

            {actionError && (
                <div className="mb-4 text-red-500 text-center">{actionError}</div>
            )}
            <InstagramAccountsDropdown igUserId={automation?.igUserId} onSelect={(igUserId: string) => {
                updateAutomationData('igUserId', igUserId)
                saveMutation.mutate();
            }} />
            {/* Editable Name and Description */}
            <div className="mb-6">
                <div className="mb-4">
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-1" htmlFor="automationName">
                        Name:
                    </label>
                    <input
                        id="automationName"
                        type="text"
                        value={data?.name ?? ""}
                        onChange={e => updateAutomationData("name", e.target.value)}
                        className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter automation name"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-1" htmlFor="automationDescription">
                        Description:
                    </label>
                    <textarea
                        id="automationDescription"
                        value={data?.description ?? ""}
                        onChange={e => updateAutomationData("description", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter description (optional)"
                    />
                </div>
            </div>

            <div className="border border-zinc-300 dark:border-zinc-700 rounded-md p-4 mb-6 bg-white dark:bg-zinc-900/70 shadow-sm">
                <TriggerSection automation={data} updateAutomationData={updateAutomationData} />
            </div>

            <div className="border border-zinc-300 dark:border-zinc-700 rounded-md p-4 mb-6 bg-white dark:bg-zinc-900/70 shadow-sm">
                <ActionSection automation={data} updateAutomationData={updateAutomationData} />
            </div>

            <div className="mb-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">Created At:</span>
                <span className="ml-2 text-zinc-800 dark:text-zinc-100">{new Date(automation.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">Updated At:</span>
                <span className="ml-2 text-zinc-800 dark:text-zinc-100">{new Date(automation.updatedAt).toLocaleString()}</span>
            </div>
        </div>
    );
}