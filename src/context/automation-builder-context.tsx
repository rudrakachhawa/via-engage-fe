"use client";

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
}

export const AutomationBuilderContext =
    createContext<AutomationBuilderContextValue | null>(null);

interface ProviderProps {
    children: React.ReactNode;
    initialState?: Partial<AutomationBuilderState>;
}

export function AutomationBuilderProvider({
    children,
    initialState,
}: ProviderProps) {
    const [state, dispatch] = useReducer(
        reducer,
        {
            ...defaultState,
            ...initialState,
        }
    );

    const value = useMemo(
        () => ({
            state,
            updateBuilder: (
                payload: Partial<AutomationBuilderState>
            ) => dispatch({
                type: "PATCH_STATE",
                payload,
            }),
        }),
        [state]
    );

    return (
        <AutomationBuilderContext.Provider value={value}>
            {children}
        </AutomationBuilderContext.Provider>
    );
}