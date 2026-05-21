import {
    Activity,
    Rocket,
    Shield,
} from "lucide-react";

import { FeatureCard } from "../marketing/feature-card";

export function BenefitsGrid() {
    return (
        <div
            className="
    grid grid-cols-1
    gap-6
    md:grid-cols-3
    items-start
  "
        >
            <FeatureCard
                icon={Shield}
                title="Secure & Compliant"
                description="
            We use official Instagram Graph APIs
            to ensure your account remains safe
            and compliant.
          "
            />

            <FeatureCard
                icon={Rocket}
                title="Rapid Engagement"
                description="
            Scale your interaction rates without
            increasing your manual workload.
          "
            />

            <FeatureCard
                icon={Activity}
                title="Advanced Insights"
                description="
            Get granular analytics on how your
            automations are performing.
          "
            />
        </div>
    );
}