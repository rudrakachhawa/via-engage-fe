import { setItemInStorage } from "@/utils/localStorageUtility";
import axios from "axios";

export function getServerBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:8000").replace(
        /\/$/,
        "",
    );
}

/**
 * Calls the /user/login endpoint of the backend.
 * Sends an empty body, and expects a Bearer token in the Authorization header.
 * @param idToken User's Firebase ID token (JWT)
 * @returns Promise with backend response data
 */

export async function userLoginApi(idToken: string): Promise<any> {
    const baseUrl = getServerBaseUrl();
    const url = `${baseUrl}/user/login`;
    const response = await axios.post(
        url,
        {},
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );
    setItemInStorage('accessToken', idToken)
    return response.data;
}
