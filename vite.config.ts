import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("@apollo/client") ||
            id.includes("graphql") ||
            id.includes("zen-observable")
          ) {
            return "apollo";
          }

          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("vaul") ||
            id.includes("@dnd-kit")
          ) {
            return "radix-ui";
          }

          if (
            id.includes("@phosphor-icons") ||
            id.includes("lucide-react") ||
            id.includes("@tabler/icons") ||
            id.includes("iconsax")
          ) {
            return "icons";
          }

          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/")
          ) {
            return "forms";
          }

          if (id.includes("@tanstack/react-table")) {
            return "table";
          }

          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("/react/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
