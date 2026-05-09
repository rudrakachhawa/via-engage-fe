import axios from "axios";

export function getServerBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:8000").replace(
    /\/$/,
    "",
  );
}

/**
 * Fetches user info from the backend OAuth endpoint.
 * Sends the code in the POST request body.
 * @param code The OAuth code string
 * @returns Promise with user info response
 */
export async function createInstaAccessToken(code: string): Promise<any> {
  const baseUrl = getServerBaseUrl();
  const url = `${baseUrl}/insta-oauth/token`;
  const response = await axios.post(
    url,
    { code },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
}
