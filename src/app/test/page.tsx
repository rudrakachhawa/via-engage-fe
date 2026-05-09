"use client";

import { useState } from "react";

export default function TestJsonSender() {
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setJsonInput(e.target.value);
        setError(null);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let parsed;
        try {
            parsed = JSON.parse(jsonInput);
        } catch (e) {
            setError("Invalid JSON");
            return;
        }
        if (window.parent) {
            window.parent.postMessage(parsed, "*");
        }
        setError(null);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-zinc-50 dark:bg-black">
            <div className="w-full max-w-lg rounded-xl shadow-lg bg-white dark:bg-neutral-900 p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
                    Send JSON to Parent Window
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={jsonInput}
                        onChange={handleChange}
                        placeholder='Enter your JSON here...'
                        rows={8}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 font-mono text-sm resize-none outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {error && (
                        <p className="text-red-600 font-medium">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="py-2 px-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 text-white font-semibold text-lg shadow hover:scale-105 transition-all disabled:opacity-50"
                        disabled={!jsonInput}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}