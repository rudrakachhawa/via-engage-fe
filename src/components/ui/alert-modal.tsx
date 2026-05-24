"use client";

interface AlertModalProps {
    open: boolean;

    title: string;

    description: string;

    confirmText?: string;

    cancelText?: string;

    loading?: boolean;

    onConfirm: () => void;

    onClose: () => void;

    destructive?: boolean;
}

export function AlertModal({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onClose,
    destructive = false,
}: AlertModalProps) {
    if (!open) return null;

    return (
        <div
            className="
        fixed inset-0 z-[100]
        flex items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
        >
            <div
                className="
          w-full max-w-md
          rounded-3xl
          border border-border
          bg-card
          p-6
          shadow-2xl
        "
            >
                <div>
                    <h2
                        className="
              text-xl
              font-semibold
            "
                    >
                        {title}
                    </h2>

                    <p
                        className="
              mt-3
              text-sm
              leading-6
              text-muted-foreground
            "
                    >
                        {description}
                    </p>
                </div>

                <div
                    className="
            mt-6
            flex items-center
            justify-end
            gap-3
          "
                >
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="
              h-11 rounded-xl
              border border-border
              px-5
              text-sm font-medium
              transition-colors
              hover:bg-surface
              disabled:opacity-50
            "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`
              h-11 rounded-xl
              px-5
              text-sm font-medium
              text-white
              transition-colors
              disabled:opacity-50

              ${destructive
                                ? `
                    bg-red-500
                    hover:bg-red-600
                  `
                                : `
                    bg-primary
                    hover:opacity-90
                  `
                            }
            `}
                    >
                        {loading
                            ? "Please wait..."
                            : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}