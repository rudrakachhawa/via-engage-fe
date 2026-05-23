import {
    MessageCircle,
    MessageSquare,
    Repeat,
} from "lucide-react";

type TriggerType =
    | "COMMENT"
    | "DM"
    | "STORY_REPLY";

interface TriggerBadgeProps {
    triggerType: TriggerType;
}

const triggerMap = {
    COMMENT: {
        label: "Comment",
        icon: MessageCircle,
    },

    DM: {
        label: "DM",
        icon: MessageSquare,
    },

    STORY_REPLY: {
        label: "Story Reply",
        icon: Repeat,
    },
};

export function TriggerBadge({
    triggerType,
}: TriggerBadgeProps) {
    const config =
        triggerMap[triggerType];

    const Icon = config.icon;

    return (
        <div
            className="
          flex items-center gap-2
          text-muted-foreground
        "
        >
            <Icon className="h-4 w-4" />

            <span className="text-sm">
                {config.label}
            </span>
        </div>
    );
}