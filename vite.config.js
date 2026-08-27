import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  server: {
     allowedHosts: [
      "b64a-2409-40f0-6402-6754-cce6-9cdd-9d51-8c33.ngrok-free.app",
      "0829-2409-40f0-6424-cfbb-a013-21f6-51ab-e26c.ngrok-free.app"
    ],
    port: 5173,
    host: true,
  },
});
