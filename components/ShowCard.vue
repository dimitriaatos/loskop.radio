<template>
  <li class="card">
    <NuxtLink :to="`/shows/${show?.slug}/`">
      <div class="artwork">
        <img :src="assets + show?.artwork?.id" alt="" class="image-fit" />
      </div>
    </NuxtLink>
    <div class="infoContainer">
      <div class="info">
        <NuxtLink class="los" :to="`/shows/${show?.slug}/`">
          <h2 class="title">
            {{ show?.title }}
          </h2>
        </NuxtLink>
        <div class="producers">
          by
          <NuxtLink
            v-for="producer in producers"
            :key="(producer?.id as string)"
            :to="`/producers/${producer?.slug}/`"
          >
            {{ producer?.first_name }} {{ producer?.last_name }}
          </NuxtLink>
        </div>
      </div>
      <button class="play" @click="playPause(show as Show)">
        <IconPlay v-if="!thisIsPlaying" :size="50" />
        <IconPause v-else :size="50" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import IconPause from "vue-material-design-icons/Pause.vue";
import IconPlay from "vue-material-design-icons/Play.vue";
import { assets } from "~/assets/constants";
import { usePlayerStore } from "~/store";
import type { Show } from "~/types";

const store = usePlayerStore();
const { playPause, isThisPlaying } = store;
const { isPlaying } = storeToRefs(store);

const { show } = defineProps<{ show: Show }>();
const thisIsPlaying = ref(false);

watch(isPlaying, () => {
  thisIsPlaying.value = isThisPlaying(show?.id || "");
});

const producers = computed(() =>
  show?.producers?.map((p) => {
    return p?.producers_id;
  })
);
</script>

<style scoped>
.card {
  max-width: 400px;
  width: 100%;
  background-color: var(--bg-color);
  border-color: var(--text-color);
  border-width: var(--border-width);
  border-style: solid;
  padding: var(--standard-spacing);
  position: relative;
}

.card > *:not(:last-child) {
  margin-bottom: var(--standard-spacing);
}

a {
  color: var(--text-color);
}

.card > a {
  text-decoration: none;
  color: var(--text-color);
  display: block;
  width: 100%;
  border: var(--border-width) solid var(--text-color);
}

.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.1rem;
  letter-spacing: 0.03rem;
  font-weight: 500;
}

.producers {
  letter-spacing: 0.03rem;
}

.los {
  text-decoration: none;
}

.artwork {
  aspect-ratio: 1/1;
  overflow: hidden;
}

.infoContainer {
  display: flex;
  width: 100%;
}

.play {
  border: solid var(--text-color) var(--border-width);
  background-color: var(--main-color);
  width: 62px;
  height: 62px;
  margin: 0;
  padding: 0;
}

.info {
  border: var(--border-width) solid var(--text-color);
  padding: var(--standard-spacing);
  margin-right: var(--standard-spacing);
  overflow: hidden;
  flex: 1;
  background-color: var(--main-color);
}
</style>
