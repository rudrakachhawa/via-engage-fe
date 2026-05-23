"use client"
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "rounded-md text-sm font-medium",
        "transition-all duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        "outline-none",
        "focus-visible:ring-4 focus-visible:ring-primary/10",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-[image:var(--gradient-primary)] text-primary-foreground",
                    "border border-white/10",
                    "hover:opacity-95",
                    "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
                    "hover:shadow-[var(--shadow-md)]",
                ],

                secondary: [
                    "border border-border",
                    "bg-card text-foreground",
                    "hover:bg-muted",
                ],

                ghost: [
                    "text-foreground",
                    "hover:bg-muted",
                ],

                danger: [
                    "bg-red-600 text-white",
                    "hover:bg-red-700",
                ],
            },

            size: {
                sm: "h-9 px-3 text-sm",
                md: "h-11 px-5",
                lg: "h-12 px-6 text-base",
                icon: "size-10",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };