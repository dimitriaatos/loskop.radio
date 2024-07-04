<template>
  <main>
    <div class="producer">
      <img
        :src="(producer?.avatar && imageFallback(assets + producer?.avatar?.id)) as string"
        class="image-fit avatar"
      />
      <h1>{{ producer?.first_name }} {{ producer?.last_name }}</h1>
      <div class="description" v-html="producer?.description" />
    </div>
    <div v-if="producer?.shows?.length as number > 0" class="shows">
      <div class="divider user-select-none">SHOWS</div>
      <ul>
        <ShowCard
          v-for="show in producer?.shows?.sort?.(
            (a, b) => Number(b?.shows_id?.date) - Number(a?.shows_id?.date)
          )"
          :key="(show?.shows_id?.id as string)"
          :show="(show?.shows_id as Show)"
        />
      </ul>
    </div>
    <div class="space" />
  </main>
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback } from "~/assets/helpers";
import type { Show } from "~/types";

const route = useRoute();

const response = await GqlProducer({ slug: route.params.slug as string });

const producer = response?.items?.producers?.[0];
useHead({
  title: `${producer?.first_name || ""} ${producer?.last_name || ""} - Loskop`,
  meta: [
    {
      property: "og:image",
      content: assets + producer?.avatar?.id,
    },
  ],
});
</script>

<style scoped>
main {
  width: 100%;
  word-wrap: break-word;
  max-width: 1000px;
}

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

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  float: left;
  margin-right: calc(3 * var(--standard-spacing));
  margin-bottom: calc(3 * var(--standard-spacing));
}

h1 {
  text-align: left;
  margin-bottom: 1rem;
}

.producer {
  clear: left;
  overflow: auto;
}

.shows {
  margin: var(--standard-spacing) auto;
  clear: left;
}

.divider {
  display: flex;
  align-items: flex-start;
  text-align: left;
  font-size: 1.2rem;
  margin: 20px 0;
  font-weight: 200;
}

.divider::after {
  content: "";
  flex-grow: 1;
  height: var(--border-width);
  background: var(--text-color);
  min-width: 20px;
  margin: auto;
  margin-left: var(--standard-spacing);
}

@media screen and (max-width: 650px) {
  h1 {
    white-space: normal;
    text-align: center;
    font-size: 1.1rem;
  }

  .avatar {
    display: block;
    float: none;
    margin: auto;
    margin-bottom: 1rem;
  }
}
</style>
