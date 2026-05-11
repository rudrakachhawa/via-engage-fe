"use client";

import React from "react";

export default function ContactUsPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
            <main className="w-full max-w-2xl flex flex-col items-center bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 sm:p-12 mt-12 mb-12">
                <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
                    Contact Us
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
                    We'd love to hear from you! Please reach out using the details below.
                </p>
                <div className="w-full flex flex-col gap-6 items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-1">
                            Email
                        </span>
                        <a
                            href="mailto:rudrakshkachhawa@gmail.com"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                        >
                            rudrakshkachhawa@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-1">
                            Phone
                        </span>
                        <a
                            href="tel:+919893586113"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                        >
                            +91 9893586113
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}