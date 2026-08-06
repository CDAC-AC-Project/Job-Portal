import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// host: true binds the dev server to 0.0.0.0 instead of just localhost, so it's
// reachable from other devices on the same network (e.g. a phone via the PC's LAN IP).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
});
