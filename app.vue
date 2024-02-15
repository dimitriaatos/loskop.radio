<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoskopPlayer class="player" />
    <component
      is="script"
      src="https://gc.zgo.at/count.js"
      async="true"
      data-goatcounter="https://loskopradio.goatcounter.com/count"
    />
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
