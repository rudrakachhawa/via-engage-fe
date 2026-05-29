"use client";

import { InstagramAuthButton } from "@/components/auth/instagram-auth-button";
import { useAutomationBuilder } from "@/hooks/use-automation-builder";
import { useUserData } from "@/hooks/user.hooks";

export function SelectAccountCard() {
    const { data } = useUserData();

    const instaAccounts = data?.instaAccounts || [];

    const {
        state,
        updateBuilder,
    } = useAutomationBuilder();

    return (
        <section
            className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
        shadow-sm
      "
        >
            <div
                className="
          border-b border-border
          bg-surface/30
          px-6 py-5
        "
            >
                <h2
                    className="
            text-2xl font-semibold
            tracking-tight
          "
                >
                    Step 1: Select Instagram
                    Profile
                </h2>

                <p
                    className="
            mt-1
            text-sm
            text-muted-foreground
          "
                >
                    Choose which Instagram account
                    should be used for this
                    automation.
                </p>
            </div>

            <div className="p-6">
                <div
                    className="
            grid grid-cols-1
            gap-4
            md:grid-cols-2
          "
                >
                    {instaAccounts.map(
                        (account: any) => {
                            const isSelected =
                                state.igUserId ===
                                account.igUserId;
                            return (
                                <button
                                    key={account.igUserId}
                                    onClick={() =>
                                        updateBuilder({
                                            igUserId:
                                                account.igUserId,

                                            instaAccount:
                                                account,
                                        })
                                    }
                                    className={`
                    flex items-center
                    justify-between
                    rounded-xl
                    border p-4
                    text-left
                    transition-all
                    ${isSelected
                                            ? `
                          border-primary
                          bg-primary/5
                          ring-1 ring-primary/20
                        `
                                            : `
                          border-border
                          hover:border-primary
                        `
                                        }
                  `}
                                >
                                    <div
                                        className="
                      flex items-center
                      gap-3
                    "
                                    >
                                        <div
                                            className="
                        h-11 w-11
                        overflow-hidden
                        rounded-full
                        border border-border
                        bg-surface
                      "
                                        >
                                            {account.avatar ? (
                                                <img
                                                    src={
                                                        account.avatar
                                                    }
                                                    alt={
                                                        account.name
                                                    }
                                                    className="
                            h-full w-full
                            object-cover
                          "
                                                />
                                            ) : null}
                                        </div>

                                        <div>
                                            <p
                                                className="
                          text-sm
                          font-semibold
                        "
                                            >
                                                @
                                                {
                                                    account.userName
                                                }
                                            </p>

                                            <p
                                                className="
                          text-xs
                          text-muted-foreground
                        "
                                            >
                                                {account.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`
                      h-5 w-5
                      rounded-full
                      border-2
                      ${isSelected
                                                ? `
                            border-primary
                            bg-primary
                          `
                                                : `
                            border-border
                          `
                                            }
                    `}
                                    />
                                </button>
                            );
                        }
                    )}
                </div>
                {/* Add spacing before Instagram Auth Button */}
                <div className="mt-6">
                    <InstagramAuthButton buttonText='Connect a new Instagram Account' />
                </div>
            </div>

        </section>
    );
}