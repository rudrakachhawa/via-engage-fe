"use client";
import {
    ArrowRight,
    Mail,
    Send,
    ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BackgroundGlow } from "@/components/marketing/background-glow";
import { Button } from "@/components/ui/button";

async function submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    // Send request with axios
    const res = await axios.post("https://flow.sokt.io/func/scri3keJfcgN", data, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

export default function ContactUsPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });

    const {
        mutate,
        status,
        isError,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: submitContactForm,
    });

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate(form);
    }

    const isFormComplete =
        form.name.trim() !== "" &&
        form.email.trim() !== "" &&
        form.subject.trim() !== "" &&
        form.message.trim() !== "";

    const isLoading = status === "pending";

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
            mx-auto
            flex max-w-6xl
            items-center justify-center
            px-6 pb-20
            lg:px-8
          "
            >
                <div
                    className="
              grid w-full
              grid-cols-1 gap-8
              lg:grid-cols-12
            "
                >
                    <div
                        className="
                space-y-8
                lg:col-span-7
              "
                    >
                        <div>
                            <h1
                                className="
                    text-5xl font-bold
                    tracking-tight
                    text-foreground
                    md:text-6xl
                  "
                            >
                                Get in Touch
                            </h1>

                            <p
                                className="
                    mt-4
                    max-w-2xl
                    text-lg leading-8
                    text-muted-foreground
                  "
                            >
                                Have a question about ezzzDM? Our automation experts are
                                here to help.
                            </p>
                        </div>

                        <div
                            className="
                  rounded-3xl
                  border border-border
                  bg-card
                  p-8
                  shadow-sm
                "
                        >
                            {isSuccess ? (
                                <div className="space-y-4 text-center">
                                    <div className="flex justify-center">
                                        <Send className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-green-700">Message sent!</h2>
                                    <p className="text-muted-foreground">
                                        Thank you for reaching out. We'll get back to you as soon as possible.
                                    </p>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setForm({
                                                name: "",
                                                email: "",
                                                subject: "General Inquiry",
                                                message: "",
                                            });
                                            reset();
                                        }}
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div
                                        className="
                      grid grid-cols-1
                      gap-6
                      md:grid-cols-2
                    "
                                    >
                                        <div className="space-y-2">
                                            <label
                                                className="
                          ml-1 text-sm
                          font-medium
                          text-muted-foreground
                        "
                                            >
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="
                          h-12 w-full
                          rounded-xl
                          border border-border
                          bg-background
                          px-4
                          outline-none
                          transition-all
                          focus:border-primary
                          focus:ring-4
                          focus:ring-primary/10
                        "
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                className="
                          ml-1 text-sm
                          font-medium
                          text-muted-foreground
                        "
                                            >
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="
                          h-12 w-full
                          rounded-xl
                          border border-border
                          bg-background
                          px-4
                          outline-none
                          transition-all
                          focus:border-primary
                          focus:ring-4
                          focus:ring-primary/10
                        "
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className="
                        ml-1 text-sm
                        font-medium
                        text-muted-foreground
                      "
                                        >
                                            Subject
                                        </label>

                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="
                        h-12 w-full
                        rounded-xl
                        border border-border
                        bg-background
                        px-4
                        outline-none
                        transition-all
                        focus:border-primary
                        focus:ring-4
                        focus:ring-primary/10
                      "
                                        >
                                            <option>General Inquiry</option>
                                            <option>Technical Support</option>
                                            <option>Billing Question</option>
                                            <option>Enterprise Solutions</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className="
                        ml-1 text-sm
                        font-medium
                        text-muted-foreground
                      "
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            rows={6}
                                            name="message"
                                            placeholder="Tell us how we can help..."
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            className="
                        w-full resize-none
                        rounded-xl
                        border border-border
                        bg-background
                        px-4 py-3
                        outline-none
                        transition-all
                        focus:border-primary
                        focus:ring-4
                        focus:ring-primary/10
                      "
                                        />
                                    </div>

                                    {isError && (
                                        <div className="rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
                                            There was an error sending your message. Please try again.
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="h-14 w-full"
                                        disabled={isLoading || !isFormComplete}
                                    >
                                        {isLoading ? (
                                            <>Sending...</>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="h-4 w-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div
                        className="
                space-y-6
                lg:col-span-5
              "
                    >
                        <div
                            className="
                  rounded-3xl
                  border border-border
                  bg-card
                  p-6
                  shadow-sm
                "
                        >
                            <div
                                className="
                    mb-6 flex
                    items-center gap-4
                  "
                            >
                                <div
                                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-full
                      bg-primary/10
                    "
                                >
                                    <ShieldCheck
                                        className="
                        h-6 w-6
                        text-primary
                      "
                                    />
                                </div>

                                <div>
                                    <h3
                                        className="
                        text-lg font-semibold
                      "
                                    >
                                        Direct Support
                                    </h3>

                                    <p
                                        className="
                        text-sm
                        text-muted-foreground
                      "
                                    >
                                        Average response: 2h
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="mailto:support@ezzzdm.org"
                                    className="
                      flex items-center gap-3
                      rounded-xl
                      p-3
                      transition-colors
                      hover:bg-surface
                    "
                                >
                                    <Mail
                                        className="
                        h-5 w-5
                        text-muted-foreground
                      "
                                    />

                                    <span
                                        className="
                        font-medium
                      "
                                    >
                                        support@ezzzdm.org
                                    </span>
                                </a>

                                <div
                                    className="
                      flex items-center gap-3
                      rounded-xl
                      p-3
                    "
                                >
                                    <span
                                        className="
                        text-sm
                        text-muted-foreground
                      "
                                    >
                                        Mon - Fri, 9am - 6pm EST
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                  rounded-3xl
                  border border-border
                  bg-card
                  p-6
                  shadow-sm
                "
                        >
                            <h3
                                className="
                    mb-5
                    text-sm font-semibold
                    uppercase tracking-[0.2em]
                    text-primary
                  "
                            >
                                Quick Resources
                            </h3>

                            <div className="space-y-4">
                                {[
                                    "Documentation",
                                    "Tutorials",
                                    "Community Forum",
                                ].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="
                        group flex
                        items-center justify-between
                        border-b border-border/50
                        pb-4
                        text-muted-foreground
                        transition-colors
                        hover:text-primary
                      "
                                    >
                                        <span>{item}</span>

                                        <ArrowRight
                                            className="
                          h-4 w-4
                          opacity-0
                          transition-all
                          group-hover:translate-x-1
                          group-hover:opacity-100
                        "
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div
                            className="
                  group relative
                  h-40 overflow-hidden
                  rounded-3xl
                  border border-border
                "
                        >
                            <img
                                src="
                    https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop
                  "
                                alt="Webinar"
                                className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                            />

                            <div
                                className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-primary/90
                    to-transparent
                  "
                            />

                            <div
                                className="
                    absolute bottom-4 left-4
                  "
                            >
                                <p
                                    className="
                      text-sm font-semibold
                      text-white
                    "
                                >
                                    Weekly Webinar
                                </p>

                                <p
                                    className="
                      mt-1 text-xs
                      text-white/80
                    "
                                >
                                    Learn advanced workflows
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer
                className="
            relative z-10
            border-t border-border
            bg-surface/30
            px-6 py-10
          "
            >
                <div
                    className="
              mx-auto flex
              max-w-6xl
              flex-col items-center
              justify-between gap-6
              md:flex-row
            "
                >
                    <div
                        className="
                flex items-center gap-2
              "
                    >
                        <img
                            src="/appIcon.png"
                            alt="Logo"
                            width={55}
                            height={60}
                        />
                        <span
                            className="
                  font-semibold
                "
                        >
                            ezzzDM
                        </span>

                        <span
                            className="
                  text-sm
                  text-muted-foreground
                "
                        >
                            © 2026 All rights reserved.
                        </span>
                    </div>

                    <div
                        className="
                flex gap-8
              "
                    >
                        {[
                            "Privacy",
                            "Terms",
                            "Security",
                        ].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="
                    text-xs font-semibold
                    uppercase tracking-[0.18em]
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}