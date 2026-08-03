import { IntFilters } from "@/schemas/interview.schemas";
import { getUserInts } from "@/server/interviews/interviews.function";
import { queryOptions } from "@tanstack/react-query";

export const intsQueryOptions = (filters: IntFilters) =>
  queryOptions({
    queryKey: ["interviews", filters],
    queryFn: () => getUserInts({ data: filters }),
  });
