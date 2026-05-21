import { InstagramAuthButton } from "../auth/instagram-auth-button";
import { OnboardingStep } from "./onboarding-step";

export function SetupProgress() {
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
                    33% Complete
                </div>
            </div>

            <div className="space-y-5">
                <OnboardingStep
                    step={1}
                    status="completed"
                    title="Account Created"
                    description="
            Your workspace is ready and configured.
          "
                />

                <OnboardingStep
                    step={2}
                    status="active"
                    title="Connect Instagram"
                    description="
            Securely link your professional account
            to start managing posts and insights.
          "
                >
                    <InstagramAuthButton />
                </OnboardingStep>

                <OnboardingStep
                    step={3}
                    status="pending"
                    title="Create your first Automation"
                    description="
            Set up your first workflow to handle
            comments and automate engagement.
          "
                />
            </div>
        </div>
    );
}