import { PublicLayout } from "@/components/PublicLayout";
import { SignUp } from "@clerk/tanstack-react-start";

export function RegisterPage() {
  return (
    <PublicLayout noFooter>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <SignUp />
      </div>
    </PublicLayout>
  );
}
