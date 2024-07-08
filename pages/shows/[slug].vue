<template>
  <ShowPage :show="show" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback, throw404 } from "~/assets/helpers";
import type { Show } from "~/schema";
import { showQueries, showSchema } from "~/schema";

const route = useRoute();

const { $directus } = useNuxtApp();
const { data } = await useAsyncData(`show/${route.params.slug}`, () => {
  return $directus.query<{ items: { shows: Show[] } }>(showQueries.show, {
    slug: route.params.slug,
  });
});

const show = showSchema.parse(data.value?.items?.shows?.[0]);

throw404(show === undefined);

useHead({
  title: `${show?.title} - Loskop`,
  meta: [
    {
      property: "og:image",
      content: imageFallback(assets + show?.artwork.id),
    },
  ],
});
</script>
