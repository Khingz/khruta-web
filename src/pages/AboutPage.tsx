import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/primitives/Button";
import { Link } from "@tanstack/react-router";
import { Heart, Compass, Sparkles, Users } from "lucide-react";

export function AboutPage() {
  return (
    <PublicLayout>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          A job search that respects your time.
        </h1>
        <p className="mt-5 text-lg text-[#6B7280]">
          Khruta is a candidate-first recruitment platform — built to make finding your next role
          feel calmer, clearer, and more human.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">Our mission</h2>
          <p className="mt-3 text-[#1F2937] leading-relaxed">
            Most job platforms optimize for recruiters. We optimize for the person actually doing
            the searching. Every flow, every page, every notification is designed to reduce friction
            and respect your attention.
          </p>
          <p className="mt-3 text-[#1F2937] leading-relaxed">
            We believe a great job search begins with great tools — fast, beautiful, and
            trustworthy.
          </p>
        </div>
        <div className="surface-card p-8 grid grid-cols-2 gap-6">
          {[
            { i: Heart, t: "Candidate-first" },
            { i: Compass, t: "Always honest" },
            { i: Sparkles, t: "Craft over noise" },
            { i: Users, t: "Inclusive by design" },
          ].map(({ i: Icon, t }) => (
            <div key={t}>
              <span className="h-10 w-10 grid place-items-center rounded-xl gradient-brand text-white">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-medium">{t}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 text-center">
        <h2 className="font-display text-3xl font-bold">Ready to start?</h2>
        <p className="text-[#6B7280] mt-2">
          Create your free account and explore thousands of roles.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/register">
            <Button size="lg">Create account</Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline">
              Browse jobs
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
