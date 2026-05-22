"use client"
import { useUserState } from "@/store/hooks";

export function ProfileAvatar() {
    const avatarUrl = useUserState('avatar')
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
                src={avatarUrl || ""}
                alt="Profile"
                className="h-full w-full object-cover"
            />
        </div>
    );
}