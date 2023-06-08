<template lang="html">
  <div class="default-layout" :class="{ 'dark-theme': !$store.state.theme }">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "../components/layout/Footer.vue";
import Header from "../components/layout/Header.vue";

export default { components: { Header, Footer } };
</script>
<style lang="css">
.default-layout {
  background-color: var(--body_color);
}
</style>
