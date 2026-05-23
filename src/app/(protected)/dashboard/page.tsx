import { BenefitsGrid } from "@/components/dashboard/benefits-grid";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { SetupProgress } from "@/components/dashboard/setup-progress";
import { TipCard } from "@/components/dashboard/tip-card";
import { TutorialCard } from "@/components/dashboard/tutorial-card";

export default function DashboardPage() {
  return (

    <main
      className="
          mx-auto
          max-w-[1440px]
          px-6 py-12
          lg:px-8
        "
    >
      <DashboardHero />

      <section
        className="
    grid grid-cols-1
    items-stretch
    gap-6
    lg:grid-cols-12
  "
      >
        <div className="lg:col-span-7">
          <SetupProgress />
        </div>

        <div
          className="
              flex flex-col gap-6
              lg:col-span-5
            "
        >
          <TutorialCard />

          <TipCard />
        </div>
      </section>

      <div className="py-12" />

      <BenefitsGrid />
    </main>
  );
}