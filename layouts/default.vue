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
  async fetch() {
    const [categoriesData] = await Promise.all([
      this.$store.dispatch("fetchCategories/getCategories", {}),
    ]);
    this.categories = categoriesData.results;
  },
  components: { Header, Footer },
};
</script>
<style lang="css">
.default-layout {
  background-color: var(--body_color);
}
</style>
