import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createNodeChatHandler } from "./server/chat.js";

export default defineConfig(({ mode }) => {
  // These values stay in Node. Never pass them to define or import.meta.env.
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const handler = createNodeChatHandler({ getEnv: () => env });
  const install = (server) => {
    server.middlewares.use((req, res, next) => {
      if (req.url?.split("?")[0] === "/api/chat") return handler(req, res);
      next();
    });
  };
  return {
    plugins: [
      react(),
      {
        name: "portfolio-chat-api",
        configureServer: install,
        configurePreviewServer: install,
      },
    ],
  };
});
