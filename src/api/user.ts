import api from "@/lib/interceptor";

export function getServerBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:8000").replace(
        /\/$/,
        "",
    );
}

/**
 * Calls the /user/login endpoint of the backend.
 * Sends an empty body, and expects a Bearer token in the Authorization header.
 * @returns Promise with backend response data
 */

export async function userLoginApi(): Promise<any> {
    const baseUrl = getServerBaseUrl();
    const url = `${baseUrl}/user/login`;
    const response = await api.post(
        url,
        {}
    );
    return response.data?.user;
}

export async function removeIgAccountApi(igUserId: string): Promise<any> {
    const baseUrl = getServerBaseUrl();
    const url = `${baseUrl}/user/insta-account/${igUserId}`;
    const response = await api.delete(
        url,
        {}
    );
    return response.data;
}
