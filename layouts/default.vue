<template lang="html">
  <div class="default-layout" :class="{ 'dark-theme': !$store.state.theme }">
    <Header
      :categories="categories"
      :currency="{
        usdCurrency: usdCurrency,
        eurCurrency: eurCurrency,
        rubCurrency: rubCurrency,
      }"
    />
    <MobileHeader />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "../components/layout/Footer.vue";
import Header from "../components/layout/Header.vue";
import MobileHeader from "@/components/layout/MobileHeader.vue";

export default {
  data() {
    return {
      categories: [],
      rubCurrency: {},
      eurCurrency: {},
      usdCurrency: {},
    };
  },
  // async mounted() {
  //   const [categoriesData] = await Promise.all([
  //     this.$store.dispatch("fetchCategories/getCategories", {}),
  //   ]);
  //   this.categories = categoriesData.results;
  // },
  computed: {
    targetLang() {
      return this.$i18n.locale;
    },
  },
  mounted() {
    this.$store.commit("chackAuth");
    this.$store.commit("reloadStore");
  },
  async fetch() {
    const [
      categoriesData,
      translationsData,
      // rubCurrencyData,
      // eurCurrencyData,
      // usdCurrencyData,
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
      // this.$axios.$get(
      //   "https://api.currencyapi.com/v3/latest?apikey=ifbmLdDf3iV3UOIIc6lJJHUVANzQNOObWJRhjjzZ&&currencies=UZS&base_currency=RUB"
      // ),
      // this.$axios.$get(
      //   "https://api.currencyapi.com/v3/latest?apikey=ifbmLdDf3iV3UOIIc6lJJHUVANzQNOObWJRhjjzZ&&currencies=UZS&base_currency=EUR"
      // ),
      // this.$axios.$get(
      //   "https://api.currencyapi.com/v3/latest?apikey=ifbmLdDf3iV3UOIIc6lJJHUVANzQNOObWJRhjjzZ&&currencies=UZS&base_currency=USD"
      // ),
    ]);
    this.categories = categoriesData.results;
    // this.rubCurrency = rubCurrencyData?.data;
    // this.usdCurrency = usdCurrencyData?.data;
    // this.eurCurrency = eurCurrencyData?.data;
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
}
</style>
