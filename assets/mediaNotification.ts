import { assets } from "~/assets/constants";
import type { Show } from "~/types";

const chromeMetaAdaptor = (show: Show): MediaMetadataInit => ({
  title: show?.title || undefined,
  artist: show?.producers
    ?.map(
      (p) =>
        `${p?.producers_id?.first_name || ""} ${
          p?.producers_id?.last_name || ""
        }`
    )
    .join(", "),
  album: "Loskop Radio",
  artwork: [
    {
      src: assets + show?.artwork?.id || "",
      sizes: "512x512",
    },
  ],
});

export default (meta: MediaMetadataInit) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new window.MediaMetadata(meta);
    return navigator.mediaSession;
  }
};

export { chromeMetaAdaptor };
