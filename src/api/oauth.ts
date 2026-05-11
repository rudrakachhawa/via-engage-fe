import api from "@/lib/interceptor";

/**
 * Fetches user info from the backend OAuth endpoint.
 * Sends the code in the POST request body.
 * @param code The OAuth code string
 * @returns Promise with user info response
 */
export async function createInstaAccessTokenApi(code: string): Promise<any> {
  const url = `/insta-oauth/token`;
  const response = await api.post(
    url,
    { code },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
}
