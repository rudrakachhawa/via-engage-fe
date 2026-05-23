"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createAutomationApi } from "@/api/automations.api";
import { useAutomations } from "@/hooks/automation.hooks";

interface CreateAutomationButtonProps {
    className?: string;
}

export function CreateAutomationButton({
    className,
}: CreateAutomationButtonProps) {
    const router = useRouter();
    const { refetch: refetchAllAutomations } = useAutomations()
    const {
        mutate: createAutomation,
        status: createStatus,
    } = useMutation({
        mutationFn: () => createAutomationApi({}),
        onSuccess: (createdAutomation) => {
            if (createdAutomation && createdAutomation.id) {
                refetchAllAutomations()
                router.push(`/automations/${createdAutomation.id}`);
            }
        },
    });

    const isLoading = createStatus === "pending";

    return (
        <Button
            onClick={() => createAutomation()}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating...
                </>
            ) : (
                <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Automation
                </>
            )}
        </Button>
    );
}