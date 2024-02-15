// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["nuxt-graphql-client", "@pinia/nuxt"],
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      title: "Loskop Radio",
    },
  },
});
