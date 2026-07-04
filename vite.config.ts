import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Official TanStack Start Vite configuration.
// https://tanstack.com/start/latest/docs/framework/react/quick-start
export default defineConfig({
  server: {
    port: 8080,
    host: true,
    strictPort: true,
  },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
});
