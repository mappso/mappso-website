import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import sitemapPlugin from "./plugins/vite-plugin-sitemap"

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
