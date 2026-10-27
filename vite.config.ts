import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    // GitHub Pages serves the build from /EdgeMind-AI-at-the-edge/. Dev and preview
    // servers stay at the root so sandbox/preview proxies can reach them directly.
    base: command === "build" ? "/EdgeMind-AI-at-the-edge/" : "/",
    plugins: [react(), tailwindcss(), viteSingleFile()],
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        allowedHosts: true,
    },
    preview: {
        host: "0.0.0.0",
        port: 4173,
        strictPort: true,
        allowedHosts: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
}));
