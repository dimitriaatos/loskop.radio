<template>
  <main>
    <div class="artwork">
      <img :src="assets + show?.artwork?.id" class="image-fit" />
    </div>
    <div class="infoContainer">
      <div class="playerContainer">
        <div class="player">
          <div class="playContainer">
            <button class="play" @click="playPause(show)">
              <Icon
                v-if="!isThisPlaying(show?.id as string)"
                name="i-ic-baseline-play-arrow"
                size="2em"
                mode="svg"
              />
              <Icon
                v-else
                name="i-ic-baseline-pause"
                size="2em"
                mode="svg"
              />
            </button>
          </div>
          <div class="info">
            <div class="dateDuration">
              <div class="date">
                {{
                  show?.id === "generative"
                    ? show.date
                    : formatDate(show?.date as string)
                }}
              </div>
              <div v-if="!show?.live" class="duration">
                {{ formatedDuration }}
              </div>
            </div>
            <h1>
              {{ show?.title }}
            </h1>
            <div class="producers">
              by
              <NuxtLink
                v-for="producer in producers"
                :key="producer?.id as string"
                :to="`/producers/${producer?.slug}/`"
              >
                {{ producer?.first_name }} {{ producer?.last_name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="description" v-html="show?.description" />
    <a
      v-if="show?.attachment && show?.attachment.id"
      :href="assets + show?.attachment.id"
      target="_blank"
      class="attachment"
    >
      <Icon name="i-ic-outline-insert-drive-file" size="2em" mode="svg" />Program Notes
    </a>
    <slot />
    <div class="space" />
  </main>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { duration } from "duration-pretty";
import { computed } from "vue";
import { assets } from "~/assets/constants";
import { usePlayerStore } from "~/store";
import type { Show } from "~/types";

const { playPause, isThisPlaying } = usePlayerStore();

const { show } = defineProps<{ show: Show }>();

const producers = computed(() =>
  show?.producers?.map((p) => {
    return p?.producers_id;
  })
);

const formatedDuration = computed(() => {
  const dur = show?.audio?.duration || 0;
  return duration(dur, "seconds").format("mm' ss''");
});

const formatDate = (string: string): string =>
  string && format(new Date(string), "dd.MM.yyyy");
</script>

<style scoped>
main {
  width: 100%;
  max-width: 1000px;
}

li {
  list-style: square;
}

.attachment {
  display: flex;
  align-items: center;
  font-weight: bolder;
}

.artwork {
  aspect-ratio: 1/1;
  overflow: hidden;
  width: 50%;
  float: left;
  border: var(--border-width) solid var(--text-color);
  margin-right: calc(2 * var(--standard-spacing));
  margin-bottom: calc(2 * var(--standard-spacing));
}

.playerContainer {
  display: flex;
  margin-bottom: calc(var(--standard-spacing) * 3);
}

.player {
  width: 100%;
  display: flex;
  align-items: flex-start;
}

.play {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
}

.playContainer {
  aspect-ratio: 1/1;
  width: 70px;
  border: var(--border-width) solid var(--text-color);
  margin-right: var(--standard-spacing);
}

.play > * {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dateDuration {
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 0.07em;
}

.duration {
  display: none;
}

.info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  width: 50%;
}

.producers {
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0.07em;
}

.producers a {
  font-style: italic;
  color: var(--text-color);
  user-select: auto;
}

.description {
  font-size: 1rem;
  line-height: 23px;
  letter-spacing: 0.04em;
}

@media screen and (max-width: 650px) {
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .artwork {
    width: 100%;
    max-width: 350px;
    margin: var(--standard-spacing) 0;
  }

  .infoContainer {
    width: 100%;
  }

  .playerContainer {
    margin-bottom: var(--standard-spacing);
  }
}
</style>
