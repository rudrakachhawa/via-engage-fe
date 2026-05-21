import { Check } from "lucide-react";

interface OnboardingStepProps {
    step: number;
    title: string;
    description: string;
    status: "completed" | "active" | "pending";
    children?: React.ReactNode;
}

export function OnboardingStep({
    step,
    title,
    description,
    status,
    children,
}: OnboardingStepProps) {
    return (
        <div
            className={`
        flex items-start gap-4
        rounded-xl
        p-5
        transition-all
        ${status === "completed"
                    ? `
              border border-primary/20
              bg-surface-low
            `
                    : ""
                }

        ${status === "active"
                    ? `
              border-2 border-primary
              bg-white
              ring-4 ring-primary/5
            `
                    : ""
                }

        ${status === "pending"
                    ? `
              border border-border
              bg-white
              opacity-60
            `
                    : ""
                }
      `}
        >
            <div
                className={`
          flex h-9 w-9
          shrink-0 items-center justify-center
          rounded-full
        ${status === "completed"
                        ? "bg-primary text-white"
                        : ""
                    }

        ${status !== "completed"
                        ? "border-2 border-primary"
                        : ""
                    }
        `}
            >
                {status === "completed" ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <span
                        className="
              text-sm font-semibold
              text-primary
            "
                    >
                        {step}
                    </span>
                )}
            </div>

            <div className="flex-1">
                <h3
                    className={`
            text-sm font-semibold
            ${status === "completed"
                            ? "text-primary"
                            : "text-foreground"
                        }
          `}
                >
                    {title}
                </h3>

                <p
                    className="
            mt-1
            text-sm leading-6
            text-muted-foreground
          "
                >
                    {description}
                </p>

                {children && (
                    <div className="mt-5">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}