export function ProfileAvatar() {
    return (
        <div
            className="
          h-10 w-10
          overflow-hidden rounded-full
          border border-border
          shadow-sm
        "
        >
            <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
                className="h-full w-full object-cover"
            />
        </div>
    );
}