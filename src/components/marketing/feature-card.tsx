import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({
    icon: Icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <Card
            className="
        rounded-2xl
        border-border/70
        p-8
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
        >
            <div
                className="
          mb-6 flex flex-row items-center gap-4
        "
            >
                <div
                    className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  bg-surface-high
                "
                >
                    <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3
                    className="
                  text-2xl font-semibold
                  tracking-tight
                "
                >
                    {title}
                </h3>
            </div>

            <p
                className="
          mt-4
          leading-7
          text-muted-foreground
        "
            >
                {description}
            </p>
        </Card>
    );
}