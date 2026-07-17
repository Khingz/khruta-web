import { PublicLayout } from "@/components/PublicLayout";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { JobCard } from "@/components/JobCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFilters } from "@/schemas/job.schemas";

export function BrowseJobsPage() {
  const search = useSearch({ strict: false }) as JobFilters;
  const navigate = useNavigate();
  const [mobileFilters, setMobileFilters] = useState(false);

  const filters: JobFilters = {
    q: search.q,
    location: search.location,
    department: search.department,
    type: search.type,
    page: search.page ?? 1,
    pageSize: 10,
    minOffer: search.minOffer,
    maxOffer: search.maxOffer,
  };

  const { data: response, isLoading } = useQuery(jobsQueryOptions(filters));
  const jobs = response?.data;

  const setParam = (patch: Partial<JobFilters>) => {
    const next = { ...search, ...patch, page: 1 };
    Object.keys(next).forEach((k) => {
      if ((next as any)[k] === undefined || (next as any)[k] === "") delete (next as any)[k];
    });
    navigate({ to: "/jobs", search: next as any });
  };

  return (
    <PublicLayout>
      <div className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-display text-3xl font-bold">Browse jobs</h1>
          <p className="text-[#6B7280] mt-1">Find the right opportunity from our curated list.</p>
          <div className="mt-5">
            <SearchBar
              initialQ={filters.q || ""}
              initialLocation={filters.location || ""}
              variant="compact"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={(f) => setParam(f)} />
        </div>

        {isLoading ? (
          <LoadingSpinner size={40} label="Loading Job Openings" />
        ) : (
          <div className="min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6B7280]">{`${jobs && jobs.totalRecords} jobs found`}</p>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                className="lg:hidden"
                onClick={() => setMobileFilters(true)}
              >
                Filters
              </Button>
            </div>

            {!jobs.items.length ? (
              <EmptyState
                icon={<SearchIcon className="h-5 w-5" />}
                title="No jobs match your search"
                description="Try removing a filter or searching for a broader term."
              />
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {jobs.items.map((j: any) => (
                    <JobCard
                      key={j.Id}
                      job={{
                        id: j.Id,
                        title: j.Title,
                        company: j.CompanyName,
                        location: j.Location,
                        type: j.Type,
                        postedAt: j.OpenDate,
                        salaryMin: j.MinOffer,
                        salaryMax: j.MaxOffer,
                        currency: "USD",
                      }}
                    />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination
                    page={jobs.pageNumber}
                    pageSize={jobs.pageSize}
                    total={jobs.totalRecords}
                    onChange={(p) =>
                      navigate({ to: "/jobs", search: { ...search, page: p } as any })
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {mobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilters(false)} />
          <div className="relative ml-auto w-[85%] max-w-sm bg-white h-full overflow-y-auto p-4">
            <FilterSidebar
              filters={filters}
              onChange={(f) => {
                setParam(f);
                setMobileFilters(false);
              }}
            />
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
