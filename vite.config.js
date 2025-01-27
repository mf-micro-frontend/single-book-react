import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "single-book",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      remotes: {
        host: "http://localhost:5001/assets/remoteEntry.js",
        shared: "http://localhost:5099/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "tailwindcss"],
    }),
  ],
  build: {
    port: 5003,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
