<template lang="html">
  <div class="newspaper-inner">
    <div class="container_xl">
      <div class="new-category-title">
        <h2>{{ $store.state.translations["main.newspaper"] }}</h2>
      </div>
      <div class="news-breadcrumb">
        <nuxt-link :to="localePath('/')"
          >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath(`/newspaper`)"
          >{{ $store.state.translations["main.newspaper"] }}
          <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath('/')" style="pointer-events: none"
          >{{ newspaper?.title }} <span v-html="dropdown"></span
        ></nuxt-link>
      </div>
      <div class="newspaperInner__body">
        <h2 class="newspaperInner__title">
          {{ newspaper?.title }} ({{
            newspaper?.language == "uz" ? "O’zbek tilida" : "Rus tilida"
          }})
        </h2>
        <iframe :src="newspaper?.file" title="Iframe Example"></iframe>
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
    const [newspaperData] = await Promise.all([
      store.dispatch("fetchNewspapers/getNewspapersBySlug", {
        id: params.index,
        headers: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
    ]);
    const newspaper = newspaperData;
    return {
      newspaper,
    };
  },
};
</script>
<style lang="css">
.newspaper-inner {
  padding-top: 40px;
  padding-bottom: 40px;
}
.newspaperInner__body iframe {
  width: 100%;
  height: 100vh;
}

.newspaperInner__title {
  color: var(--white_ffffff, #000);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 47px;
}
@media (max-width: 576px) {
  .newspaperInner__title {
    font-size: 16px;
    margin-bottom: 24px;
  }
}
</style>
