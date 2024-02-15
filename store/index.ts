import { defineStore } from "pinia";
import type { Show } from "~/types";

export const usePlayerStore = defineStore("player", () => {
  const show = ref<Show>({
    id: "",
    title: "",
    date: "",
    slug: "",
    description: "",
    producers: [],
    artwork: {
      id: "",
    },
    audio: {
      id: "",
    },
  });

  const isPlaying = ref(false);

  const play = (playState: boolean) => {
    isPlaying.value = playState;
  };

  const playPause = (newShow?: Show) => {
    const hasNewShow = newShow && show.value?.id !== newShow.id;
    if (hasNewShow) show.value = newShow;
    play(hasNewShow ? true : !isPlaying.value);
  };

  const isThisPlaying = (id: string) => {
    return isPlaying.value ? show.value?.id == id : false;
  };

  return { show, isPlaying, play, playPause, isThisPlaying };
});
