import { PublicLayout } from "@/components/PublicLayout";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { RecentJobs } from "@/components/landingScreen/RecentJobs";
import { HeroSection } from "@/components/landingScreen/HeroSection";
import { CategorySection } from "@/components/landingScreen/CategorySection";
import { FeaturesSection } from "@/components/landingScreen/FeaturesSection";
import { HowSection } from "@/components/landingScreen/HowSection";
import { TestimonialSection } from "./TestimonialSection";
import { CTASection } from "@/components/landingScreen/CTASection";
import { jobsQueryOptions } from "@/queries/job.queries";

export function LandingPage() {
  const { data: response, isLoading } = useQuery(jobsQueryOptions());
  const recentJobs = response?.data?.items;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroSection />
      </section>

      {/* Recent jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {<RecentJobs recentJobs={recentJobs} isLoading={isLoading} />}
      </section>

      {/* Categories */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <CategorySection />
      </section>

      {/* Why Khruta */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <FeaturesSection />
      </section>

      {/* How it works */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <HowSection />
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <TestimonialSection />
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <CTASection />
      </section>
    </PublicLayout>
  );
}
