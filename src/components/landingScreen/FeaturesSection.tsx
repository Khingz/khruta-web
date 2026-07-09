import { Heart, ShieldCheck, Zap } from "lucide-react";

const features = [
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
];

export const FeaturesSection = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">Why Khruta</h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          A platform shaped around the person actually doing the searching.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="surface-card p-7">
            <span className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-white">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="font-display font-semibold text-lg mt-5">{f.title}</h3>
            <p className="text-[#6B7280] mt-2 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
