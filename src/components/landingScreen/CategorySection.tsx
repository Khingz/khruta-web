import { CATEGORIES } from "@/api/mockData";
import { Link } from "@tanstack/react-router";
import {
  Code2,
  Database,
  Layers,
  Palette,
  Megaphone,
  TrendingUp,
  Settings2,
  Wallet,
} from "lucide-react";

const ICONS: Record<string, any> = {
  Code2,
  Palette,
  Layers,
  Database,
  Megaphone,
  TrendingUp,
  Settings2,
  Wallet,
};

export const CategorySection = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Browse by category</h2>
          <p className="text-[#6B7280] mt-2">Find your specialty across thousands of roles.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <Link
                key={c.slug}
                to="/jobs"
                search={{ category: c.name } as any}
                className="surface-card p-5 hover:shadow-lift hover:border-[#C7D2FE] transition-all flex items-center gap-3"
              >
                <span className="h-10 w-10 rounded-xl gradient-brand text-white grid place-items-center">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-[#1F2937]">{c.name}</p>
                  <p className="text-xs text-[#6B7280]">Explore roles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
