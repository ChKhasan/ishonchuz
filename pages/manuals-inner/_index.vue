<template>
  <div class="about-page">
    <div class="container_xl">
      <div class="new-category-title">
        <h2>{{ $store.state.translations["main.library"] }}</h2>
      </div>
      <div class="news-breadcrumb">
        <nuxt-link :to="localePath('/')"
          >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath(`/library?type=manuals`)"
          >{{ $store.state.translations["main.manuals"] }} <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath('/')" style="pointer-events: none"
          >{{ article?.title }} <span v-html="dropdown"></span
        ></nuxt-link>
      </div>
      <div class="engineers-container">
        <h2>{{ article?.title }}</h2>
        <div class="" v-html="article?.text"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
    };
  },
  async asyncData({ store, i18n, params }) {
    const [articleData] = await Promise.all([
      store.dispatch("fetchBooks/getArticlesBySlug", {
        id: params.index,
        header: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
    ]);
    const article = articleData;
    return {
      article,
    };
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/news-menu-page.css";
@import "../../assets/css/pages/site-info.css";
</style>
