<template>
  <div class="meta user-select-none" v-if="show !== undefined">
    <audio
      ref="audio"
      autoplay
      preload="metadata"
      crossorigin="anonymus"
      type="audio/mpeg"
      :src="show.live ? show.link : assets + show.audio.id"
      @playing="state.loading = false"
      @waiting="state.loading = true"
      @play="isPlaying || playPause()"
      @pause="isPlaying && playPause()"
      @timeupdate="if (!state.skipping && audio) state.ms = audio?.currentTime;"
      @loadedmetadata="if (audio?.duration) state.max = audio?.duration;"
    />
    <hr :class="{ live: show.live }" />
    <button class="playPause" @click="playPause()">
      <div v-if="state.loading" class="loading" />
      <PlayIcon v-else-if="!isPlaying" :size="50"></PlayIcon>
      <PauseIcon v-else :size="50"></PauseIcon>
    </button>
    <div class="title">
      <NuxtLink :to="`/shows/${show.slug}`">
        {{ show.title }}
      </NuxtLink>
    </div>
    <div v-if="show.live" class="producers">
      LIVE NOW!
      <span class="blink">
        <div class="dot" />
      </span>
    </div>
    <div v-else class="producers">
      by
      <NuxtLink
        v-for="producer in producers"
        :key="producer.id"
        :to="`/producers/${producer.slug}/`"
      >
        {{ producer?.first_name }} {{ producer?.last_name }}
      </NuxtLink>
    </div>
    <div />
    <div v-if="show.live" class="progressBar live" />
    <input
      v-else
      ref="progressBar"
      class="progressBar"
      type="range"
      :value="state.ms"
      min="0"
      :max="state.max"
      @change="timeChange"
    />
    <div v-if="!show.live" class="time">
      <span class="current">{{ formattedTime }}</span
      >/{{ length }}
    </div>
    <div class="volume">
      <div class="speaker" />
      <input
        type="range"
        value="1"
        min="0"
        max="1"
        step="0.05"
        @input="volumeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { duration } from "duration-pretty";
import { storeToRefs } from "pinia";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import PlayIcon from "vue-material-design-icons/Play.vue";
import { assets } from "~/assets/constants";
import mediaNotification, {
chromeMetaAdaptor,
} from "~/assets/mediaNotification";
import type { BaseProducer, NestedProducer } from "~/schema";
import { usePlayerStore } from "~/store";

const store = usePlayerStore();
const { playPause } = store;
const { show, isPlaying } = storeToRefs(store);

const producers = computed(() =>
  show.value !== undefined
    ? show.value.producers.map((p: NestedProducer): BaseProducer => {
        return p.producers_id;
      })
    : []
);

const audio = ref<HTMLAudioElement | undefined>();
const progressBar = ref<Element>();

type State = {
  loading: boolean;
  ms: number;
  max: number;
  skipping: boolean;
};

const state = reactive<State>({
  loading: false,
  ms: 0,
  max: 0,
  skipping: false,
});

const formattedTime = computed(() =>
  duration(state.ms, "seconds").format("H:mm:ss")
);

const length = computed(() => duration(state.max, "seconds").format("H:mm:ss"));

watch<typeof show.value>(show, (val: typeof show.value) => {
  if (val) mediaNotification(chromeMetaAdaptor(val));
});

watch(isPlaying, (val, oldVal) => {
  if (audio.value && val != oldVal) {
    audio.value[val ? "play" : "pause"]();
    audio.value.addEventListener("canplaythrough", () => {
      if (isPlaying && audio.value) audio.value.play();
    });
  }
});

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.key == " ") {
      event.preventDefault();
      playPause();
    } else if (
      Array.from(Array(10))
        .map((a, i) => i)
        .includes(Number(event.key))
    ) {
      timeChange({ target: { value: (state.max * Number(event.key)) / 10 } });
    }
  });

  if (progressBar.value) {
    progressBar.value.addEventListener("mousedown", () => {
      state.skipping = true;
    });

    progressBar.value.addEventListener("mouseup", () => {
      state.skipping = false;
    });
  }
});

const timeChange = ({ target: { value } }: any) => {
  if (audio.value) audio.value.currentTime = value;
};

const volumeChange = ({ target: { value } }: any) => {
  if (audio.value) audio.value.volume = value;
};
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

.blink {
  animation: blink 2s linear infinite both;
}

.dot {
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  background-color: red;
  border-radius: 50%;
  margin: auto;
}

.meta {
  display: grid;
  grid-template-rows: [border] auto [title] 1fr [details] 1fr;
  grid-template-columns: [play] 60px [info] auto [progress] 1fr [volume] 140px;
  justify-items: flex-start;
  align-items: center;
  column-gap: var(--p-spacing);
  background-color: var(--main-color);
  padding-bottom: var(--p-spacing);
  white-space: nowrap;
}

hr {
  border-top: var(--p-line-width) solid var(--text-color);
  grid-row: 1 / span 1;
  grid-column: 1 / span 4;
  width: 100%;
  padding-bottom: var(--p-spacing);
}

.playPause {
  grid-row: 2 / span 2;
  grid-column: 1 / span 1;
  justify-self: center;

  /* border: solid red 1px; */
  opacity: 1;
  height: 55px;
  width: 55px;

  /* border-radius: 50%; */
  outline: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.loading {
  display: block;
  border-style: dashed;
  border-width: var(--standard-spacing);
  border-color: black;
  border-radius: 50%;
  animation: rot 10s linear 0s infinite normal none;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

@keyframes rot {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

a {
  color: var(--text-color);
  text-decoration: none;
}

.title a {
  font-size: 1.1rem;
}

.title {
  grid-area: 2/2/2/2;
  white-space: nowrap;
  letter-spacing: 0.03rem;
  font-weight: 500;
}

.producers {
  grid-area: details / info / details / info;
  width: 100%;
}

.producers a {
  font-style: italic;
  border-bottom: 1px solid black;
}

.progressBar {
  grid-row: 2 / span 2;
  grid-column: 3 / span 1;
}

.progressBar.live {
  overflow: hidden;
  height: 100%;
  background-image: url("./../assets/generative/vector.svg");
  background-repeat: repeat-x;
  background-size: 800px;
  margin-top: 20px;
  grid-row: 2 / span 2;
  grid-column: 3 / span 1;
  width: calc(100vw - 390px);
}

.time {
  grid-row: 3 / span 1;
  grid-column: 3 / span 1;
  text-align: right;
  justify-self: flex-end;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.07em;
}

.time .current {
  text-align: right;
  width: 4ch;
  display: inline;
  margin: 0;
}

.volume {
  grid-row: 2 / span 2;
  grid-column: 4 / span 1;
  width: 120px;
  display: flex;
  justify-self: center;
  background-color: var(--bg-color);
  height: 100%;
}

.speaker {
  min-width: 40px;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M18.5%2012c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73%202.5-2.25%202.5-4.02zM5%209v6h4l5%205V4L9%209H5z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  background-color: var(--main-color);
}

input[type="range"] {
  background-color: var(--main-color);
  -webkit-appearance: none;
  width: 100%;
  padding: var(--p-spacing) 0;
  cursor: pointer;
}

/* bar */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: var(--p-line-width);
  background: var(--text-color);
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: var(--p-line-width);
  background: var(--text-color);
}

input[type="range"]::-ms-track {
  width: 100%;
  height: var(--p-line-width);
  background: var(--text-color);
  border-color: transparent;
  color: transparent;
}

/* thumb */
input[type="range"]::-webkit-slider-thumb {
  height: var(--p-thumb-size);
  width: var(--p-thumb-size);
  background: var(--text-color);
  -webkit-appearance: none;
  margin-top: calc(-1 * var(--p-thumb-size) * 0.5 + var(--p-border-width));
  border-radius: 50%;
  border: var(--main-color) var(--p-border-width) solid;
}

input[type="range"]::-moz-range-thumb {
  height: var(--p-thumb-size);
  width: var(--p-thumb-size);
  background: var(--text-color);
  border-radius: 50%;
  border: var(--main-color) var(--p-border-width) solid;
}

input[type="range"]::-ms-thumb {
  height: var(--p-thumb-size);
  width: var(--p-thumb-size);
  background: var(--text-color);
  border-radius: 50%;
  border: var(--main-color) var(--p-border-width) solid;
}

/* .volume input[type="range"] {
} */

@media screen and (max-width: 650px) {
  .progressBar {
    grid-row: 1 / span 1;
    grid-column: 1 / span 4;
  }

  hr:not(.live) {
    display: none;
  }

  .title {
    letter-spacing: 0.1vw;
    grid-column: 2 / span 2;
    justify-self: center;
  }

  .volume {
    display: none;
  }

  .meta {
    grid-template-columns: [play] 60px [info] auto [progress] 1fr;
  }

  .progressBar.live {
    display: none;
  }
}

@media (hover: none) {
  .volume {
    display: none;
  }

  .meta {
    grid-template-columns: [play] 60px [info] auto [progress] 1fr;
  }
}

/* @media screen and (max-width: 650px) {

} */
</style>
