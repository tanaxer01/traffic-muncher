import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/waze": {
        target: "https://www.waze.com/live-map/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/waze/, ""),
        secure: true,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Referer": "https://www.waze.com/live-map/"
        }
      }
    }
  }
});
