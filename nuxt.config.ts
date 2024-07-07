// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@pinia/nuxt", "@nuxt/icon"],

  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      title: "Loskop Radio",
    },
  },
  compatibilityDate: "2024-07-07",
});
