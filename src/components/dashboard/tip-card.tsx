import { Lightbulb } from "lucide-react";

export function TipCard() {
    return (
        <div
            className="
    rounded-2xl
    border border-border
    bg-surface-high
    p-6
  "
        >
            <div
                className="
          mb-4
          flex items-center gap-2
          text-sm font-semibold
          text-primary
        "
            >
                <Lightbulb className="h-4 w-4" />

                Pro Tip
            </div>

            <p
                className="
          text-base italic
          leading-7
          text-muted-foreground
        "
            >
                "Most successful creators start with
                Auto-Reply to engage with every
                comment instantly."
            </p>

            <button
                className="
          mt-4
          text-sm font-medium
          text-primary
          hover:underline
        "
            >
                View popular recipes →
            </button>
        </div>
    );
}