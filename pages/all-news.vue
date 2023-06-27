<template>
  <div class="home-page all-news-page">
    <div class="container_xl">
      <div class="home-page-grid row mx-0">
        <div class="col-lg-9 col-xs-12 p-0 home-page-left">
          <div class="all-news-page-container">
            <h3>Barcha yangliklar</h3>
            <div class="all-news-page-grid" v-if="showAll">
              <AllNewsCard
                v-if="showAll"
                v-for="newsItem in news"
                :key="newsItem?.id"
                :news="newsItem"
              />
            </div>
            <div class="all-news-page-grid" v-else>
              <AllNewsCard
                v-for="newsItem in news.slice(0, 11)"
                :key="newsItem?.id"
                :news="newsItem"
              />
            </div>
            <div class="btn_container_show_more mt-4">
              <div class="right-show-more">
                {{ $store.state.translations["main.more"] }}
              </div>
              <div class="right-show-more-primary" @click="showAll = true">
                {{ $store.state.translations["main.see_all"] }}
              </div>
            </div>
          </div>
        </div>
        <div class="home-page-right all-news-right col-3 p-0">
          <div class="block2">
            <div class="right-banner">
              <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
            </div>
          </div>
          <TitleComp :link="false" title="Barcha yangliklar" />
          <div class="right-news-list">
            <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
          </div>
          <div class="right-banner">
            <img v-if="banners[1]?.image" :src="banners[1]?.image" alt="" />
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
    };
  },
  async asyncData({ store, i18n }) {
    const [newsData, importantNewsData, bannersData] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
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
    const news = newsData.results;
    const importantNews = importantNewsData.results;
    const banners = bannersData.results;
    return {
      news,
      importantNews,
      banners,
    };
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
@media screen and (max-width: 1024px) {
  .all-news-right {
    display: none;
  }
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
}
</style>
