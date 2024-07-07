<template>
  <div class="page">
    <header class="user-select-none">
      <NuxtLink to="/">
        <img class="title" src="~/assets/title.svg" alt="" />
      </NuxtLink>
      <nav class="nav">
        <NuxtLink
          class="navLink"
          :to="`/generative-radio/`"
          :class="{ selected: sel('generative-radio') }"
        >
          GENERATIVE<span class="genSpace" />RADIO</NuxtLink
        >
        <NuxtLink
          class="navLink"
          :to="`/shows/`"
          :class="{ selected: sel('shows') }"
          >SHOWS</NuxtLink
        >
        <NuxtLink
          class="navLink"
          :to="`/about/`"
          :class="{ selected: sel('about') }"
          >ABOUT</NuxtLink
        >
      </nav>
    </header>
    <div class="layout">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// import path from "path";
import { useRoute } from "vue-router";
const route = useRoute();

const sel = (href: string): boolean => {
  return route.path.replaceAll("/", "") === href;
};
</script>

<style>
@import "~/assets/reset.css";
@import "~/assets/theme.css";

.bottomSpace {
  height: 300px;
}

h1,
h2,
h3 {
  margin: 0;
}

h1 {
  /* font-size: 1.5vw; */
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.1vw;
  white-space: nowrap;
  width: 100%;
}

@media screen and (max-width: 990px) {
  h1 {
    font-size: 1rem;
  }
}

@media screen and (max-width: 800px) {
  h1 {
    font-size: 1.04rem;
    letter-spacing: 0.1vw;
    font-weight: 600;
  }
}

.producers {
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0.07em;
  font-style: italic;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

<style scoped>
.page {
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.title {
  width: 300px;
}

.genSpace {
  display: inline-block;
  height: 1px;
  width: 6px;
}

.layout {
  max-width: 1000px;
  width: 90%;
}

header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(var(--bg-rgb), 0.95);
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  padding-top: 10px;
}

nav {
  padding-bottom: var(--standard-spacing);
}

nav a {
  font-size: 1.1rem;
}

nav > *:not(:last-child) {
  margin-right: calc(var(--standard-spacing) * 4);
}

.navLink {
  white-space: nowrap;
  color: inherit;
  text-decoration: none;
}

.selected {
  border-bottom: 2px solid var(--text-color);
}

@media screen and (max-width: 800px) {
  header {
    /* align-items: center; */
    justify-content: center;
    margin-bottom: 10px;
  }

  nav {
    margin-top: 10px;
  }
}

@media screen and (max-width: 325px) {
  nav * {
    font-size: 0.8em;
  }
}
</style>
