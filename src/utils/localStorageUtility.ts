/**
 * Retrieves and parses a JSON value from localStorage for the given key.
 * @param storageKey The key for storage.
 * @returns The parsed value of type T or null if not found or on error.
 */
export function getItemFromStorage<T = any>(storageKey: string): T | null {
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw === null) return null;
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

/**
 * Stores a value in localStorage after checking its data type.
 * Supports objects, arrays, strings, numbers, and booleans.
 * @param storageKey The key for storage.
 * @param data The value to store.
 */
export function setItemInStorage<T = any>(storageKey: string, data: T): void {
    try {
        // Only these types are supported.
        const dataType = typeof data;
        if (
            data === null ||
            dataType === "string" ||
            dataType === "number" ||
            dataType === "boolean" ||
            Array.isArray(data) ||
            (dataType === "object" && data !== null)
        ) {
            localStorage.setItem(storageKey, JSON.stringify(data));
        } else {
            // Ignore unsupported types like functions, undefined, symbols
            throw new Error(`Unsupported data type for localStorage: ${dataType}`);
        }
    } catch {
        // Optionally handle storage full/disabled, unsupported type, etc.
    }
}

/**
 * Clears all data from localStorage.
 */
export function clearAllStorage(): void {
    try {
        localStorage.clear();
    } catch {
        // Optionally handle errors (storage disabled etc.)
    }
}
