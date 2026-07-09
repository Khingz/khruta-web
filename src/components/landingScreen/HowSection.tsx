import { FileText, Search, Send } from "lucide-react";

const steps = [
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
];

export const HowSection = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Three simple steps</h2>
          <p className="text-[#6B7280] mt-3">From account to offer, in days not months.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s) => (
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
    </div>
  );
};
