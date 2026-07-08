import { PublicLayout } from "@/components/PublicLayout";
import { SearchBar } from "@/components/SearchBar";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { CATEGORIES } from "@/api/mockData";
import {
  ArrowRight,
  Sparkles,
  Search,
  FileText,
  Send,
  ShieldCheck,
  Zap,
  Heart,
  Quote,
  Code2,
  Palette,
  Layers,
  Database,
  Megaphone,
  TrendingUp,
  Settings2,
  Wallet,
} from "lucide-react";

const ICONS: Record<string, any> = {
  Code2,
  Palette,
  Layers,
  Database,
  Megaphone,
  TrendingUp,
  Settings2,
  Wallet,
};

export function LandingPage() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: () => jobsApi.featured(),
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, #1B2A6B 0%, transparent 50%), radial-gradient(circle at 75% 70%, #5B3FD6 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[600px]"
          style={{
            backgroundImage: "linear-gradient(180deg, #F8F7FF 0%, transparent 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 text-center">
          <Badge tone="brand" className="mb-5">
            <Sparkles className="h-3 w-3" />
            Built for candidates first
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#1F2937] tracking-tight leading-[1.05]">
            The premium way to <br className="hidden sm:block" />
            <span className="gradient-text">land your next role.</span>
          </h1>
          <p className="mt-5 text-lg text-[#6B7280] max-w-2xl mx-auto">
            Khruta brings every step of your job search into one calm, beautifully designed
            workspace — from discovery to offer.
          </p>
          <div className="mt-8 max-w-3xl mx-auto">
            <SearchBar />
          </div>
          <p className="mt-4 text-sm text-[#6B7280]">
            Popular:{" "}
            <Link
              to="/jobs"
              search={{ q: "Frontend" } as any}
              className="text-[#5B3FD6] hover:underline"
            >
              Frontend
            </Link>
            {" · "}
            <Link
              to="/jobs"
              search={{ q: "Designer" } as any}
              className="text-[#5B3FD6] hover:underline"
            >
              Designer
            </Link>
            {" · "}
            <Link
              to="/jobs"
              search={{ remote: "Remote" } as any}
              className="text-[#5B3FD6] hover:underline"
            >
              Remote
            </Link>
            {" · "}
            <Link
              to="/jobs"
              search={{ q: "Data" } as any}
              className="text-[#5B3FD6] hover:underline"
            >
              Data
            </Link>
          </p>
        </div>
      </section>

      {/* Recent jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Most Recent Opportunities
            </h2>
            <p className="text-[#6B7280] mt-1">
              Fresh opportunities, added to the board regularly.
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-sm font-medium text-[#5B3FD6] hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.slice(0, 6).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Browse by category</h2>
            <p className="text-[#6B7280] mt-2">Find your specialty across thousands of roles.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <Link
                  key={c.slug}
                  to="/jobs"
                  search={{ category: c.name } as any}
                  className="surface-card p-5 hover:shadow-lift hover:border-[#C7D2FE] transition-all flex items-center gap-3"
                >
                  <span className="h-10 w-10 rounded-xl gradient-brand text-white grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-[#1F2937]">{c.name}</p>
                    <p className="text-xs text-[#6B7280]">Explore roles</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Khruta */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Why Khruta</h2>
          <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
            A platform shaped around the person actually doing the searching.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Effortless tracking",
              body: "Every application, interview, and offer lives in one calm dashboard you'll actually want to open.",
            },
            {
              icon: ShieldCheck,
              title: "Privacy by default",
              body: "Your data is yours. Share what you want, when you want. Nothing else.",
            },
            {
              icon: Heart,
              title: "Built for humans",
              body: "Generous spacing, fast pages, and accessible by design — for the long search ahead.",
            },
          ].map((f) => (
            <div key={f.title} className="surface-card p-7">
              <span className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display font-semibold text-lg mt-5">{f.title}</h3>
              <p className="text-[#6B7280] mt-2 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Three simple steps</h2>
            <p className="text-[#6B7280] mt-3">From account to offer, in days not months.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                n: "01",
                icon: FileText,
                title: "Build your profile",
                body: "Upload your resume, add skills, and Khruta personalizes everything.",
              },
              {
                n: "02",
                icon: Search,
                title: "Discover roles",
                body: "Search and filter thousands of openings tailored to your goals.",
              },
              {
                n: "03",
                icon: Send,
                title: "Apply & track",
                body: "Apply in one click, follow interview progress, and respond to offers.",
              },
            ].map((s) => (
              <div key={s.n} className="surface-card p-7">
                <div className="flex items-center justify-between">
                  <span className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-bold gradient-text">{s.n}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mt-5">{s.title}</h3>
                <p className="text-[#6B7280] mt-2 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Loved by candidates</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya S.",
              role: "Product Designer",
              quote: "I tried five job boards. Khruta is the only one that didn't feel like work.",
            },
            {
              name: "Marcus L.",
              role: "Senior Engineer",
              quote: "The application tracker alone is worth it. Cleanest UX in the category.",
            },
            {
              name: "Sofía R.",
              role: "Data Scientist",
              quote: "Got an offer in three weeks. Khruta kept everything in one place.",
            },
          ].map((t) => (
            <div key={t.name} className="surface-card p-7">
              <Quote className="h-5 w-5 text-[#5B3FD6]" />
              <p className="mt-4 text-[#1F2937] leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-brand text-white grid place-items-center font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ backgroundImage: "linear-gradient(135deg,#1B2A6B 0%,#5B3FD6 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 80% 80%, #fff 0%, transparent 40%)",
            }}
          />
          <div className="relative px-6 sm:px-12 py-12 sm:py-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Your next role is one step away.
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Create your free Khruta account and start applying in minutes.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#1B2A6B] border-transparent hover:bg-white/90"
                >
                  Create free account
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Browse jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
