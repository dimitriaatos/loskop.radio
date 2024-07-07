export * from "./about";
export * from "./home";
export * from "./producer";
export * from "./show";

import type { About } from "./about";
import type { Home } from "./home";
import type { Producer } from "./producer";
import type { Show } from "./show";

export type Schema = {
  shows: Show[];
  producers: Producer[];
  home: Home;
  about: About;
};
