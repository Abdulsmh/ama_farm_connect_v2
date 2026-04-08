import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/ama_farm_connect_v2/",
  server: {
    port: 3000,
    open: true,
  },
});
