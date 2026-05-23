interface AutomationStatusBadgeProps {
    isActive: boolean;
}

export function AutomationStatusBadge({
    isActive,
}: AutomationStatusBadgeProps) {
    return (
        <span
            className={`
          inline-flex items-center
          rounded-full
          px-2.5 py-1
          text-xs font-semibold
          ${isActive
                    ? `
                bg-emerald-100
                text-emerald-700
              `
                    : `
                bg-surface
                text-muted-foreground
              `
                }
        `}
        >
            {isActive
                ? "Active"
                : "Inactive"}

        </span>
    );
}