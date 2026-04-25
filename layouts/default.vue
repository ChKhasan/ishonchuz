<template lang="html">
  <div class="default-layout" :class="{ 'dark-theme': !$store.state.theme }">
    <div class="warn">
      {{ $store.state.translations["main.warn"] }}
    </div>
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

const layoutCache = {
  locale: null,
  categories: [],
  banners: [],
  columnist: {},
  weather: {},
  currency: [],
};

export default {
  head () {
    return {
        title: this.$store.state.siteInfo['title']
    }
},
  data() {
    return {
      categories: [],
      currency: [],
      banners: [],
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
    this.fetchNonBlockingData();
  },
  async fetch() {
    const currentLocale = this.$i18n.locale;
    if (layoutCache.locale === currentLocale && this.categories.length > 0) {
      this.categories = layoutCache.categories || [];
      this.banners = layoutCache.banners || [];
      this.columnist = layoutCache.columnist || {};
      this.weather = layoutCache.weather || {};
      this.currency = layoutCache.currency || [];
      return;
    }

    const settled = await Promise.allSettled([
      this.$store.dispatch("fetchCategories/getCategories", {
        headers: {
          Language: currentLocale,
        },
      }),
      this.$store.dispatch("fetchTranslations/getTranslations", {
        headers: {
          Language: currentLocale,
        },
      }),
      this.$store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: currentLocale,
        },
      }),
      this.$store.dispatch("fetchSiteInfo/getSiteInfo", {
        headers: {
          Language: currentLocale,
        },
      }),
      this.$store.dispatch("fetchCategories/getColumnist", {
        headers: {
          Language: currentLocale,
        },
      }),
      this.$store.dispatch("fetchTranslations/getLanguages", {
        headers: {
          Language: currentLocale,
        },
      }),
    ]);

    const categoriesData = settled[0].status === "fulfilled" ? settled[0].value : { results: [] };
    const translationsData = settled[1].status === "fulfilled" ? settled[1].value : {};
    const bannersData = settled[2].status === "fulfilled" ? settled[2].value : { results: [] };
    const siteInfoData = settled[3].status === "fulfilled" ? settled[3].value : {};
    const columnistData = settled[4].status === "fulfilled" ? settled[4].value : {};
    const languagesData = settled[5].status === "fulfilled" ? settled[5].value : { results: [] };

    this.categories = categoriesData.results || [];
    this.banners = bannersData.results || [];
    this.columnist = columnistData || {};
    this.$store.commit("getSiteInfo", siteInfoData || {});
    this.$store.commit("getLanguages", languagesData?.results || []);
    this.$store.commit("getTranslations", translationsData || {});

    layoutCache.locale = currentLocale;
    layoutCache.categories = this.categories;
    layoutCache.banners = this.banners;
    layoutCache.columnist = this.columnist;
   },
  methods: {
    async fetchNonBlockingData() {
      const currentLocale = this.$i18n.locale;
      const [weatherData, currencyData] = await Promise.allSettled([
        this.$store.dispatch("fetchWeather/getWeathers", {
          params: {
            lat: 41.25,
            lon: 69.25,
            region: "toshkentSh",
          },
          headers: {
            Language: currentLocale,
          },
        }),
        this.$axios.$get(
          `https://cbu.uz/ru/arkhiv-kursov-valyut/json/all/${new Date().toISOString().slice(0, 10)}`
        ),
      ]);

      if (weatherData.status === "fulfilled") {
        this.weather = weatherData.value || {};
        layoutCache.weather = this.weather;
      }
      if (currencyData.status === "fulfilled") {
        this.currency = currencyData.value || [];
        layoutCache.currency = this.currency;
      }
    },
  },

  watch: {
    async targetLang() {
      layoutCache.locale = null;
      await this.$fetch();
      this.fetchNonBlockingData();
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
.warn{
  background: var(--breadcrumb_link);
  text-align: center;
  color: white;
  padding: 4px 0;
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
