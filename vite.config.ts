import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: "travel-helper",
});
