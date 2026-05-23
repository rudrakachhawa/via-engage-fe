import { AutomationRow } from "./automation-row";

interface AutomationListProps {
    automations: any[];
    isFilterApplied: Boolean;
}

export function AutomationList({
    automations,
    isFilterApplied
}: AutomationListProps) {
    const showNoResults =
        Boolean(isFilterApplied) && Array.isArray(automations) && automations.length === 0;

    return (
        <div
            className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
        shadow-sm
      "
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead
                        className="
              border-b border-border
              bg-surface/50
            "
                    >
                        <tr>
                            {[
                                "Automation",
                                "Trigger",
                                "Account",
                                "Status",
                                "Created",
                            ].map((item) => (
                                <th
                                    key={item}
                                    className="
                    px-6 py-4
                    text-left text-xs
                    font-semibold uppercase
                    tracking-[0.18em]
                    text-muted-foreground
                  "
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {showNoResults ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-muted-foreground text-base font-medium"
                                >
                                    No automations match your current filters.

                                </td>
                            </tr>
                        ) : (
                            automations?.map(
                                (automation, index) => (
                                    <AutomationRow
                                        key={index}
                                        automation={automation}
                                    />
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}