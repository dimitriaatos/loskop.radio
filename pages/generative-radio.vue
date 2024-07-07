<template>
  <ShowPage :show="show"> </ShowPage>
</template>

<script setup lang="ts">
import type { Show } from "~/schema";
import { showQueries, showSchema } from "~/schema";

const { $directus } = useNuxtApp();
const { data } = await useAsyncData("generative-radio", () => {
  return $directus.query<{ items: { shows: Show[] } }>(showQueries.show, {
    slug: "generative-radio",
  });
});

const show: Show = showSchema.parse(data.value?.items?.shows?.[0]);

useHead({
  title: "Generative radio - Loskop",
  meta: [
    {
      property: "og:image",
      content: "generative.jpg",
    },
  ],
});
</script>

<style scoped>
li {
  list-style: square;
}

ul {
  min-height: 20em;
}
</style>
