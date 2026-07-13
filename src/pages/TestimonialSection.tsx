import { Quote } from "lucide-react";

const testimonials = [
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
];

export const TestimonialSection = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">Loved by candidates</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
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
    </div>
  );
};
