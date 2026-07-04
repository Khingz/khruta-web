import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/Toast";
import { Mail, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SignIn } from "@clerk/react";

export function LoginPage() {
  return (
    <PublicLayout noFooter>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <SignIn />
      </div>
    </PublicLayout>
  );
}
