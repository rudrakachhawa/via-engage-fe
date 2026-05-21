import { Play } from "lucide-react";

export function TutorialCard() {
    return (
        <div
            className="
        group relative
      flex min-h-[320px] flex-1
        flex-col justify-end
        overflow-hidden
        rounded-2xl
        bg-[#111827]
        p-6
        text-white
      "
        >
            <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                alt="Tutorial"
                className="
          absolute inset-0
          h-full w-full
          object-cover
          opacity-40
          transition-transform duration-700
          group-hover:scale-105
        "
            />

            <div
                className="
          absolute inset-0
          bg-gradient-to-t
          from-black/80
          to-transparent
        "
            />

            <div className="relative z-10">
                <button
                    className="
            mb-4
            flex h-12 w-12
            items-center justify-center
            rounded-full
            bg-white/10
            backdrop-blur-md
            transition-colors
            hover:bg-white/20
          "
                >
                    <Play className="h-5 w-5 fill-white" />
                </button>

                <h3
                    className="
            text-2xl font-semibold
            tracking-tight
          "
                >
                    Quick Start Guide
                </h3>

                <p
                    className="
            mt-1
            text-sm text-white/80
          "
                >
                    Learn the essentials in under 3 minutes.
                </p>
            </div>
        </div>
    );
}