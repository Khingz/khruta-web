import { Link } from "@tanstack/react-router";
import { SearchBar } from "../SearchBar";

export const HeroSection = () => {
  return (
    <div>
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, #1B2A6B 0%, transparent 50%), radial-gradient(circle at 75% 70%, #5B3FD6 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          backgroundImage: "linear-gradient(180deg, #F8F7FF 0%, transparent 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 text-center">
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#1F2937] tracking-tight leading-[1.05]">
          The premium way to <br className="hidden sm:block" />
          <span className="gradient-text">land your next role.</span>
        </h1>
        <p className="mt-5 text-lg text-[#6B7280] max-w-2xl mx-auto">
          Khruta brings every step of your job search into one calm, beautifully designed workspace.
          From discovery to offer.
        </p>
        <div className="mt-8 max-w-3xl mx-auto">
          <SearchBar />
        </div>
        <p className="mt-4 text-sm text-[#6B7280]">
          Popular:{" "}
          <Link
            to="/jobs"
            search={{ q: "Frontend" } as any}
            className="text-[#5B3FD6] hover:underline"
          >
            Frontend
          </Link>
          {" · "}
          <Link
            to="/jobs"
            search={{ q: "Designer" } as any}
            className="text-[#5B3FD6] hover:underline"
          >
            Designer
          </Link>
          {" · "}
          <Link
            to="/jobs"
            search={{ remote: "Remote" } as any}
            className="text-[#5B3FD6] hover:underline"
          >
            Remote
          </Link>
          {" · "}
          <Link to="/jobs" search={{ q: "Data" } as any} className="text-[#5B3FD6] hover:underline">
            Data
          </Link>
        </p>
      </div>
    </div>
  );
};
