import { createDirectus, graphql } from "@directus/sdk";
import type { Schema } from "~/schema";

const directus = createDirectus<Schema>(
  "https://cms.loskop.radio/graphql"
).with(graphql());

export default defineNuxtPlugin(() => {
  return {
    provide: { directus },
  };
});
