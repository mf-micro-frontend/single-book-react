import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          host: `${env.VITE_HOST_APP_URL}/assets/remoteEntry.js`,
          shared: `${env.VITE_SHARED_APP_URL}/assets/remoteEntry.js`,
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
    define: {
      // Inject environment variables into the app at build time
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
