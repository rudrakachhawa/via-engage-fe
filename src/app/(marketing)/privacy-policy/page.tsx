import {
    Bolt,
    CheckCircle2,
    Info,
    Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BackgroundGlow } from "@/components/marketing/background-glow";

export default function PrivacyPolicyPage() {
    return (
        <div
            className="
          relative min-h-screen
          overflow-hidden
          bg-background
        "
        >
            <BackgroundGlow />

            <main
                className="
            relative z-10
            flex justify-center
            px-6 py-16
            lg:px-8
          "
            >
                <div className="w-full max-w-4xl">
                    <div
                        className="
                mb-12
                flex items-center justify-center gap-3
              "
                    >

                        <span
                            className="
                            flex items-center
                  text-2xl font-bold
                  tracking-tight
                  text-primary
                "
                        >
                            <img
                                src="/appIcon.png"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                            ezzzDM
                        </span>
                    </div>

                    <section className="mb-12 text-center">
                        <h1
                            className="
                  text-5xl font-bold
                  tracking-tight
                  text-foreground
                "
                        >
                            Privacy Policy
                        </h1>

                        <p
                            className="
                  mt-4
                  text-sm font-medium
                  text-muted-foreground
                "
                        >
                            Last updated: May 22, 2026
                        </p>
                    </section>

                    <div
                        className="
                mb-12
                space-y-12
                rounded-[28px]
                border border-border
                bg-card
                p-8 shadow-sm
                md:p-12
              "
                    >
                        <section className="space-y-6">
                            <p
                                className="
                    leading-8
                    text-muted-foreground
                  "
                            >
                                This Privacy Policy describes our
                                policies and procedures on the
                                collection, use, and disclosure
                                of your information when you use
                                the Service and tells you about
                                your privacy rights and how the
                                law protects you.
                            </p>

                            <p
                                className="
                    leading-8
                    text-muted-foreground
                  "
                            >
                                We use your Personal Data to
                                provide and improve the Service.
                                By using the Service, you agree
                                to the collection and use of
                                information in accordance with
                                this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2
                                className="
                    mb-6
                    text-3xl font-semibold
                    tracking-tight
                    text-primary
                  "
                            >
                                Interpretation and Definitions
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3
                                        className="
                        mb-3
                        text-2xl font-semibold
                      "
                                    >
                                        Interpretation
                                    </h3>

                                    <p
                                        className="
                        leading-8
                        text-muted-foreground
                      "
                                    >
                                        The words of which the
                                        initial letter is capitalized
                                        have meanings defined under
                                        the following conditions.
                                    </p>
                                </div>

                                <div>
                                    <h3
                                        className="
                        mb-4
                        text-2xl font-semibold
                      "
                                    >
                                        Definitions
                                    </h3>

                                    <div className="space-y-5">
                                        {[
                                            {
                                                title: "Account",
                                                description:
                                                    "A unique account created for You to access our Service.",
                                            },
                                            {
                                                title: "Company",
                                                description:
                                                    "Refers to ezzzDM.",
                                            },
                                            {
                                                title: "Service",
                                                description:
                                                    "Refers to the Website and automation tools provided by ezzzDM.",
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.title}
                                                className="
                            flex gap-4
                          "
                                            >
                                                <Info
                                                    className="
                              mt-1 h-5 w-5
                              shrink-0
                              text-secondary
                            "
                                                />

                                                <p
                                                    className="
                              leading-7
                              text-muted-foreground
                            "
                                                >
                                                    <strong className="text-foreground">
                                                        {item.title}
                                                    </strong>{" "}
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2
                                className="
                    mb-6
                    text-3xl font-semibold
                    tracking-tight
                    text-primary
                  "
                            >
                                Collecting and Using Your
                                Personal Data
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3
                                        className="
                        mb-4
                        text-2xl font-semibold
                      "
                                    >
                                        Types of Data Collected
                                    </h3>

                                    <div
                                        className="
                        rounded-2xl
                        border border-border
                        bg-surface
                        p-6
                      "
                                    >
                                        <h4
                                            className="
                          mb-2
                          text-sm font-semibold
                        "
                                        >
                                            Personal Data
                                        </h4>

                                        <p
                                            className="
                          text-sm leading-7
                          text-muted-foreground
                        "
                                        >
                                            We may collect information
                                            such as your email address,
                                            name, and usage analytics
                                            required to provide and
                                            improve the platform.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3
                                        className="
                        mb-4
                        text-2xl font-semibold
                      "
                                    >
                                        Use of Your Personal Data
                                    </h3>

                                    <div className="space-y-4">
                                        {[
                                            "To provide and maintain our Service.",
                                            "To manage your account and registration.",
                                            "To communicate updates and notifications.",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="
                            flex gap-4
                          "
                                            >
                                                <CheckCircle2
                                                    className="
                              mt-1 h-5 w-5
                              shrink-0
                              text-primary
                            "
                                                />

                                                <p
                                                    className="
                              leading-7
                              text-muted-foreground
                            "
                                                >
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2
                                className="
                    mb-6
                    text-3xl font-semibold
                    tracking-tight
                    text-primary
                  "
                            >
                                Retention and Transfer of Data
                            </h2>

                            <div className="space-y-6">
                                <p
                                    className="
                      leading-8
                      text-muted-foreground
                    "
                                >
                                    We retain Personal Data only
                                    for as long as necessary to
                                    comply with legal obligations
                                    and improve the Service.
                                </p>

                                <p
                                    className="
                      leading-8
                      text-muted-foreground
                    "
                                >
                                    Your information may be
                                    processed in jurisdictions where
                                    our operational infrastructure
                                    exists.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2
                                className="
                    mb-6
                    text-3xl font-semibold
                    tracking-tight
                    text-primary
                  "
                            >
                                Contact Us
                            </h2>

                            <div
                                className="
                    flex items-center gap-4
                    rounded-2xl
                    border border-primary/20
                    bg-primary/5
                    p-6
                  "
                            >
                                <div
                                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-2xl
                      bg-primary/10
                    "
                                >
                                    <Mail
                                        className="
                        h-6 w-6
                        text-primary
                      "
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                        text-sm font-semibold
                      "
                                    >
                                        Email Support
                                    </p>

                                    <a
                                        href="mailto:support@ezzzdm.org"
                                        className="
                        mt-1 block
                        font-semibold
                        text-primary
                        hover:underline
                      "
                                    >
                                        support@ezzzdm.org
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>

                    <footer className="pb-24 text-center">
                        <p
                            className="
                  mb-6
                  text-sm
                  text-muted-foreground
                "
                        >
                            By continuing, you acknowledge
                            that you have read and understood
                            our Privacy Policy.
                        </p>

                        <div
                            className="
                  flex flex-col
                  justify-center gap-4
                  sm:flex-row
                "
                        >
                            <Button
                                variant="secondary"
                                size="lg"
                            >
                                Download PDF
                            </Button>

                            <Button size="lg">
                                Accept & Continue
                            </Button>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}