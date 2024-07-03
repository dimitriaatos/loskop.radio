<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoskopPlayer class="player" />
  </div>
</template>

<style scoped>
.player {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
}

#app {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
