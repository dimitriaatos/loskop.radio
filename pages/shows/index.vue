<template>
  <ul>
    <ShowCard v-for="show in shows" :key="show.id" :show="show" />
  </ul>
  <div class="space" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback, removeFileExtension } from "~/assets/helpers";
import type { Home, Show } from "~/schema";
import { showsSchema, showQueries, homeSchema } from "~/schema";

const { $directus } = useNuxtApp();
const { data } = await useAsyncData("shows", () => {
  return $directus.query<{ items: { shows: Show[]; home: Home } }>(
    showQueries.shows,
    { live: false }
  );
});

const shows = showsSchema.parse(data.value?.items?.shows);
const home = homeSchema.parse(data.value?.items?.home);

useHead({
  title: "All shows - Loskop",
  meta: [
    {
      property: "og:image",
      content: imageFallback(
        assets + removeFileExtension(home?.image?.filename_disk || "")
      ),
    },
  ],
});
</script>

<style scoped>
ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(calc(180px + 10vmin), 100%), 1fr)
  );
  grid-gap: calc(var(--standard-spacing) * 2);
}

ul > li {
  justify-self: center;
}
</style>
