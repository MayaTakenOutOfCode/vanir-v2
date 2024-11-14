import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import vercel from '@astrojs/vercel/serverless';
import auth from "auth-astro";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), auth()],
  output: "server",
  adapter: vercel(),
  // adapter: node({
  //   mode: "standalone"
  // })
});