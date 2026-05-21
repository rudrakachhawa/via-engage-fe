import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
    className,
    type,
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            className={cn(
                [
                    "flex h-11 w-full rounded-md border border-input",
                    "bg-white px-4 py-2",
                    "text-sm text-foreground",
                    "placeholder:text-muted-foreground",
                    "outline-none",
                    "transition-all duration-200",

                    "focus:border-primary",
                    "focus:ring-4 focus:ring-primary/10",

                    "disabled:cursor-not-allowed",
                    "disabled:opacity-50",
                ],
                className
            )}
            {...props}
        />
    );
}

export { Input };