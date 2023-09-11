<template lang="html">
  <div class="default-layout" :class="{ 'dark-theme': !$store.state.theme }">
    <Header
      :categories="categories"
      :banners="banners"
      :currency="currency"
      :columnist="columnist"
      :weather="weather"
    />
    <MobileHeader
      :categories="categories"
      :columnist="columnist"
      :weather="weather"
      :banners="banners"
    />
    <!-- <div class="layout_back"></div> -->
    <main style="flex: 1 1 auto">
      <Nuxt />
    </main>
    <Footer :categories="categories" />
  </div>
</template>
<script>
import Footer from "../components/layout/Footer.vue";
import Header from "../components/layout/Header.vue";
import MobileHeader from "@/components/layout/MobileHeader.vue";
import moment from "moment";
export default {
  data() {
    return {
      categories: [],
      currency: [],
      banners: {},
      date: new Date(),
      columnist: {},
      weather: {},
    };
  },
  computed: {
    targetLang() {
      return this.$i18n.locale;
    },
  },
  mounted() {
    this.$store.commit("chackAuth");
    this.$store.commit("reloadStore");
    this.$store.commit("changeTheme", "first");
  },
  async fetch() {
    const date = new Date();
    const [
      categoriesData,
      translationsData,
      bannersData,
      currencyData,
      siteInfoData,
      columnistData,
      weatherData,
      languagesData,
    ] = await Promise.all([
      this.$store.dispatch("fetchCategories/getCategories", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$store.dispatch("fetchTranslations/getTranslations", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$axios.$get(
        `https://cbu.uz/ru/arkhiv-kursov-valyut/json/all/${moment(date).format(
          "YYYY-MM-DD"
        )}`
      ),
      this.$store.dispatch("fetchSiteInfo/getSiteInfo", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$store.dispatch("fetchCategories/getColumnist", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$store.dispatch("fetchWeather/getWeathers", {
        params: {
          lat: 41.25,
          lon: 69.25,
        },
        headers: {
          Language: this.$i18n.locale,
        },
      }),
      this.$store.dispatch("fetchTranslations/getLanguages", {
        headers: {
          Language: this.$i18n.locale,
        },
      }),
    ]);
    const siteInfo = siteInfoData;
    this.categories = categoriesData.results;
    this.banners = bannersData.results;
    this.currency = currencyData;
    this.columnist = columnistData;
    this.weather = weatherData;
    this.$store.commit("getSiteInfo", siteInfo);
    this.$store.commit("getLanguages", languagesData?.results);
    this.$store.commit("getTranslations", translationsData);
  },

  watch: {
    async targetLang() {
      const [categoriesData, translationsData] = await Promise.all([
        this.$store.dispatch("fetchCategories/getCategories", {
          headers: {
            Language: this.$i18n.locale,
          },
        }),
        this.$store.dispatch("fetchTranslations/getTranslations", {
          headers: {
            Language: this.$i18n.locale,
          },
        }),
      ]);
      this.categories = categoriesData.results;
      this.$store.commit("getTranslations", translationsData);
      this.$store.commit("getTranslationsChange", !this.$store.state.translationsChange);
    },
    "$store.state.theme"(val) {
      if (!val) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    },
  },
  components: { Header, Footer, MobileHeader },
};
</script>
<style lang="css">
.default-layout {
  background-color: var(--body_color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* overflow: hidden; */
}
.layout_back {
  display: none;
}
@media screen and (max-width: 1024px) {
  .layout_back {
    display: block;
    height: 146px;
  }
}
@media screen and (max-width: 576px) {
  .layout_back {
    display: block;
    height: 136px;
  }
}
</style>
