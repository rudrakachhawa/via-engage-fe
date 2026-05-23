interface EditorCardProps {
    title: string;

    description?: string;

    children: React.ReactNode;

    rightSection?: React.ReactNode;
}

export function EditorCard({
    title,
    description,
    children,
    rightSection,
}: EditorCardProps) {
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
            flex items-start
            justify-between gap-4
            border-b border-border
            bg-surface/30
            px-6 py-5
          "
            >
                <div>
                    <h2
                        className="
                text-2xl font-semibold
                tracking-tight
              "
                    >
                        {title}
                    </h2>

                    {description && (
                        <p
                            className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
                        >
                            {description}
                        </p>
                    )}
                </div>

                {rightSection}
            </div>

            <div className="p-6">
                {children}
            </div>
        </section>
    );
}