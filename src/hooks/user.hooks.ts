import { userLoginApi } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch user media (FEED or STORY) using React Query.
 * @param type - The media type to fetch ("FEED" or "STORY")
 */
export function useUserData() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => userLoginApi(),
        refetchOnWindowFocus: true,
    });
}