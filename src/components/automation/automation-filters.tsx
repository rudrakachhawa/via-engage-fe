"use client";
import { useUserData } from "@/hooks/user.hooks";
import { useState, useMemo } from "react";

interface AutomationFiltersProps {
    onChange: (filters: { [key: string]: string }) => void;
}

const BASE_FILTER_CONFIG = [
    {
        key: 'trigger',
        label: "Trigger",
        options: [
            "All",
            "COMMENT",
            "DM",
            "STORY_REPLY",
        ],
    },
    {
        key: 'status',
        label: "Status",
        options: [
            "All",
            "Active",
            "Inactive",
        ],
    },
];

export function AutomationFilters({ onChange }: AutomationFiltersProps) {
    const { data: userData } = useUserData();

    // Generate IG Account options from userData
    const igAccountOptions = useMemo(() => {
        const base = [{ label: "All", value: "All" }];
        if (
            userData &&
            Array.isArray(userData.instaAccounts) &&
            userData.instaAccounts.length > 0
        ) {
            return base.concat(
                userData.instaAccounts.map((account: any) => ({
                    label: account.userName
                        ? `@${account.userName}`
                        : account.igUserId || "Account",
                    value: account.igUserId,
                }))
            );
        }
        return base;
    }, [userData]);

    const [filters, setFilters] = useState<{ [key: string]: string }>({
        "ig-account": "All",
        "trigger": "All",
        "status": "All"
    });

    // Handles change for all select boxes
    const handleChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onChange(newFilters);
    };

    // Build filter config dynamically to include generated ig-account options
    const filterConfig = useMemo(() => {
        return [
            {
                key: 'ig-account',
                label: "IG Account",
                options: igAccountOptions,
            },
            ...BASE_FILTER_CONFIG,
        ];
    }, [igAccountOptions]);

    return (
        <div
            className="
          flex flex-wrap
          items-end gap-4
        "
        >
            {filterConfig.map((filter) => (
                <div
                    key={filter.key}
                    className="
              flex flex-col gap-2
            "
                >
                    <label
                        className="
                text-xs font-semibold
                uppercase tracking-[0.18em]
                text-muted-foreground
              "
                        htmlFor={`automation-filter-${filter.key}`}
                    >
                        {filter.label}
                    </label>

                    <select
                        id={`automation-filter-${filter.key}`}
                        className="
                h-11 min-w-[180px]
                rounded-xl
                border border-border
                bg-card
                px-4
                text-sm
                outline-none
                transition-all
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
                        value={filters[filter.key] || "All"}
                        onChange={e => handleChange(filter.key, e.target.value)}
                    >
                        {filter.options.map((option: any) =>
                            typeof option === "string" ? (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ) : (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            ))}
        </div>
    );
}