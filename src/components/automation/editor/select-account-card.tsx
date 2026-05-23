import { EditorCard } from "./editor-card";

export function SelectAccountCard() {
    return (
        <EditorCard
            title="
        Step 1: Select Instagram Profile
      "
            description="
        Choose which Instagram account
        should use for this automation.
      "
        >
            <div
                className="
          grid grid-cols-1
          gap-4
          md:grid-cols-2
        "
            >
                {[1, 2].map((item) => (
                    <button
                        key={item}
                        className={`
              flex items-center
              justify-between
              rounded-xl
              border p-4
              transition-all
              ${item === 1
                                ? `
                    border-primary
                    bg-primary/5
                    ring-1 ring-primary/20
                  `
                                : `
                    border-border
                    hover:border-primary
                  `
                            }
            `}
                    >
                        <div
                            className="
                flex items-center gap-3
              "
                        >
                            <div
                                className="
                  h-11 w-11
                  overflow-hidden
                  rounded-full
                  border border-border
                "
                            >
                                <img
                                    src="
                    https://i.pravatar.cc/100?img=12
                  "
                                    alt="Profile"
                                    className="
                    h-full w-full
                    object-cover
                  "
                                />
                            </div>

                            <div className="text-left">
                                <p
                                    className="
                    text-sm font-semibold
                  "
                                >
                                    @urban_style_pro
                                </p>

                                <p
                                    className="
                    text-xs
                    text-muted-foreground
                  "
                                >
                                    Business Profile
                                </p>
                            </div>
                        </div>

                        <div
                            className={`
                h-5 w-5 rounded-full
                border-2
                ${item === 1
                                    ? `
                      border-primary
                      bg-primary
                    `
                                    : `
                      border-border
                    `
                                }
              `}
                        />
                    </button>
                ))}
            </div>
        </EditorCard>
    );
}