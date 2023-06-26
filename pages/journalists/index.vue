<template>
  <div class="home-page journalists-page">
    <div class="container_xl">
      <h3 class="journalists-page-title">
        O’zbekiston jurnalistlari <span>(523) </span>
      </h3>
      <div class="journalists_container">
        <JournalistsCard />
        <JournalistsCard />
        <JournalistsCard />
        <JournalistsCard />
        <JournalistsCard />
      </div>
      <div class="">
        <div class="btn_container_show_more">
          <div class="right-show-more">Yana yuklash</div>
          <div class="right-show-more-primary">Barchasini ko'rish</div>
        </div>
        <div class="messangers-container">
          <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
          <div class="follow-us-message">FOLLOW US!</div>
          <div class="messanger-icons">
            <a href="#">
              <span v-html="telegram"> </span>
            </a>
            <a href="#">
              <span v-html="facebook"> </span>
            </a>
            <a href="#">
              <span v-html="twitter"> </span>
            </a>
            <a href="#">
              <span v-html="instagram"> </span>
            </a>
            <a href="#">
              <span v-html="whatsapp"> </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JournalistsCard from "@/components/cards/JournalistsCard.vue";

export default {
  data() {
    return {
      telegram: require("@/assets/svg/telegram.svg?raw"),
      facebook: require("@/assets/svg/facebook.svg?raw"),
      twitter: require("@/assets/svg/twitter.svg?raw"),
      instagram: require("@/assets/svg/instagram.svg?raw"),
      whatsapp: require("@/assets/svg/whatsapp.svg?raw"),
    };
  },
  // async mounted() {
  //   const [newsData, topNewsData, simpleNewsData] = await Promise.all([
  //     this.$store.dispatch("fetchNews/getNews", {
  //       params: { last_news: true, page_size: 3 },
  //       headers: {
  //         Language: this.$i18n.locale,
  //       },
  //     }),
  //     this.$store.dispatch("fetchNews/getNews", {
  //       params: { top: true, page_size: 1 },
  //       headers: {
  //         Language: this.$i18n.locale,
  //       },
  //     }),
  //     this.$store.dispatch("fetchNews/getNews", {
  //       headers: {
  //         Language: this.$i18n.locale,
  //       },
  //     }),
  //     this.$store.dispatch("fetchCategories/getCategoriesBySlug", {
  //       id: this.$route.params.index,
  //       header: {
  //         headers: {
  //           Language: this.$i18n.locale,
  //         },
  //       },
  //     }),
  //   ]);
  // },
  //   async asyncData({ store, params, i18n }) {
  //     const [newsData, topNewsData, simpleNewsData, categoriesData] = await Promise.all([
  //       store.dispatch("fetchNews/getNews", {
  //         params: { last_news: true, page_size: 3 },
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //       store.dispatch("fetchNews/getNews", {
  //         params: { top: true, page_size: 1 },
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //       store.dispatch("fetchNews/getNews", {
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //       store.dispatch("fetchCategories/getCategoriesBySlug", {
  //         id: params.index,
  //         header: {
  //           headers: {
  //             Language: i18n.locale,
  //           },
  //         },
  //       }),
  //     ]);
  //     const news = newsData.results;
  //     const topNews = topNewsData.results;
  //     const simpleNews = simpleNewsData.results;
  //     const categories = categoriesData;
  //     return {
  //       news,
  //       topNews,
  //       simpleNews,
  //       categories,
  //     };
  //   },
  components: { JournalistsCard },
};
</script>
<style lang="css">
@import "@/assets/css/pages/news-menu-page.css";
.journalists_container {
  margin-top: 16px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.journalists-page-title {
  color: var(--dark-blue-100, #051769);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
}
.journalists-page-title span {
  color: var(--dark-blue-60, #6974a5);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-left: 13px;
}
.journalists-page {
  padding-top: 40px;
}
</style>
