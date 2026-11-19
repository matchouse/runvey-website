import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `pnpm run build` runs the OpenNext build, so point it at the plain Next build
  // to avoid it calling itself.
  buildCommand: "pnpm run build:next",
};
