<template>
  <ShowPage :show="show">
    <!-- <ul>
      <li v-for="(sound, index) in sounds" :key="index">
        <div>
          {{ sound.username }}. <i>{{ sound.name }}</i
          >. Freesound, {{ new Date(sound.created).getFullYear() }}.
          <a target="_blank" :href="sound.url">Visit</a>.
        </div>
      </li>
    </ul> -->
  </ShowPage>
</template>

<script setup lang="ts">
import type { Show } from "~/types";

const response = await GqlGenerative();

const { description } = response?.items?.generative || {};

const route = useRoute();

const show: Show = {
  id: "generative",
  slug: route.path,
  title: "GENERATIVE RADIO",
  description: description || "",
  date: "LIVE NOW!",
  artwork: {
    id: "generative.jpg",
  },
  producers: [
    {
      producers_id: {
        id: "kedimoura",
        first_name: "KeDiMouRa",
        slug: "kedimoura",
      },
    },
  ],
};

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
