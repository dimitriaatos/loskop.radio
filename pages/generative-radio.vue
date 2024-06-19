<template>
  <ShowPage :show="show"> </ShowPage>
</template>

<script setup lang="ts">
import type { Show } from "~/types";

const response = await GqlShow({ slug: "generative-radio" });

const show: Show = response?.items?.shows?.[0] as Show;

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
