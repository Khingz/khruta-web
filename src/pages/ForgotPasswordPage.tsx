import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { authApi } from "@/api/authApi";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <PublicLayout>
      <div className="max-w-md mx-auto px-4 py-16">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
        <div className="surface-card p-8">
          {done ? (
            <div className="text-center">
              <span className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm text-[#6B7280]">
                If an account exists for that email, we've sent a reset link.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold">Forgot password?</h1>
              <p className="text-[#6B7280] mt-1">Enter your email and we'll send a reset link.</p>
              <form
                onSubmit={handleSubmit(async ({ email }) => {
                  setLoading(true);
                  await authApi.forgotPassword(email);
                  setLoading(false);
                  setDone(true);
                })}
                className="mt-6 space-y-4"
              >
                <Input
                  label="Email"
                  type="email"
                  {...register("email", { required: "Required" })}
                  error={errors.email?.message}
                />
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  Send reset link
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
