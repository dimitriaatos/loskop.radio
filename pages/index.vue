<template>
  <main>
    <img
      :src="
        imageFallback(
          assets + removeFileExtension(home?.image?.filename_disk || '')
        )
      "
    />
    <article class="content" v-html="pToSpan(home?.description || '')" />
  </main>
  <div class="space" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback, removeFileExtension } from "~/assets/helpers";
import { homeSchema, homeQuery } from "~/schema";
import type { Home } from "~/schema";

const pToSpan = (html: string): string => {
  return html?.replace(/<\/p>\n<p>/g, "<br/>")?.replace(/(<\/?)p>/g, "$1span>");
};

const { $directus } = useNuxtApp();
const { data } = await useAsyncData("home", () => {
	return $directus.query<{ items: { home: Home } }>(homeQuery);
});

const home = homeSchema.parse(data.value?.items?.home);

useHead({
  title: "Loskop Radio",
  meta: [
    {
      property: "og:image",
      name: "og:image",
      content: "loskop_face.jpg",
    },
  ],
});
</script>

<style>
.content {
  text-align: left;
  margin: auto;
  font-weight: 600;
}

.content span {
  color: var(--bg-color);
  font-size: 25px;
  box-shadow: 0 0 0 10px black;
  /* Tune line "padding" here */
  line-height: 2.2;
  /* Tune line "margin" here */
  background-color: black;
  -moz-box-shadow: 0 0 0 10px #000;
  -webkit-box-shadow: 0 0 0 10px #000;
  -ms-box-shadow: 0 0 0 10px #000;
  -o-box-shadow: 0 0 0 10px #000;
  box-decoration-break: clone;
}
</style>

<style scoped>
main {
  max-width: 1000px;
  display: flex;
}

img {
  width: 40vh;
}

@media screen and (max-width: 650px) {
  main {
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 30vh;
    margin-bottom: 10px;
  }

  .content p {
    font-size: 16px;
    line-height: 2.7;
  }
}
</style>
