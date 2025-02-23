<template>
  <div class="container">
    <article class="description" v-html="about?.description" />
    <div class="contactContainer">
      <div class="contact">
        <img src="./../assets/scissors.png" class="scissors" />
        <a :href="'mailto:' + mail" class="button">CONTACT US</a>
        <a :href="paypal" target="_blank" class="button">SUPPORT US</a>
        <form
          class="subscribe"
          action="https://radio.us9.list-manage.com/subscribe/post?u=59db0d71d78ca57d2f7db9712&amp;id=f2f484aaf9&amp;f_id=00b1ffe3f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_self"
        >
          <input
            type="email"
            name="EMAIL"
            class="email"
            placeholder="e-mail"
            id="mce-EMAIL"
            required
          />
          <div aria-hidden="true" style="position: absolute; left: -5000px">
            /* real people should not fill this in and expect good things - do
            not remove this or risk form bot signups */
            <input
              type="text"
              name="b_59db0d71d78ca57d2f7db9712_f2f484aaf9"
              tabindex="-1"
              value=""
            />
          </div>
          <input
            type="submit"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="submit"
            value="SUBSCRIBE!"
          />
        </form>
        <div class="social">
          <a :href="facebook" target="_blank" class="small button facebook"
            >f</a
          >
          <a :href="instagram" target="_blank" class="small button facebook"
            >i</a
          >
          <a :href="mixcloud" target="_blank" class="button mixcloud"
            >Mixcloud</a
          >
        </div>
        <div class="credits">
          Developed by
          <NuxtLink target="_blank" :to="`https://dimitriaatos.info`">
            {{ developer.first_name }} {{ developer.last_name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="contactSpace" />
  </div>
  <div class="space" />
</template>

<script setup lang="ts">
import { assets } from "~/assets/constants";
import { imageFallback, removeFileExtension } from "~/assets/helpers";
import type { About, Home } from "~/schema";
import { aboutQuery, aboutSchema, homeSchema } from "~/schema";

const info = {
  mail: "radioloskop@gmail.com",
  paypal: "https://www.paypal.com/paypalme/kedimura",
  facebook: "https://www.facebook.com/loskop.radio",
  mixcloud: "https://www.mixcloud.com/loskopradio/",
  instagram: "https://www.instagram.com/loskop.radio/",
  developer: {
    slug: "dimitriaatos",
    first_name: "Dimitri Aatos",
    last_name: "Ellinas",
  },
  subStatus: "SUBSCRIBE!",
};

const { mail, paypal, facebook, instagram, mixcloud, developer } = info;

const { $directus } = useNuxtApp();
const { data } = await useAsyncData("about", () => {
  return $directus.query<{ items: { about: About; home: Home } }>(aboutQuery);
});

const about = aboutSchema.parse(data.value?.items?.about);
const home = homeSchema.parse(data.value?.items?.home);

useHead({
  title: "About Loskop",
  meta: [
    {
      property: "og:image",
      content: imageFallback(
        assets + removeFileExtension(home.image?.filename_disk || "")
      ),
    },
  ],
});
</script>

<style scoped>
.container {
  display: flex;
  height: 80%;
}

.subscribe > * {
  width: 100%;
}

.contact > *:not(:last-child, .scissors) {
  margin-bottom: 50px;
}

.container > *:not(:last-child, .contactContainer) {
  margin-right: calc(5 * var(--standard-spacing));
}

.contactCpace {
  width: 300px;
}

.contactContainer {
  width: 300px;

  /* right: 5vw; */
  top: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  position: fixed;
  right: calc(50vw - (1000px / 2));
}

.social {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.facebook {
  margin-right: 10px;
}

.contact {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 112px;
}

.contactSpace {
  display: block;
  width: 300px;
}

.scissors {
  position: absolute;
  top: -9px;
  left: 10px;
  width: 30px;
}

a {
  text-decoration: none;
}

.subscribe > *:not(:last-child) {
  margin-bottom: var(--standard-spacing);
}

.subscribe,
.button,
a {
  width: 80%;
}

.credits,
.credits a {
  font-size: 0.75rem;
  text-align: center;
}

.submit {
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;
}

.button,
.submit {
  background-color: var(--text-color);
  color: var(--bg-color);
}

.button,
.submit,
.email {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--standard-spacing);
  white-space: nowrap;
  text-align: center;
  height: 45px;
  letter-spacing: 0.05rem;
  font-weight: 500;
}

.email {
  box-shadow: none;
  border-color: black;
}

.small {
  width: 45px;
}

.description {
  flex: 1;
}

@media screen and (max-width: 1100px) {
  .contactContainer {
    position: initial;
  }

  .contact {
    margin: 0;
  }

  .contactSpace {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .contactContainer {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: min(300px, 100%);
  }

  .contact > *:not(:last-child, .scissors) {
    margin-bottom: 10px;
  }

  .container > *:not(:last-child, .contactContainer) {
    margin-right: 0;
    margin-bottom: calc(var(--standard-spacing) * 5);
  }
}
</style>
