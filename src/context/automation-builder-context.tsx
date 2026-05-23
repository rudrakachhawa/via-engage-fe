"use client";

import { deleteAutomationApi, toggleAutomationApi, updateAutomationApi } from "@/api/automations.api";
import { useAutomationById, useAutomations } from "@/hooks/automation.hooks";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
    createContext,
    useMemo,
    useReducer,
} from "react";


export type TriggerType = "COMMENT" | "DM" | "STORY_REPLY" | null;

export interface AutomationBuilderState {
    id: string | null;
    userId: string | null;
    igUserId: string | null;
    name: string | null;
    description: string | null;
    messageTemplate: string | null;
    triggerType: TriggerType;
    keywords: string[];
    commentReplies: string[];
    targetContentId: string | null;
    targetContentType: string | null;
    targetContentUrl: string | null;
    targetThumbnailUrl: string | null;
    isActive: boolean;
    createdAt: string | null;
    updatedAt: string | null;
    instaAccount?: any | null;
}

type Action = {
    type: "PATCH_STATE";
    payload: Partial<AutomationBuilderState>;
};

// Populate with the sample data provided in the prompt
const defaultState: AutomationBuilderState = {
    id: null,
    userId: null,
    igUserId: null,
    name: "Untitled",
    description: null,
    messageTemplate: null,
    triggerType: null,
    keywords: [],
    commentReplies: [],
    targetContentId: null,
    targetContentType: null,
    targetContentUrl: null,
    targetThumbnailUrl: null,
    isActive: false,
    createdAt: null,
    updatedAt: null,
    instaAccount: null,
};

function reducer(
    state: AutomationBuilderState,
    action: Action
): AutomationBuilderState {
    switch (action.type) {
        case "PATCH_STATE":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

interface AutomationBuilderContextValue {
    state: AutomationBuilderState;
    updateBuilder: (
        payload: Partial<AutomationBuilderState>
    ) => void;
    saveAutomation: () => void;
    deleteAutomation: () => void;
    toggleAutomation: () => void;
    togglePending: boolean
    savePending: boolean
    deletePending: boolean
}

export const AutomationBuilderContext =
    createContext<AutomationBuilderContextValue | null>(null);

interface ProviderProps {
    children: React.ReactNode;
    initialState?: Partial<AutomationBuilderState>;
}

export function AutomationBuilderProvider({
    children,
    initialState
}: ProviderProps) {
    const [state, dispatch] = useReducer(
        reducer,
        {
            ...defaultState,
            ...initialState,
        }
    );

    const params = useParams()
    const router = useRouter()
    const { refetch: refetchAllAutomations } = useAutomations()
    const { refetch: refetchAutomationData } = useAutomationById((params.id as string))

    const toggleMutation = useMutation({
        mutationFn: () => toggleAutomationApi((params.id as string)),
        onSuccess: async () => {
            refetchAutomationData();
            refetchAllAutomations()
        },
        onError: async () => {
            dispatch({
                type: "PATCH_STATE",
                payload: {
                    isActive: !state.isActive
                },
            })
        }
    });

    const saveMutation = useMutation({
        mutationFn: () => updateAutomationApi((params.id as string), value.state),
        onSuccess: async () => {
            refetchAutomationData();
            refetchAllAutomations()
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteAutomationApi((params.id as string)),
        onSuccess: () => {
            refetchAllAutomations()
            router.push("/automations");
        }
    });

    const togglePending = toggleMutation.status === "pending";
    const savePending = saveMutation.status === "pending";
    const deletePending = deleteMutation.status === "pending";

    const value = useMemo(
        () => ({
            state,
            updateBuilder: (
                payload: Partial<AutomationBuilderState>
            ) => dispatch({
                type: "PATCH_STATE",
                payload,
            })
        }),
        [state]
    );
    console.log(value.state)
    return (
        <AutomationBuilderContext.Provider value={{
            ...value,
            saveAutomation: () => saveMutation.mutate(),
            deleteAutomation: () => deleteMutation.mutate(),
            toggleAutomation: () => toggleMutation.mutate(),
            togglePending,
            savePending,
            deletePending,
        }}>
            {children}
        </AutomationBuilderContext.Provider>
    );
}