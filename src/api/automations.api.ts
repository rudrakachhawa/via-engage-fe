import api from "@/lib/interceptor";

/**
 * Create a new automation.
 * @param {object} data - The automation data to create
 * @returns {Promise<any>}
 */
export async function createAutomationApi(data: any): Promise<any> {
    const response = await api.post(
        "/automation/",
        data
    );
    return response.data.automation;
}

/**
 * Get all automations for the user's IG account.
 * @returns {Promise<any[]>}
 */
export async function getAutomationsApi(): Promise<any[]> {
    const response = await api.get("/automation/");
    return response.data.automations;
}

/**
 * Get a single automation by ID.
 * @param {string} id - The automation ID
 * @returns {Promise<any>}
 */
export async function getAutomationByIdApi(id: string): Promise<any> {
    const response = await api.get(`/automation/${id}`);
    return response.data.automation;
}

/**
 * Update an existing automation.
 * @param {string} id - The automation ID
 * @param {object} data - The fields to update
 * @returns {Promise<any>}
 */
export async function updateAutomationApi(id: string, data: any): Promise<any> {
    const response = await api.put(
        `/automation/${id}`,
        data
    );
    return response.data;
}

/**
 * Delete an automation by ID.
 * @param {string} id - The automation ID
 * @returns {Promise<any>}
 */
export async function deleteAutomationApi(id: string): Promise<any> {
    const response = await api.delete(`/automation/${id}`);
    return response.data;
}

/**
 * Pause or resume an automation (toggle).
 * @param {string} id - The automation ID
 * @returns {Promise<any>}
 */
export async function toggleAutomationApi(id: string): Promise<any> {
    const response = await api.patch(
        `/automation/${id}/toggle`,
        {}
    );
    return response.data;
}