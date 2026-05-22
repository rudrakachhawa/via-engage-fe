"use client";

import { useUserData } from "@/hooks/user.hooks";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface InstagramAccount {
    userName: string;
    name: string;
    avatar: string;
    igUserId: string;
}

export function InstagramAccountsDropdown({ onSelect }: { onSelect: (igUserId: string) => void }) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    const instaaccounts =
        useUserData().data.user
            .instaAccounts as InstagramAccount[];

    const [selectedAccount, setSelectedAccount] =
        useState<InstagramAccount | null>(
            instaaccounts?.[0] || null
        );

    const handleSelect = (
        account: InstagramAccount
    ) => {
        setSelectedAccount(account);
        onSelect(account?.igUserId)
        setOpen(false);
    };

    const handleAddAccount = () => {
        router.push("/instaaccounts");
    };

    return (
        <div className="relative">
            <button
                onClick={() =>
                    setOpen(!open)
                }
                className="
          flex items-center gap-3
          rounded-xl
          border border-border
          bg-card
          px-4 py-2.5
          shadow-sm
          transition-colors
          hover:bg-surface
        "
            >
                {selectedAccount ? (
                    <>
                        <img
                            src={
                                selectedAccount.avatar
                            }
                            alt={
                                selectedAccount.name
                            }
                            className="
                h-8 w-8 rounded-full
                object-cover
              "
                        />

                        <div
                            className="
                flex flex-col
                items-start
              "
                        >
                            <span
                                className="
                  text-sm font-semibold
                  text-foreground
                "
                            >
                                {
                                    selectedAccount.name
                                }
                            </span>

                            <span
                                className="
                  text-xs
                  text-muted-foreground
                "
                            >
                                @
                                {
                                    selectedAccount.userName
                                }
                            </span>
                        </div>
                    </>
                ) : (
                    <span
                        className="
              text-sm
              text-muted-foreground
            "
                    >
                        No Instagram Accounts
                    </span>
                )}

                <ChevronDown
                    className={`
            h-4 w-4
            text-muted-foreground
            transition-transform
            ${open
                            ? "rotate-180"
                            : ""
                        }
          `}
                />
            </button>

            {open && (
                <div
                    className="
            absolute right-0 top-full
            z-50 mt-3
            w-[320px]
            overflow-hidden
            rounded-2xl
            border border-border
            bg-card
            shadow-xl
          "
                >
                    <div className="p-2">
                        {instaaccounts?.map(
                            (account) => (
                                <button
                                    key={
                                        account.userName
                                    }
                                    onClick={() =>
                                        handleSelect(
                                            account
                                        )
                                    }
                                    className="
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-left
                    transition-colors
                    hover:bg-surface
                  "
                                >
                                    <img
                                        src={
                                            account.avatar
                                        }
                                        alt={
                                            account.name
                                        }
                                        className="
                      h-10 w-10
                      rounded-full
                      object-cover
                    "
                                    />

                                    <div>
                                        <p
                                            className="
                        text-sm font-semibold
                      "
                                        >
                                            {account.name}
                                        </p>

                                        <p
                                            className="
                        text-xs
                        text-muted-foreground
                      "
                                        >
                                            @
                                            {
                                                account.userName
                                            }
                                        </p>
                                    </div>
                                </button>
                            )
                        )}

                        <div
                            className="
                my-2 h-px
                bg-border
              "
                        />

                        <button
                            onClick={
                                handleAddAccount
                            }
                            className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                transition-colors
                hover:bg-surface
              "
                        >
                            <div
                                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-dashed
                  border-primary/30
                  bg-primary/5
                "
                            >
                                <Plus
                                    className="
                    h-5 w-5
                    text-primary
                  "
                                />
                            </div>

                            <div>
                                <p
                                    className="
                    text-sm font-semibold
                    text-primary
                  "
                                >
                                    Add New Account
                                </p>

                                <p
                                    className="
                    text-xs
                    text-muted-foreground
                  "
                                >
                                    Connect another Instagram
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}