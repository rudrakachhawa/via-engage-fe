"use client";
import { AutomationFilters } from "@/components/automation/automation-filters";
import { AutomationList } from "@/components/automation/automation-list";
import { CreateAutomationButton } from "@/components/automation/create-automation-button";

import { useAutomations } from "@/hooks/automation.hooks";
import { useState, useMemo } from "react";

export default function AutomationsPage() {
    const { data: automations = [], status } = useAutomations();
    const [filters, setFilters] = useState({
        "ig-account": "All",
        "trigger": "All",
        "status": "All"
    });

    // Maintain state to store whether any filter is applied
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    // Handles filter changes coming from AutomationFilters
    const onFilterChange = (newFilters: { [key: string]: string }) => {
        setFilters((prev) => {
            const updatedFilters = {
                ...prev,
                ...newFilters,
            };
            // Check if at least one filter is not "All"
            const filterApplied = Object.entries(updatedFilters).some(
                ([, value]) => value !== "All"
            );
            setIsFilterApplied(filterApplied);
            return updatedFilters;
        });
    };

    // Filtering logic updated: status filter uses isActive (boolean)
    const filteredAutomations = useMemo(() => {
        return automations.filter((automation: any) => {
            // ig-account filter applies to automation.igUserId
            if (
                filters["ig-account"] && filters["ig-account"] !== "All" &&
                automation.igUserId !== filters["ig-account"]
            ) {
                return false;
            }
            // trigger filter applies to automation.triggerType
            if (
                filters["trigger"] && filters["trigger"] !== "All" &&
                automation.triggerType !== filters["trigger"]
            ) {
                return false;
            }
            // status filter uses isActive (true/false), filters["status"] will be "Active", "Inactive", or "All"
            if (
                filters["status"] && filters["status"] !== "All"
            ) {
                if (filters["status"] === "Active" && automation.isActive !== true) {
                    return false;
                }
                if (filters["status"] === "Inactive" && automation.isActive !== false) {
                    return false;
                }
            }
            return true;
        });
    }, [automations, filters]);

    return (
        <div
            className="
          flex flex-col
          gap-8
        "
        >
            <div
                className="
            flex flex-col
            justify-between gap-6
            lg:flex-row
            lg:items-end
          "
            >
                <div>
                    <h1
                        className="
                text-4xl font-bold
                tracking-tight
                text-foreground
              "
                    >
                        Automations
                    </h1>

                    <p
                        className="
                mt-2
                text-muted-foreground
              "
                    >
                        Manage and monitor all your
                        engagement workflows.
                    </p>
                </div>

                <div
                    className="
              flex flex-wrap
              items-end gap-4
            "
                >
                    {/* Pass down filter change handler */}
                    <AutomationFilters onChange={onFilterChange} />

                    <CreateAutomationButton />
                </div>
            </div>

            <AutomationList
                automations={filteredAutomations}
                isFilterApplied={isFilterApplied}
                status={status}
            />
        </div>
    );
}