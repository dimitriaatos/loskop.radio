<template>
  <ShowPage :show="(show as Show)" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { throw404 } from "~/assets/helpers";
import type { Show } from "~/types";

const route = useRoute();

const response = await GqlShow({ slug: route.params.slug as string });

const show = response?.items?.shows?.[0];

throw404(show === undefined);

useHead({
  title: `${show?.title} - Loskop`,
  meta: [
    {
      property: "og:image",
      content: assets + show?.artwork?.id,
    },
  ],
});
</script>
