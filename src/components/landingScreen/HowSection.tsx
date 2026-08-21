import { useCountUp } from "@/hooks/use-countup";
import { useInView } from "@/hooks/use-inview";
import { FileText, Search, Send } from "lucide-react";

const steps = [
  {
    n: 1,
    icon: FileText,
    title: "Build your profile",
    body: "Upload your resume, add skills, and Khruta personalizes everything.",
  },
  {
    n: 2,
    icon: Search,
    title: "Discover roles",
    body: "Search and filter thousands of openings tailored to your goals.",
  },
  {
    n: 3,
    icon: Send,
    title: "Apply & track",
    body: "Apply in one click, follow interview progress, and respond to offers.",
  },
];

function StepCard({
  step,
  isInView,
}: {
  step: {
    n: number;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
  };
  isInView: boolean;
}) {
  const count = useCountUp(step.n, 1500, isInView);

  return (
    <div className="surface-card p-7 hover:shadow-lift hover:border-[#C7D2FE] transition-all">
      <div className="flex items-center justify-between">
        <span className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-white">
          <step.icon className="h-5 w-5" />
        </span>
        <span className="font-display text-3xl font-bold gradient-text tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display font-semibold text-lg mt-5">{step.title}</h3>
      <p className="text-[#6B7280] mt-2 leading-relaxed">{step.body}</p>
    </div>
  );
}

export const HowSection = () => {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Three simple steps</h2>
          <p className="text-[#6B7280] mt-3">From account to offer, in days not months.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s) => (
            <StepCard key={s.n} step={s} isInView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
};
