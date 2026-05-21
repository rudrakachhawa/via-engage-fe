export function BackgroundGlow() {
    return (
        <div
            className="
          pointer-events-none
          fixed inset-0
          -z-10
          overflow-hidden
        "
        >
            <div
                className="
            absolute right-[-120px] top-[-120px]
            h-[420px] w-[420px]
            rounded-full
            bg-primary/20
            blur-[120px]
          "
            />

            <div
                className="
            absolute bottom-[-80px] left-[-80px]
            h-[300px] w-[300px]
            rounded-full
            bg-secondary/20
            blur-[120px]
          "
            />
        </div>
    );
}