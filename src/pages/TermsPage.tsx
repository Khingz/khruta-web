import { PublicLayout } from "@/components/PublicLayout";

const sections: { h: string; p: string }[] = [
  {
    h: "1. Acceptance",
    p: "By using Khruta you agree to these Terms of Service. If you don't agree, please don't use the platform.",
  },
  { h: "2. Eligibility", p: "You must be at least 16 years old to create an account." },
  {
    h: "3. Your account",
    p: "You're responsible for keeping your credentials safe and for activity on your account.",
  },
  {
    h: "4. Acceptable use",
    p: "Don't misrepresent yourself, scrape the platform, or submit applications you don't intend to follow through on.",
  },
  {
    h: "5. Content",
    p: "You retain ownership of content you upload. You grant Khruta a license to display it to employers you apply to.",
  },
  {
    h: "6. Termination",
    p: "You can close your account at any time from settings. We may suspend accounts that violate these terms.",
  },
  {
    h: "7. Disclaimer",
    p: "Khruta is provided as-is, without warranties. We do not guarantee employment outcomes.",
  },
];

export function TermsPage() {
  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <p className="text-[#6B7280] mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-semibold">{s.h}</h2>
              <p className="mt-2 text-[#1F2937] leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
    </PublicLayout>
  );
}
