"use client";

import { useContext } from "react";

import { AutomationBuilderContext } from "@/context/automation-builder-context";

export function useAutomationBuilder() {
    const context = useContext(
        AutomationBuilderContext
    );

    if (!context) {
        throw new Error(
            "useAutomationBuilder must be used inside AutomationBuilderProvider"
        );
    }

    return context;
}