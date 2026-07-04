import { PublicLayout } from "@/components/PublicLayout";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/primitives/Button";

export function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="min-h-[60vh] grid place-items-center px-4 text-center">
        <div>
          <p className="font-display text-7xl font-bold gradient-text">404</p>
          <h1 className="mt-3 font-display text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-[#6B7280]">
            The page you're looking for doesn't exist or has moved.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/">
              <Button>Go home</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline">Browse jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
