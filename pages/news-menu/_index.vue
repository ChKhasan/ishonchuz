<template>
  <div class="home-page news-menu-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>
          {{ categories?.parent?.title ? categories?.parent?.title : categories?.title }}
        </h5>
        <ul class="library_tab" v-if="categories?.parent?.children?.length > 0">
          <li
            v-for="child in categories?.parent?.children"
            :key="child?.id"
            :class="{
              'news-menu-active-categry': $route.params.index == child?.slug,
            }"
          >
            <nuxt-link :to="localePath(`/news-menu/${child?.slug}`)">{{
              child?.title
            }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="home-page-grid row">
        <div class="col-lg-9 col-md-12 p-0 home-page-left">
          <div class="" v-if="categories?.news?.length > 0">
            <BannerCard :topNews="categories?.news[0]" />
          </div>
          <div class="v-news-grid" v-if="categories?.video_news?.length > 0">
            <VNewsCard
              v-for="item in categories?.video_news.slice(0, 3)"
              :key="item?.id"
              :news="item"
            />
          </div>
          <div
            class="h-news-grid news-menu_news-list"
            v-if="categories?.news?.length > 1"
          >
            <HNewsCard
              v-for="news in categories?.news.filter((item, index) => index != 0)"
              :key="news?.id"
              :news="news"
            />
          </div>
          <!-- <div class="right-show-more">{{ $store.state.translations["main.more"] }}</div> -->
          <div class="spinner mt-4 d-flex justify-content-center w-100" v-if="loading">
            <a-spin />
          </div>
          <div
            class="btn_container_show_more"
            v-if="
              Number(totalCount) / Number(Number($route.query.page) * 20) > 1 && !loading
            "
          >
            <div class="right-show-more">
              {{ $store.state.translations["main.more"] }}
            </div>
            <div class="right-show-more-primary" @click="showMore()">
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
          <div style="position: sticky; top: 30px">
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
  </div>
</template>

<script>
import BannerCard from "../../components/cards/BannerCard.vue";
import HNewsCard from "../../components/cards/HNewsCard.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
export default {
  data() {
    return {
      showAll: false,
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      currentPage: 1,
      page_size: 11,
      loading: false,
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
  async asyncData({ store, params, i18n, query }) {
    const [
      newsData,
      topNewsData,
      simpleNewsData,
      categoriesData,
      bannersData,
    ] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { last_news: true, page_size: 3 },
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
      store.dispatch("fetchCategories/getCategoriesBySlug", {
        id: params.index,
        params: {
          params: {
            page_size: 21,
            page: query.page,
          },
          headers: {
            Language: i18n.locale,
          },
        },
      }),
      store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);

    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    const categories = categoriesData;
    const banners = bannersData.results;
    const totalCount = categoriesData.news_count;
    return {
      news,
      topNews,
      simpleNews,
      categories,
      banners,
      totalCount,
    };
  },
  components: {
    BannerCard,
    HNewsCard,
    VNewsCard,
  },

  mounted() {
    if (Object.keys(this.$route.query).length == 0) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: 1,
        },
      });
    }
  },
  methods: {
    async showMore() {
      this.currentPage = Number(this.$route.query.page) + 1;
      await this.$router.replace({
        path: `/news-menu/${this.$route.params.index}`,
        query: {
          page: this.currentPage,
        },
      });
      this.__GET_NEWS();
    },
    async __GET_NEWS() {
      this.loading = true;
      const [categoriesData] = await Promise.all([
        this.$store.dispatch("fetchCategories/getCategoriesBySlug", {
          id: this.$route.params.index,
          params: {
            params: { page: this.$route.query.page, page_size: 20 },
            headers: {
              Language: this.$i18n.locale,
            },
          },
        }),
      ]);
      this.loading = false;
      this.totalCount = categoriesData.news_count;
      this.categories.news = [...this.categories.news, ...categoriesData?.news];
    },
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/news-menu-page.css";
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
