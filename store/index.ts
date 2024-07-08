import { defineStore } from "pinia";
import type { Show } from "~/schema";

export const usePlayerStore = defineStore("player", () => {
  const show = ref<Show | undefined>();

  const isPlaying = ref<boolean>(false);

  const play = (playState: boolean): void => {
    isPlaying.value = playState;
  };

  const playPause = (newShow?: Show): void => {
    const hasNewShow = newShow && (!show.value || show.value.id !== newShow.id);
    if (hasNewShow) show.value = newShow;
    play(hasNewShow ? true : !isPlaying.value);
  };

  const isThisPlaying = (id: string): boolean => {
    if (!show.value) return false;
    return isPlaying.value ? show.value.id == id : false;
  };

  return { show, isPlaying, play, playPause, isThisPlaying };
});
