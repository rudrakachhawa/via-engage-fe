"use client";

import { useRouter } from "next/navigation";
import { useAutomations } from "@/hooks/automation.hooks";
import { useMutation } from "@tanstack/react-query";
import { createAutomationApi } from "@/api/automations.api";

function formatDateTime(date: string | number | Date | undefined) {
    if (!date) return "-";
    return new Date(date).toLocaleString();
}

function getStatusLabel(isActive: boolean) {
    return isActive
        ? <span className="px-2 py-1 rounded bg-green-100 text-green-800 border border-green-700 text-xs font-medium">Live</span>
        : <span className="px-2 py-1 rounded bg-gray-200 text-gray-800 border border-gray-400 text-xs font-medium">Inactive</span>
}

export default function AutomationsPage() {
    const router = useRouter();
    const { data, isLoading, isError } = useAutomations();
    const {
        mutate: createAutomation,
        status: createStatus
    } = useMutation({
        mutationFn: createAutomationApi,
        onSuccess: (createdAutomation) => {
            if (createdAutomation && createdAutomation.id) {
                router.push(`/automations/${createdAutomation.id}`);
            }
        }
    });

    const handleCreate = () => {
        createAutomation({});
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Automations</h1>
                <button
                    onClick={handleCreate}
                    disabled={createStatus === "pending"}
                    className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded ${createStatus === "pending" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {createStatus === "pending" ? "Creating..." : "Create Automation"}
                </button>
            </div>
            {isLoading && (
                <div className="text-gray-500 text-center py-10">Loading automations...</div>
            )}
            {isError && (
                <div className="text-red-600 text-center py-10">
                    Failed to load automations. Please try again.
                </div>
            )}
            {!isLoading && !isError && (
                <>
                    {data && data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-zinc-900 rounded shadow text-left">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Name</th>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Description</th>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Status</th>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Trigger</th>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Created At</th>
                                        <th className="px-4 py-2 border-b font-semibold text-zinc-700 dark:text-zinc-200">Updated At</th>
                                        <th className="px-4 py-2 border-b"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((automation: any) => (
                                        <tr key={automation.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                                            <td className="px-4 py-3 border-b font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                                {automation.name}
                                            </td>
                                            <td className="px-4 py-3 border-b text-zinc-600 dark:text-zinc-300 max-w-xs truncate">
                                                {automation.description || "No description"}
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                {getStatusLabel(!!automation.isActive)}
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                <span className="inline-block text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 font-mono">
                                                    {automation.triggerType || "-"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 border-b text-sm text-zinc-700 dark:text-zinc-200">
                                                {formatDateTime(automation.createdAt)}
                                            </td>
                                            <td className="px-4 py-3 border-b text-sm text-zinc-700 dark:text-zinc-200">
                                                {formatDateTime(automation.updatedAt)}
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                <a
                                                    href={`/automations/${automation.id}`}
                                                    className="text-blue-600 hover:underline w-max text-sm"
                                                >
                                                    View Details
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 py-6">
                            No automations found.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}