"use client";

import {
    ArrowLeft,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import { Switch } from "../ui/switch";

// Use shadcn/ui Switch (tailwind component) for better movement and UX

export function AutomationEditorNavbar() {
    const router = useRouter();
    const {
        state,
        updateBuilder,
        togglePending,
        savePending,
        deletePending,
        saveAutomation,
        deleteAutomation,
        toggleAutomation
    } = useAutomationBuilder();

    const isActive = state.isActive;

    return (
        <header
            className="
                z-30
                border-b border-border
                bg-background/90
                backdrop-blur-xl
            "
        >
            <div
                className="
                    flex min-h-[88px]
                    items-center justify-between
                    gap-6
                    px-6
                    lg:px-8
                "
            >
                <div
                    className="
                        flex min-w-0
                        items-center gap-4
                    "
                >
                    <button
                        onClick={() => router.back()}
                        className="
                            flex h-10 w-10
                            shrink-0
                            items-center justify-center
                            rounded-full
                            transition-colors
                            hover:bg-surface
                        "
                    >
                        <ArrowLeft
                            className="
                                h-5 w-5
                                text-primary
                            "
                        />
                    </button>

                    <div className="min-w-0">
                        <input
                            value={state.name || ""}
                            onChange={(e) => {
                                updateBuilder({ name: e.target.value });
                            }}
                            className="
                                w-full
                                border-none
                                bg-transparent
                                p-0
                                text-[28px]
                                font-bold
                                tracking-[-0.03em]
                                text-foreground
                                outline-none
                            "
                            placeholder="Automation Name"
                        />

                        <input
                            value={state.description || ""}
                            onChange={(e) => {
                                updateBuilder({ description: e.target.value });
                            }}
                            className="
                                mt-1
                                w-full
                                border-none
                                bg-transparent
                                p-0
                                text-sm
                                text-muted-foreground
                                truncate
                                outline-none
                            "
                            placeholder="Enter a short description..."
                        />
                    </div>
                </div>

                <div
                    className="
                        flex shrink-0
                        items-center gap-4
                    "
                >
                    <div
                        className="
                            flex items-center gap-3
                            rounded-full
                            border border-border
                            bg-surface/60
                            px-4 py-2
                        "
                    >
                        <span
                            className="
                                text-sm font-medium
                                text-muted-foreground
                            "
                            style={{ marginRight: 12 }}
                        >
                            Live
                        </span>
                        {/* Use shadcn/ui tailwind Switch for toggle */}
                        <Switch
                            checked={isActive}
                            onCheckedChange={() => {
                                updateBuilder({ isActive: !isActive });
                                toggleAutomation();
                            }}

                            disabled={togglePending}
                            aria-label={isActive ? "Turn automation off" : "Turn automation on"}
                        >
                            {/* Hide the default label, use custom one below */}
                        </Switch>
                        <span
                            className={`
                                ml-2 text-xs font-bold
                                ${isActive ? "text-primary" : "text-muted-foreground"}
                                select-none
                            `}
                        >
                            {togglePending
                                ? isActive
                                    ? "Off..."
                                    : "On..."
                                : isActive
                                    ? "On"
                                    : "Off"
                            }
                        </span>
                    </div>

                    <Button
                        variant="danger"
                        onClick={deleteAutomation}
                        disabled={deletePending}
                    >
                        {deletePending ? "Deleting..." : "Delete"}
                    </Button>

                    <Button
                        onClick={saveAutomation}
                        disabled={savePending}
                        className="min-w-[150px]"
                    >
                        {savePending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}