const users = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
];

export function TrustedUsers() {
    return (
        <div
            className="
          mt-8
          border-t border-border/60
          pt-8
        "
        >
            <div
                className="
            flex items-center gap-4
          "
            >
                <div className="flex -space-x-3">
                    {users.map((user, index) => (
                        <img
                            key={index}
                            src={user}
                            alt="User"
                            className="
                  h-10 w-10 rounded-full
                  border-2 border-white
                  object-cover
                "
                        />
                    ))}
                </div>

                <span
                    className="
              text-sm font-medium
              text-muted-foreground
            "
                >
                    Trusted by 2,500+ professionals
                </span>
            </div>
        </div>
    );
}