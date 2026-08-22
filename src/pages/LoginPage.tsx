import { PublicLayout } from "@/components/PublicLayout";
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
