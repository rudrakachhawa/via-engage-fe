import Link from "next/link";

export function AuthFooter() {
    return (
        <footer
            className="
        mt-8
        flex items-center justify-center gap-4
        text-sm text-muted-foreground
      "
        >
            <Link
                href="/terms"
                className="
          transition-colors
          hover:text-foreground
        "
            >
                Terms of Service
            </Link>

            <div
                className="
          h-1 w-1 rounded-full
          bg-border
        "
            />

            <Link
                href="/privacy-policy"
                className="
          transition-colors
          hover:text-foreground
        "
            >
                Privacy Policy
            </Link>
        </footer>
    );
}