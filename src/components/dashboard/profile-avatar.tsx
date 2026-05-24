"use client"
import { useAppDispatch, useUserState } from "@/store/hooks";
import { clearUser } from "@/store/slices/userSlice";
import { clearAllStorage } from "@/utils/localStorageUtility";
import { useEffect, useRef, useState } from "react";

export function ProfileAvatar() {
    const avatarUrl = useUserState('avatar');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    function handleDocumentClick(event: MouseEvent) {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }
    }
    // Add/remove event listener for clicks outside
    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleDocumentClick);
        } else {
            document.removeEventListener("mousedown", handleDocumentClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, [menuOpen]);

    const handleLogout = () => {
        clearAllStorage()
        dispatch(clearUser())
    };

    return (
        <div className="relative" ref={menuRef}>
            <div
                className="
                    h-10 w-10
                    overflow-hidden rounded-full
                    border border-border
                    shadow-sm
                    cursor-pointer
                "
                onClick={() => setMenuOpen((prev) => !prev)}
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
            >
                <img
                    src={avatarUrl || ""}
                    alt="Profile"
                    className="h-full w-full object-cover"
                />
            </div>
            {menuOpen && (
                <div
                    className="
                        absolute right-0 mt-2
                        min-w-[120px]
                        rounded-md
                        bg-popover
                        border border-border
                        shadow-lg z-50
                        py-1
                    "
                >
                    <button
                        onClick={handleLogout}
                        className="
                            w-full flex items-center
                            px-4 py-2
                            text-sm text-left
                            text-destructive hover:bg-red-50
                            rounded-md transition
                        "
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}