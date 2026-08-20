import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nourish-dazzle-react/",
  plugins: [react()],
});