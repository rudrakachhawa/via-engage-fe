"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

const variables = [
    // "{first_name}",
    // "{username}"
];

export function ResponseConfigCard() {
    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

    const insertVariable = (
        variable: string
    ) => {
        updateBuilder({
            messageTemplate: `${state.messageTemplate} ${variable}`,
        });
    };

    return (
        <section
            className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
        shadow-sm
      "
        >
            <div
                className="
          border-b border-border
          bg-surface/30
          px-6 py-5
        "
            >
                <h2
                    className="
            text-2xl font-semibold
            tracking-tight
          "
                >
                    Step 3: What the tool does
                    next...
                </h2>

                <p
                    className="
            mt-1
            text-sm
            text-muted-foreground
          "
                >
                    Write the private message
                    users will receive.
                </p>
            </div>

            <div className="p-6">
                <textarea
                    value={
                        state.messageTemplate || ""
                    }
                    onChange={(e) =>
                        updateBuilder({
                            messageTemplate:
                                e.target.value,
                        })
                    }
                    placeholder="
            Write your automation response...
          "
                    className="
            min-h-[260px]
            w-full resize-none
            rounded-2xl
            border border-border
            bg-background
            p-6
            text-base leading-7
            outline-none
            transition-all
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
                />

                <div
                    className="
            mt-5
            flex flex-wrap gap-2
          "
                >
                    {variables.map((item) => (
                        <button
                            key={item}
                            onClick={() =>
                                insertVariable(
                                    item
                                )
                            }
                            className="
                rounded-full
                bg-primary/10
                px-4 py-2
                text-sm font-medium
                text-primary
                transition-colors
                hover:bg-primary/15
              "
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}