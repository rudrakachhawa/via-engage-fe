import api from "@/lib/interceptor";

/**
 * Calls the GET /media API endpoint to fetch user's media.
 * By default, fetches FEED media unless type is specified ('FEED' or 'STORY').
 * @param {("FEED" | "STORY")} [type="FEED"] - The media type to filter by.
 * @returns {Promise<any>} Resolves with the media data from the backend.
 */
export async function getUserMediaApi(type: "FEED" | "STORY" = "FEED"): Promise<any> {
    const response = await api.get("/media", {
        params: {
            type,
        },
    });
    return response.data?.media;
}