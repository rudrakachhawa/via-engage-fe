"use client";

import { useAutomationBuilder } from "@/hooks/use-automation-builder";

export function MessagePreviewCard() {
    const { state } =
        useAutomationBuilder();

    const previewMessage =
        state.messageTemplate?.replace(
            "{first_name}",
            "Alex"
        )
            .replace(
                "{username}",
                "@alex"
            )
            .replace(
                "{product_link}",
                "urbanstyle.co"
            );

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
                    Preview
                </h2>

                <p
                    className="
            mt-1
            text-sm
            text-muted-foreground
          "
                >
                    See how your message appears.
                </p>
            </div>

            <div className="p-6">
                <div
                    className="
            mx-auto
            flex max-w-[320px]
            justify-center
          "
                >
                    <div
                        className="
              w-full
              rounded-[36px]
              border-[10px]
              border-black
              bg-white
              p-4
              shadow-2xl
            "
                    >
                        <div
                            className="
                mb-6
                flex items-center gap-3
              "
                        >
                            <div
                                className="
                  h-8 w-8 rounded-full
                  bg-surface
                "
                            />

                            <div
                                className="
                  h-2 w-24
                  rounded-full
                  bg-surface
                "
                            />
                        </div>

                        <div
                            className="
                ml-auto
                whitespace-pre-wrap
                rounded-3xl
                rounded-tr-md
                bg-primary/10
                p-4
                text-sm leading-6
                text-primary
              "
                        >
                            {previewMessage}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}