"use client";
import { InstagramAuthButton } from "../auth/instagram-auth-button";
import { OnboardingStep } from "./onboarding-step";
import { useAutomations } from "@/hooks/automation.hooks";
import { CreateAutomationButton } from "../automation/create-automation-button";
import { useUserData } from "@/hooks/user.hooks";

export function SetupProgress() {
    const { data: userData } = useUserData();
    const { data: automations } = useAutomations();

    // Step 2: Connected Instagram if userData?.instaAccounts exists and not empty
    const instaAccounts = userData?.instaAccounts ?? [];
    const isInstagramConnected = Array.isArray(instaAccounts) && instaAccounts.length > 0;

    // Step 3: has at least one automation
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
                    {isInstagramConnected && hasAutomation && (
                        <button
                            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                            onClick={() => window.location.href = "/automations"}
                        >
                            See all Automations
                        </button>
                    )}
                </OnboardingStep>

            </div>
        </div>
    );
}