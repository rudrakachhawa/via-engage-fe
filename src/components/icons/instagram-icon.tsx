interface InstagramIconProps {
    className?: string;
}

export function InstagramIcon({
    className,
}: InstagramIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
        >
            <defs>
                <linearGradient
                    id="instagram-gradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#f58529"
                    />

                    <stop
                        offset="30%"
                        stopColor="#feda77"
                    />

                    <stop
                        offset="60%"
                        stopColor="#dd2a7b"
                    />

                    <stop
                        offset="85%"
                        stopColor="#8134af"
                    />

                    <stop
                        offset="100%"
                        stopColor="#515bd4"
                    />
                </linearGradient>
            </defs>

            <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="6"
                stroke="url(#instagram-gradient)"
                strokeWidth="2"
            />

            <circle
                cx="12"
                cy="12"
                r="4.5"
                stroke="url(#instagram-gradient)"
                strokeWidth="2"
            />

            <circle
                cx="17.2"
                cy="6.8"
                r="1.2"
                fill="url(#instagram-gradient)"
            />
        </svg>
    );
}