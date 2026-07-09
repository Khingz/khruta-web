import { Link } from "@tanstack/react-router";
import { Button } from "../primitives/Button";
import { useUser } from "@clerk/tanstack-react-start";

export const CTASection = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div>
      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ backgroundImage: "linear-gradient(135deg,#1B2A6B 0%,#5B3FD6 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 80% 80%, #fff 0%, transparent 40%)",
          }}
        />
        <div className="relative px-6 sm:px-12 py-12 sm:py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Your next role is one step away.
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            {isLoaded && isSignedIn
              ? "Browse the latest openings and apply with just a few clicks."
              : "Create your free Khruta account and start applying in minutes."}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {isLoaded && !isSignedIn ? (
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#1B2A6B] border-transparent hover:bg-white/90"
                >
                  Create free account
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#1B2A6B] border-transparent hover:bg-white/90"
                >
                  To Dashboard
                </Button>
              </Link>
            )}
            <Link to="/jobs">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Browse jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
