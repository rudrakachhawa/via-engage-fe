"use client";

import { InstagramAuthButton } from "@/components/auth/instagram-auth-button";
import { useUserData } from "@/hooks/user.hooks";
import { AlertModal } from "@/components/ui/alert-modal";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { removeIgAccountApi } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { useAutomations } from "@/hooks/automation.hooks";

export default function IgAccountsPage() {
    const { data: user, refetch: refetchUserData } = useUserData();
    const { refetch: refetchAllAutomations } = useAutomations()
    const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
    const accounts = user?.instaAccounts || [];

    const {
        mutate: removeAccountMutate,
        status: removeStatus,
    } = useMutation({
        mutationFn: async (igUserId: string) => {
            return removeIgAccountApi(igUserId);
        },
        onSuccess: async () => {
            setSelectedAccount(null);
            refetchUserData();
            refetchAllAutomations();
        },
        onError: (error) => {
            // Optionally handle error
            // eslint-disable-next-line no-console
            console.error("Failed to remove account:", error);
        },
    });

    const removeLoading = removeStatus === "pending";

    const handleRemoveAccount = () => {
        if (!selectedAccount?.igUserId) return;
        // Prefer id, fallback to userName
        removeAccountMutate(selectedAccount.igUserId);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1
                    className="
            text-3xl font-bold
            tracking-tight
          "
                >
                    Instagram Accounts
                </h1>

                <p
                    className="
            mt-2
            text-muted-foreground
          "
                >
                    Manage connected Instagram
                    profiles used for your
                    automations.
                </p>
            </div>

            {/* Accounts List */}
            {/* Accounts Grid */}
            <div
                className="
    grid grid-cols-1
    gap-4
    md:grid-cols-2
    xl:grid-cols-3
  "
            >
                {/* Existing Accounts */}
                {accounts.map(
                    (account: any) => (
                        <div
                            key={account.userName}
                            className="
          flex items-center
          justify-between
          rounded-2xl
          border border-border
          bg-card
          px-5 py-4
        "
                        >
                            <div
                                className="
            flex items-center
            gap-4
            overflow-hidden
          "
                            >
                                <img
                                    src={account.avatar}
                                    alt={account.userName}
                                    className="
              h-12 w-12
              shrink-0
              rounded-xl
              object-cover
            "
                                />

                                <div className="min-w-0">
                                    <p
                                        className="
                truncate
                text-sm
                font-semibold
              "
                                    >
                                        @{account.userName}
                                    </p>

                                    <p
                                        className="
                truncate
                text-sm
                text-muted-foreground
              "
                                    >
                                        {account.name}
                                    </p>
                                </div>
                            </div>

                            <button
                                className="
            flex h-10 w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-red-500
            transition-colors
            hover:bg-red-50
          "
                                onClick={() => setSelectedAccount(account)}
                            >
                                <Trash2
                                    className="
              h-4 w-4
            "
                                />
                            </button>
                        </div>
                    )
                )}

                {/* Add Account */}
                <div
                    className="
      flex items-center
      justify-between
      rounded-2xl
      border border-dashed
      border-border
      bg-card
      px-5 py-4
    "
                >
                    <div>
                        <p
                            className="
          text-sm
          font-semibold
        "
                        >
                            Connect a new Instagram Account
                        </p>
                    </div>

                    <InstagramAuthButton />
                </div>
            </div>
            <AlertModal
                open={!!selectedAccount}
                title="Remove Instagram Profile"
                description={`Are you sure you want to remove @${selectedAccount?.userName}?

All automations connected to this profile will be paused and deleted.`}
                confirmText="Remove Profile"
                destructive
                loading={removeLoading}
                onClose={() =>
                    setSelectedAccount(null)
                }
                onConfirm={handleRemoveAccount}
            />
        </div>
    );
}