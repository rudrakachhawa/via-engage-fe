"use client";
import { useUserState } from "@/store/hooks";
import { InstagramAuthButton } from "../auth/instagram-auth-button";
import { OnboardingStep } from "./onboarding-step";
import { useAutomations } from "@/hooks/automation.hooks";
import { CreateAutomationButton } from "../automation/create-automation-button";

export function SetupProgress() {
    const igUserId = useUserState("igUserId");
    const { data: automations } = useAutomations();

    // Completion steps:
    // 1. Account created: always completed
    // 2. Connected Instagram: igUserId present
    // 3. Created first Automation: automations?.length > 0

    const isInstagramConnected = !!igUserId;
    const hasAutomation = !!(automations && automations.length > 0);

    // Calculate progress
    const totalSteps = 3;
    let completedSteps = 1; // Account created is always done
    if (isInstagramConnected) completedSteps += 1;
    if (hasAutomation) completedSteps += 1;
    const percentComplete = Math.round((completedSteps / totalSteps) * 100);

    return (
        <div
            className="
        h-full
        rounded-2xl
        border border-border
        bg-card
        p-8
        shadow-sm
      "
        >
            <div
                className="
              mb-8
              flex items-center justify-between
            "
            >
                <h2
                    className="
                text-2xl font-semibold
                tracking-tight
              "
                >
                    Setup Progress
                </h2>

                <div
                    className="
                rounded-full
                bg-tertiary/10
                px-4 py-1.5
                text-sm font-semibold
                text-tertiary
              "
                >
                    {percentComplete}% Complete
                </div>
            </div>

            <div className="space-y-5">
                <OnboardingStep
                    step={1}
                    status="completed"
                    title="Account Created"
                    description="Your workspace is ready and configured."
                />

                <OnboardingStep
                    step={2}
                    status={
                        isInstagramConnected
                            ? "completed"
                            : "active"
                    }
                    title="Connect Instagram"
                    description="Securely link your professional account to start managing posts and insights."
                >
                    {!isInstagramConnected && <InstagramAuthButton />}
                </OnboardingStep>

                <OnboardingStep
                    step={3}
                    status={
                        isInstagramConnected
                            ? (hasAutomation ? "completed" : "active")
                            : "pending"
                    }
                    title="Create your first Automation"
                    description="Set up your first workflow to handle comments and automate engagement."
                >
                    {isInstagramConnected && !hasAutomation && (
                        <CreateAutomationButton />
                    )}
                </OnboardingStep>
            </div>
        </div>
    );
}