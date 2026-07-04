import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { authApi } from "@/api/authApi";
import { useToast } from "@/components/Toast";

export function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string; confirm: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { push } = useToast();
  const password = watch("password");

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="surface-card p-8">
          <h1 className="font-display text-2xl font-bold">Set a new password</h1>
          <p className="text-[#6B7280] mt-1">Choose something strong — at least 8 characters.</p>
          <form
            onSubmit={handleSubmit(async ({ password }) => {
              setLoading(true);
              await authApi.resetPassword("token", password);
              setLoading(false);
              push({
                tone: "success",
                title: "Password updated",
                description: "You can now sign in.",
              });
              navigate({ to: "/login" });
            })}
            className="mt-6 space-y-4"
          >
            <Input
              label="New password"
              type="password"
              {...register("password", {
                required: "Required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              error={errors.password?.message}
            />
            <Input
              label="Confirm password"
              type="password"
              {...register("confirm", {
                required: "Required",
                validate: (v) => v === password || "Passwords don't match",
              })}
              error={errors.confirm?.message}
            />
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Update password
            </Button>
            <p className="text-sm text-center text-[#6B7280]">
              <Link to="/login" className="text-[#5B3FD6] hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
