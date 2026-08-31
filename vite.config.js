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
      "0829-2409-40f0-6424-cfbb-a013-21f6-51ab-e26c.ngrok-free.app",
    ],
    port: 5173,
    host: true,
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor-react";
            }
            if (id.includes("lucide-react") || id.includes("@iconify-react")) {
              return "vendor-icons";
            }
            if (id.includes("katex") || id.includes("rehype-katex") || id.includes("remark-math")) {
              return "vendor-katex";
            }
            if (id.includes("highlight.js") || id.includes("rehype-highlight") || id.includes("react-markdown") || id.includes("remark-gfm")) {
              return "vendor-markdown";
            }
            if (id.includes("@stomp") || id.includes("sockjs-client")) {
              return "vendor-stomp";
            }
            if (id.includes("axios")) {
              return "vendor-axios";
            }
          }
        },
      },
    },
  },
});
