import { useState } from "react";
import { useForm } from "react-hook-form";
import { PublicLayout } from "@/components/PublicLayout";
import { Input, Textarea } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { useToast } from "@/components/Toast";
import { Mail, Phone, MapPin } from "lucide-react";

type Form = { name: string; email: string; subject: string; message: string };

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (_d: Form) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    reset();
    push({
      tone: "success",
      title: "Message sent",
      description: "We'll get back to you within one business day.",
    });
  };

  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-[1fr_2fr] gap-12">
        <div>
          <h1 className="font-display text-3xl font-bold">Get in touch</h1>
          <p className="text-[#6B7280] mt-3">
            Questions, feedback, or partnership ideas? We're here to listen.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="h-9 w-9 grid place-items-center rounded-lg bg-[#EEF0FB] text-[#5B3FD6]">
                <Mail className="h-4 w-4" />
              </span>
              hello@khruta.com
            </li>
            <li className="flex items-center gap-3">
              <span className="h-9 w-9 grid place-items-center rounded-lg bg-[#EEF0FB] text-[#5B3FD6]">
                <Phone className="h-4 w-4" />
              </span>
              +1 (555) 010-1234
            </li>
            <li className="flex items-center gap-3">
              <span className="h-9 w-9 grid place-items-center rounded-lg bg-[#EEF0FB] text-[#5B3FD6]">
                <MapPin className="h-4 w-4" />
              </span>
              San Francisco · Remote-first
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name", { required: "Required" })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
          </div>
          <Input
            label="Subject"
            placeholder="What's it about?"
            error={errors.subject?.message}
            {...register("subject", { required: "Required" })}
          />
          <Textarea
            label="Message"
            placeholder="Tell us a bit more…"
            rows={5}
            error={errors.message?.message}
            {...register("message", {
              required: "Required",
              minLength: { value: 10, message: "At least 10 characters" },
            })}
          />
          <Button type="submit" loading={loading} size="lg" className="w-full">
            Send message
          </Button>
        </form>
      </section>
    </PublicLayout>
  );
}
