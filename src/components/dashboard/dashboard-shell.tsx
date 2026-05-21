import { BackgroundGlow } from "@/components/marketing/background-glow";

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({
    children,
}: DashboardShellProps) {
    return (
        <div
            className="
        relative min-h-screen
        overflow-hidden
        bg-background
      "
        >
            <BackgroundGlow />

            {children}
        </div>
    );
}