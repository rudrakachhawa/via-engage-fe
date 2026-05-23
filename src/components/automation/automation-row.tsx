import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { AutomationStatusBadge } from "./automation-status-badge";
import { TriggerBadge } from "./trigger-badge";

interface AutomationRowProps {
    automation: {
        id?: string; // Assume id is provided; required for navigation
        instaAccount?: {
            userName?: string;
            name?: string;
            avatar?: string;
        };

        name?: string;
        description?: string;
        triggerType?:
        | "COMMENT"
        | "DM"
        | "STORY_REPLY";

        isActive?: boolean;

        createdAt?: string;
    };
}

export function AutomationRow({
    automation,
}: AutomationRowProps) {
    const router = useRouter();

    if (!automation) {
        // Safety: Don't render row if automation is missing
        return null;
    }
    const {
        id,
        instaAccount,
        name,
        description,
        triggerType,
        isActive,
        createdAt
    } = automation;

    // Sanitized/Default values
    const displayName = name || "Unnamed Automation";
    const displayDescription = description || "No description";
    const displayTriggerType = triggerType;
    const displayIsActive = typeof isActive === "boolean" ? isActive : false;

    let formattedCreatedAt = "-";
    if (createdAt && !isNaN(Date.parse(createdAt))) {
        formattedCreatedAt = format(new Date(createdAt), "MMM d, yyyy");
    }

    const hasInstaAccount =
        !!instaAccount &&
        !!instaAccount.userName &&
        !!instaAccount.name &&
        !!instaAccount.avatar;

    // Handler for row click - only navigates if id exists
    const handleRowClick = () => {
        if (id) {
            router.push(`/automations/${id}`);
        }
    };

    return (
        <tr
            className="
                cursor-pointer
                transition-colors
                hover:bg-surface/50
            "
            onClick={handleRowClick}
            style={{ userSelect: "none" }}
            tabIndex={0} // for accessibility (focusable)
            role="button"
            aria-label={displayName}
        >
            <td className="px-6 py-5">
                <div className="flex flex-col">
                    <span
                        className="
                            text-sm font-semibold
                            text-primary
                        "
                    >
                        {displayName}
                    </span>

                    <span
                        className="
                            mt-1
                            line-clamp-1
                            text-sm
                            text-muted-foreground
                        "
                    >
                        {displayDescription}
                    </span>
                </div>
            </td>

            <td className="px-6 py-5">
                {displayTriggerType ? (
                    <TriggerBadge
                        triggerType={displayTriggerType}
                    />
                ) : (
                    <span className="text-xs text-zinc-400">-</span>
                )}
            </td>

            <td className="px-6 py-5">
                {hasInstaAccount ? (
                    <div
                        className="
                            flex items-center gap-3
                        "
                    >
                        <img
                            src={instaAccount?.avatar || ""}
                            alt={instaAccount?.name || ""}
                            className="
                                h-8 w-8 rounded-full
                                border border-border
                                object-cover
                            "
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "";
                            }}
                        />

                        <span
                            className="
                                text-sm font-medium
                            "
                        >
                            @{instaAccount?.userName}
                        </span>
                    </div>
                ) : (
                    <span className="text-xs text-zinc-400">-</span>
                )}
            </td>

            <td className="px-6 py-5">
                <AutomationStatusBadge
                    isActive={displayIsActive}
                />
            </td>

            <td
                className="
                    px-6 py-5
                    text-sm
                    text-muted-foreground
                "
            >
                {formattedCreatedAt}
            </td>
        </tr>
    );
}