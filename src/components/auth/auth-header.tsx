export function AuthHeader() {
    return (
        <div
            className="
          mb-12
          flex flex-col items-center
          text-center
        "
        >
            <div className="flex items-center justify-center mb-1 gap-2">
                <img
                    src="/appIcon.png"
                    alt="Logo"
                    width={70}
                    height={70}
                />
                <h1
                    className="
                    text-3xl font-bold
                    tracking-tight
                    text-primary
                  "
                >
                    ezzzDM
                </h1>
            </div>
            <p
                className="
                mt-3
                max-w-[320px]
                text-base leading-7
                text-muted-foreground
              "
            >
                Automate your Instagram engagement
                with enterprise-grade precision.
            </p>
        </div>
    );
}