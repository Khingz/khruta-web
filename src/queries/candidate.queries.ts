import { fetchCandidateProfile } from "@/server/candidates/candidates.function";
import { queryOptions } from "@tanstack/react-query";

export const candidateProfileQuery = queryOptions({
  queryKey: ["candidate-profile"],
  queryFn: () => fetchCandidateProfile(),
  staleTime: 5 * 60 * 1000,
});
