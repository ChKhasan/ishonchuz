<template>
  <div class="home-page news-menu-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>{{ categories?.parent?.title }}</h5>
        <ul>
          <li
            v-for="child in categories?.parent?.children"
            :key="child?.id"
            :class="{ 'news-menu-active-categry': $route.params.index == child?.slug }"
          >
            <nuxt-link :to="`/news-menu/${child?.slug}`">{{ child?.title }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="home-page-grid row">
        <div class="col-9 p-0 home-page-left">
          <div class="" v-if="categories?.top_news.length > 0">
            <BannerCard :topNews="categories?.top_news[0]" />
          </div>
          <div class="v-news-grid">
            <VNewsCard v-for="item in news" :key="item?.id" :news="item" />
          </div>
          <div class="h-news-grid news-menu_news-list">
            <HNewsCard v-for="news in simpleNews" :key="news?.id" :news="news" />
          </div>
          <div class="right-show-more">Yana yuklash</div>
          <div class="messangers-container">
            <h5>Bizni ijtimoiy tarmoqlarda kuzating</h5>
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
        <div class="home-page-right col-3 p-0">
          <div class="block1">
            <div class="right-banner mt-0">
              <img src="../../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <div class="block2">
            <div class="right-banner">
              <img src="../../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerCard from "../../components/cards/BannerCard.vue";
import HNewsCard from "../../components/cards/HNewsCard.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
export default {
  data() {
    return {
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      // news: [],
      // topNews: [],
      // simpleNews: [],
    };
  },
  async mounted() {
    const [newsData, topNewsData, simpleNewsData] = await Promise.all([
      this.$store.dispatch("fetchNews/getNews", { last_news: true, page_size: 3 }),
      this.$store.dispatch("fetchNews/getNews", { top: true, page_size: 1 }),
      this.$store.dispatch("fetchNews/getNews", {}),
      this.$store.dispatch(
        "fetchCategories/getCategoriesBySlug",
        this.$route.params.index
      ),
    ]);
  },
  async asyncData({ store, params }) {
    const [newsData, topNewsData, simpleNewsData, categoriesData] = await Promise.all([
      store.dispatch("fetchNews/getNews", { last_news: true, page_size: 3 }),
      store.dispatch("fetchNews/getNews", { top: true, page_size: 1 }),
      store.dispatch("fetchNews/getNews", {}),
      store.dispatch("fetchCategories/getCategoriesBySlug", params.index),
    ]);
    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    const categories = categoriesData;
    return {
      news,
      topNews,
      simpleNews,
      categories,
    };
  },
  components: {
    BannerCard,
    HNewsCard,
    VNewsCard,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/news-menu-page.css";
.news-menu_news-list {
  margin-bottom: 80px;
}
</style>
