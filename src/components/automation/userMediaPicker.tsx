import { useUserMedia } from "@/hooks/userMedia.hooks";
import React from "react";

type TriggerType = "COMMENT" | "DM" | "LIVE_COMMENT" | "STORY_REPLY" | "MENTION";

interface MediaItem {
    id: string;
    type: string;
    thumbnailUrl?: string;
    permalink?: string;
    caption?: string | null;
    title?: string;
    timestamp?: string;
    [key: string]: any;
}

interface MediaPickerProps {
    triggerType?: TriggerType;
    targetContentId?: string;
    onChange: (fields: {
        targetContentId: string;
        targetContentType: string;
        targetContentUrl: string;
        targetThumbnailUrl: string;
    }) => void;
}

// Block select modal-style picker for user media showing thumbnails
export const MediaPicker = ({
    triggerType,
    targetContentId,
    onChange
}: MediaPickerProps) => {
    const [showModal, setShowModal] = React.useState(false);

    if (!triggerType) return null;

    let label = "";
    let userMediaType: "FEED" | "STORY" | null = null;
    let typeValue = "";
    switch (triggerType) {
        case "COMMENT":
            label = "Select Post or Reel";
            userMediaType = "FEED";
            typeValue = "POST";
            break;
        case "LIVE_COMMENT":
            label = "Select Live Video";
            userMediaType = "FEED";
            typeValue = "LIVE";
            break;
        case "STORY_REPLY":
            label = "Select Story";
            userMediaType = "STORY";
            typeValue = "STORY";
            break;
        default:
            return null;
    }

    const { data: mediaList, isLoading, error } = useUserMedia(userMediaType ?? "FEED");

    // Safety: Accept either straight array or .items key
    const mediaItems: MediaItem[] = Array.isArray(mediaList)
        ? mediaList
        : Array.isArray(mediaList?.items) ? mediaList.items : [];

    return (
        <div>
            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {label}
            </label>
            {
                !targetContentId && <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="w-full px-4 py-2 mb-2 bg-zinc-200 dark:bg-zinc-800 rounded text-left border border-zinc-300 dark:border-zinc-700 shadow-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                    Select media...
                </button>
            }
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto border border-zinc-300 dark:border-zinc-700 p-4 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 dark:text-zinc-400 text-xl font-bold"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="font-semibold mb-4 text-lg">{label}</h2>
                        {isLoading ? (
                            <div className="p-2 text-gray-500 text-center">
                                Loading media...
                            </div>
                        ) : error ? (
                            <div className="p-2 text-red-500 text-center">
                                Failed to load media.
                            </div>
                        ) : (
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                {mediaItems.length === 0 && (
                                    <div className="col-span-full text-center text-gray-400">
                                        No media found.
                                    </div>
                                )}
                                {mediaItems.map((media) => (
                                    <div
                                        key={media.id}
                                        className={`flex flex-col items-center p-3 rounded border cursor-pointer transition
                                            ${media.id === targetContentId
                                                ? 'border-blue-500 bg-blue-50 dark:bg-zinc-800'
                                                : 'border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:bg-blue-100/40 dark:hover:bg-zinc-800/70'}`}
                                        onClick={() => {
                                            onChange({
                                                targetContentId: media.id ?? "",
                                                targetContentType: media.type || typeValue,
                                                targetContentUrl: media.permalink || media.url || "",
                                                targetThumbnailUrl: media.thumbnailUrl || ""
                                            });
                                            setShowModal(false);
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-pressed={media.id === targetContentId}
                                        onKeyDown={e => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                onChange({
                                                    targetContentId: media.id ?? "",
                                                    targetContentType: media.type || typeValue,
                                                    targetContentUrl: media.permalink || media.url || "",
                                                    targetThumbnailUrl: media.thumbnailUrl || ""
                                                });
                                                setShowModal(false);
                                            }
                                        }}
                                    >
                                        {/* Show media type on top */}
                                        <div className="mb-1 w-full text-xs text-gray-500 dark:text-zinc-400 text-center font-semibold">
                                            {media.type} <span className="ml-1 text-gray-400">({media.id})</span>
                                        </div>
                                        <img
                                            src={media.thumbnailUrl || "/no-image.svg"}
                                            alt={`thumbnail for ${media.type || media.id}`}
                                            className="w-28 h-28 object-cover rounded mb-2 border"
                                        />
                                        {/* Show caption below image, or fallback */}
                                        <div className="w-full text-center font-medium truncate mb-1">
                                            {media.caption && media.caption.trim() !== ""
                                                ? media.caption
                                                : <span className="italic text-gray-400">no caption added on this media</span>
                                            }
                                        </div>
                                        {media.timestamp && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {new Date(media.timestamp).toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Selected media preview/info block */}
            {targetContentId && (() => {
                const selectedMedia = mediaItems.find(item => item.id === targetContentId);
                if (!selectedMedia) return null;
                return (
                    <div className="relative mb-2 mt-2 border border-zinc-200 dark:border-zinc-700 p-2 rounded bg-zinc-50 dark:bg-zinc-900/60 text-sm text-zinc-700 dark:text-zinc-300 flex flex-col sm:flex-row gap-2 items-center">
                        {/* Remove icon in top right */}
                        <button
                            type="button"
                            title="Remove selected media"
                            className="absolute top-2 right-2 p-1 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition focus:outline-none"
                            onClick={() => {
                                onChange({
                                    targetContentId: "",
                                    targetContentType: "",
                                    targetContentUrl: "",
                                    targetThumbnailUrl: "",
                                });
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {selectedMedia.thumbnailUrl && (
                            <img
                                src={selectedMedia.thumbnailUrl}
                                alt={`media thumbnail for ${selectedMedia.type || selectedMedia.id}`}
                                className="w-20 h-20 object-cover rounded border"
                            />
                        )}
                        <div>
                            {/* Show media type and id at top */}
                            <div className="mb-1">
                                <b>Type:</b>{" "}
                                {selectedMedia?.type || typeValue}{" "}
                                <span className="ml-2 text-gray-400">({selectedMedia?.id})</span>
                            </div>
                            {selectedMedia?.permalink && (
                                <div>
                                    <b>URL:</b>{" "}
                                    <a
                                        href={selectedMedia.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline break-all"
                                    >
                                        {selectedMedia.permalink}
                                    </a>
                                </div>
                            )}
                            <div className="mt-1 italic opacity-80">
                                {selectedMedia?.caption && selectedMedia.caption.trim() !== ""
                                    ? selectedMedia.caption
                                    : <span className="text-gray-400">no caption added on this media</span>
                                }
                            </div>
                        </div>
                    </div>
                );
            })()}

        </div>
    );
};