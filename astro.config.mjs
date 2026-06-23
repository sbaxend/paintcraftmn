// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://paintcraftmn.com",
  output: "server",
  adapter: vercel(),
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["draft-then-flood-vote.trycloudflare.com"],
    },
  },
});
