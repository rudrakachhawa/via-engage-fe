import {
    Activity,
    Rocket,
    Shield,
} from "lucide-react";

import { FeatureCard } from "./feature-card";

export function FeaturesGrid() {
    return (
        <section
            id="features"
            className="pb-24"
        >
            <div
                className="
            grid gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
            >
                <FeatureCard
                    icon={Shield}
                    title="Secure & Compliant"
                    description="
              We use official Instagram APIs to ensure
              your account remains safe, compliant and 
              protected.
            "
                />

                <FeatureCard
                    icon={Rocket}
                    title="Rapid Engagement"
                    description="
              Respond to every comment and DM instantly
              with AI-powered automation workflows
              running 24/7.
            "
                />

                <FeatureCard
                    icon={Activity}
                    title="Advanced Insights"
                    description="
              Track engagement performance, conversions,
              and automation effectiveness with detailed
              analytics.
            "
                />
            </div>
        </section>
    );
}