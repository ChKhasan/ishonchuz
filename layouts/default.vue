<template lang="html">
  <div class="default-layout" :class="{ 'dark-theme': !$store.state.theme }">
    <Header :categories="categories" />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "../components/layout/Footer.vue";
import Header from "../components/layout/Header.vue";

export default {
  data() {
    return {
      categories: [],
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
    console.log(this.translations);
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
  },
  components: { Header, Footer },
};
</script>
<style lang="css">
.default-layout {
  background-color: var(--body_color);
}
</style>
