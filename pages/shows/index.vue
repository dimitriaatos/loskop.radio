<template>
  <ul>
    <ShowCard
      v-for="show in (shows as Show[])"
      :key="(show?.id as string)"
      :show="show"
    />
  </ul>
  <div class="space" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback, removeFileExtension } from "~/assets/helpers";
import type { Show } from "~/types";

const response = await GqlShows({
  live: false,
});

const { home, shows } = response?.items || {};

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
