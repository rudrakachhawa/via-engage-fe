import { useQuery } from '@tanstack/react-query';
import { getUserMediaApi } from '@/api/media.api';

/**
 * Custom hook to fetch user media (FEED or STORY) using React Query.
 * @param type - The media type to fetch ("FEED" or "STORY")
 */
export function useUserMedia(type: "FEED" | "STORY" = "FEED", igUserId: string) {
    return useQuery({
        queryKey: ['userMedia', type, igUserId],
        queryFn: () => getUserMediaApi(type, igUserId),
        enabled: !!type && !!igUserId,
        staleTime: 5 * 60 * 1000, // Adjust as appropriate, e.g. 5 mins
        refetchOnWindowFocus: true,
    });
}