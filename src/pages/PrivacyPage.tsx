import { PublicLayout } from "@/components/PublicLayout";

const sections: { h: string; p: string }[] = [
  {
    h: "1. Information we collect",
    p: "We collect information you provide when you create an account, upload a resume, or apply to roles. This includes your name, email, work history, and any documents you choose to upload.",
  },
  {
    h: "2. How we use information",
    p: "We use your information to power your candidate experience — matching you with roles, tracking applications, and notifying you of updates from employers.",
  },
  {
    h: "3. Sharing",
    p: "We only share your information with employers when you explicitly apply to one of their roles. We never sell your personal data.",
  },
  {
    h: "4. Security",
    p: "We use industry-standard encryption in transit and at rest, regular security reviews, and least-privilege access controls.",
  },
  {
    h: "5. Your rights",
    p: "You can access, export, or delete your data at any time from Account Settings.",
  },
  { h: "6. Contact", p: "Questions about privacy? Email privacy@khruta.com." },
];

export function PrivacyPage() {
  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
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
