<template>
  <div class="home-page news-menu-page">
    <div class="container_xl">
      <div class="news-menu-page-header"></div>
      <div class="home-page-grid row">
        <div class="col-lg-9 col-xs-12 p-0 home-page-left">
          <div class="" v-if="news?.length > 0">
            <BannerCard :topNews="news[0]" />
          </div>
          <div class="v-news-grid" v-if="news?.length > 1">
            <VNewsCard v-for="item in news.slice(1, 4)" :key="item?.id" :news="item" />
          </div>
          <div class="h-news-grid news-menu_news-list" v-if="news?.length > 1">
            <HNewsCard
              v-for="newsItem in news.slice(4, 24)"
              :key="newsItem?.id"
              :news="newsItem"
            />
          </div>
          <div class="btn_container_show_more" v-if="news.length > 24 && !showAll">
            <div class="right-show-more">
              {{ $store.state.translations["main.more"] }}
            </div>
            <div class="right-show-more-primary" @click="showAll = true">
              {{ $store.state.translations["main.see_all"] }}
            </div>
          </div>
          <div class="messangers-container">
            <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
            <div class="follow-us-message">
              {{ $store.state.translations["main.follow-us"] }}
            </div>
            <div class="messanger-icons">
              <a
                v-if="$store.state.siteInfo['telegram']"
                :href="$store.state.siteInfo['telegram']"
                ><span v-html="telegram"></span
              ></a>
              <a
                v-if="$store.state.siteInfo['facebook']"
                :href="$store.state.siteInfo['facebook']"
                ><span v-html="facebook"></span
              ></a>
              <a
                v-if="$store.state.siteInfo['twitter']"
                :href="$store.state.siteInfo['twitter']"
                ><span v-html="twitter"></span
              ></a>
              <a
                v-if="$store.state.siteInfo['instagram']"
                :href="$store.state.siteInfo['instagram']"
                ><span v-html="instagram"></span
              ></a>
              <a
                v-if="$store.state.siteInfo['whatsapp']"
                :href="$store.state.siteInfo['whatsapp']"
                ><span v-html="whatsapp"></span
              ></a>
            </div>
          </div>
        </div>
        <div class="home-page-right news-page-right col-3 p-0">
          <div class="block1">
            <div class="right-banner mt-0">
              <a :href="banners[0]?.link">
                <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
              </a>
            </div>
          </div>
          <div class="block2">
            <div class="right-banner">
              <a :href="banners[1]?.link">
                <img v-if="banners[1]?.image" :src="banners[1]?.image" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerCard from "../components/cards/BannerCard.vue";
import HNewsCard from "../components/cards/HNewsCard.vue";
import VNewsCard from "../components/cards/VNewsCard.vue";
export default {
  data() {
    return {
      showAll: false,
      telegram: require("../assets/svg/telegram.svg?raw"),
      facebook: require("../assets/svg/facebook.svg?raw"),
      twitter: require("../assets/svg/twitter.svg?raw"),
      instagram: require("../assets/svg/instagram.svg?raw"),
      whatsapp: require("../assets/svg/whatsapp.svg?raw"),
      // news: [],
      // topNews: [],
      // simpleNews: [],
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
  async asyncData({ store, params, i18n }) {
    const [
      newsData,
      topNewsData,
      simpleNewsData,
      //   categoriesData,
      bannersData,
    ] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { video: true },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { top: true, page_size: 1 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        headers: {
          Language: i18n.locale,
        },
      }),
      //   store.dispatch("fetchCategories/getCategoriesBySlug", {
      //     id: params.index,
      //     header: {
      //       headers: {
      //         Language: i18n.locale,
      //       },
      //     },
      //   }),
      store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);

    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    // const categories = categoriesData;
    const banners = bannersData.results;
    return {
      news,
      topNews,
      simpleNews,
      //   categories,
      banners,
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
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";
.news-menu_news-list {
  margin-bottom: 80px;
}

@media screen and (max-width: 1024px) {
  .news-page-right {
    display: none;
  }
  .news-menu-page {
    padding-top: 20px;
  }
}
</style>
