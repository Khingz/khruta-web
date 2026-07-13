// import { QueryClient } from "@tanstack/react-query";
// import { createRouter } from "@tanstack/react-router";
// import { routeTree } from "./routeTree.gen";

// export const getRouter = () => {
//   const queryClient = new QueryClient();

//   const router = createRouter({
//     routeTree,
//     context: { queryClient },
//     scrollRestoration: true,
//     defaultPreloadStaleTime: 0,
//   });

//   return router;
// };

// src/router.tsx
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000 } },
  });

  return routerWithQueryClient(
    createRouter({
      routeTree,
      context: { queryClient },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      defaultPreload: "intent",
    }),
    queryClient,
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
