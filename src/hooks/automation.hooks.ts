"use client"
import { useQuery } from '@tanstack/react-query'
import {
    getAutomationsApi,
    getAutomationByIdApi
} from '@/api/automations.api'
import { useState } from 'react';

/**
 * Custom hook to fetch all automations using React Query
 */
export function useAutomations() {
    return useQuery({
        queryKey: ['automations'],
        queryFn: getAutomationsApi,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: true,
    });
}

/**
 * Custom hook to fetch a single automation by ID using React Query
 * @param id The automation ID
 */
export function useAutomationById(id?: string) {
    return useQuery({
        queryKey: ['automation', id],
        queryFn: () => (id ? getAutomationByIdApi(id) : undefined),
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        enabled: Boolean(id),
        refetchOnWindowFocus: true,
    });
}