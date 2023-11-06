<template>
  <div class="home-page all-news-page">
    <div class="container_xl">
      <div class="home-page-grid row mx-0">
        <div class="col-lg-9 col-xs-12 p-0 home-page-left">
          <div class="all-news-page-container">
            <h3>{{ $store.state.translations["main.all_news"] }}</h3>

            <div class="all-news-page-grid">
              <AllNewsCard
                v-for="newsItem in news"
                :key="newsItem?.id"
                :news="newsItem"
              />
            </div>
            <div class="spinner mt-4 d-flex justify-content-center w-100" v-if="loading">
              <a-spin />
            </div>
            <div
              class="btn_container_show_more mt-4"
              v-if="Number(totalCount) / (Number($route.query.page) * 11) > 1 && !loading"
            >
              <div class="right-show-more">
                {{ $store.state.translations["main.more"] }}
              </div>
              <div class="right-show-more-primary" @click="showMore()">
                {{ $store.state.translations["main.see_all"] }}
              </div>
            </div>
          </div>
        </div>
        <div class="home-page-right all-news-right col-lg-3 p-0 position-relative">
          <div style="position: sticky; top: 30px">
            <div class="block2">
              <div class="right-banner">
                <a :href="banners[0]?.link">
                  <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
                </a>
              </div>
            </div>
            <TitleComp
              :link="false"
              :title="$store.state.translations['main.all_news']"
            />
            <div class="right-news-list">
              <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
            </div>
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
import TitleComp from "../components/Title-comp.vue";
import HNewsCard from "../components/cards/HNewsCard.vue";
import AllNewsCard from "../components/cards/AllNewsCard.vue";
import RightNewsCard from "../components/cards/RightNewsCard.vue";

export default {
  data() {
    return {
      showAll: false,
      currentPage: 1,
      page_size: 11,
      loading: false,
    };
  },
  async asyncData({ store, i18n, router, route, query }) {
    const [newsData, importantNewsData, bannersData] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { page: query.page, page_size: 11 },
        headers: {
          Language: i18n.locale,
        },
      }),

      store.dispatch("fetchNews/getNews", {
        params: { important: true, page_size: 6 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const totalCount = newsData?.count;
    const news = newsData.results;
    const importantNews = importantNewsData.results;
    const banners = bannersData.results;
    return {
      news,
      importantNews,
      banners,
      totalCount,
    };
  },
  mounted() {
    if (Object.keys(this.$route.query).length == 0) {
      this.$router.replace({
        path: "/all-news",
        query: {
          page: 1,
        },
      });
    }
  },
  methods: {
    async showMore() {
      this.currentPage = Number(this.$route.query.page) + 1;
      await this.$router.push(
        this.localePath({
          path: "/all-news",
          query: {
            page: this.currentPage,
          },
        })
      );
      this.__GET_NEWS();
    },
    async __GET_NEWS() {
      this.loading = true;
      const [newsData] = await Promise.all([
        this.$store.dispatch("fetchNews/getNews", {
          params: { page: this.$route.query.page, page_size: this.page_size },
          headers: {
            Language: this.$i18n.locale,
          },
        }),
      ]);
      this.loading = false;
      this.totalCount = newsData.count;
      this.news = [...this.news, ...newsData.results];
    },
  },
  components: {
    TitleComp,
    HNewsCard,
    RightNewsCard,
    TitleComp,
    AllNewsCard,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
.all-news-page {
  padding-top: 28px;
  padding-left: 5px;
  padding-right: 5px;
}
.all-news-page-container h3 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: var(--text_color);
  margin-bottom: 30px;
}
.all-news-page-container h3 span {
  color: #0192ff;
}
.all-news-page-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
}
.all-news-page-container {
  width: 90%;
}
@media screen and (max-width: 992px) {
  .all-news-page-container h3 {
    font-size: 19px;
    font-weight: 600;
    line-height: 170%;
  }
  .all-news-page-container {
    width: 100%;
  }
  .all-news-page-grid {
    grid-gap: 16px;
  }
  .all-news-page-container {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .all-news-right {
    display: none;
  }
}
</style>
