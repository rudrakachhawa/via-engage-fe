"use client";

const Guides = [
    {
        title: "How to Add an Instagram Account",
        description:
            "Learn how to securely connect your Instagram profile to our platform and set it up for seamless automation.",
        category: "Getting Started",
        youtubeId: "xeXV1KoX034",
    },
    {
        title: "Setting Up Story Reply Automation",
        description:
            "Discover how to automatically send replies when users interact with your Instagram Stories.",
        category: "Automation",
        youtubeId: "xeXV1KoX034",
    },
    {
        title: "Automated DM Replies Using Keywords",
        description:
            "Find out how to respond instantly to incoming Instagram DMs by setting up keyword-based automation.",
        category: "Automation",
        youtubeId: "xeXV1KoX034",
    },
    {
        title: "Automate Public Comment Replies and DM Follow-Ups",
        description:
            "Learn how to reply to comments on your posts and follow up with automatic DMs to increase engagement.",
        category: "Automation",
        youtubeId: "xeXV1KoX034",
    },
];

function TutorialCard({
    title,
    description,
    youtubeId,
}: {
    title: string;
    description: string;
    youtubeId: string;
}) {
    return (
        <div
            className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
      "
        >
            <div
                className="
          aspect-video
          overflow-hidden
        "
            >
                <iframe
                    className="
            h-full
            w-full
          "
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    allowFullScreen
                    title={title}
                />
            </div>

            <div className="p-5">
                <h3
                    className="
            font-semibold
            text-lg
          "
                >
                    {title}
                </h3>

                <p
                    className="
            mt-2
            text-sm
            text-muted-foreground
          "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function GuidesPage() {
    const gettingStarted =
        Guides.filter(
            t =>
                t.category ===
                "Getting Started"
        );

    const automationGuides =
        Guides.filter(
            t =>
                t.category ===
                "Automation"
        );

    return (
        <div className="space-y-12">
            {/* Header */}

            <div>
                <h1
                    className="
            text-3xl font-bold
            tracking-tight
          "
                >
                    Guides
                </h1>

                <p
                    className="
            mt-2
            text-muted-foreground
          "
                >
                    Learn step-by-step how to connect your Instagram account and use automation features to boost your productivity and engagement.
                </p>
            </div>

            {/* Getting Started */}

            <section className="space-y-5">
                <h2
                    className="
            text-xl
            font-semibold
          "
                >
                    Getting Started
                </h2>

                <div
                    className="
            grid gap-6
            md:grid-cols-2
          "
                >
                    {gettingStarted.map(
                        tutorial => (
                            <TutorialCard
                                key={
                                    tutorial.title
                                }
                                {...tutorial}
                            />
                        )
                    )}
                </div>
            </section>

            {/* Automation */}

            <section className="space-y-5">
                <h2
                    className="
            text-xl
            font-semibold
          "
                >
                    Automation Guides
                </h2>

                <div
                    className="
            grid gap-6
            md:grid-cols-2
          "
                >
                    {automationGuides.map(
                        tutorial => (
                            <TutorialCard
                                key={
                                    tutorial.title
                                }
                                {...tutorial}
                            />
                        )
                    )}
                </div>
            </section>
        </div>
    );
}