<template>
  <div class="home-page search-page">
    <div class="container_xl">
      <div class="home-page-grid row">
        <div class="col-9 p-0 home-page-left">
          <div class="search-page-container">
            <h3 v-if="newsSearch?.length > 0">
              “{{ $route.params.index }}” jumlasi bo’yicha qidiruv natijasi -
              <span>{{ newsSearch?.length }}</span> ta maqola topildi
            </h3>
            <h3 v-else>
              “{{ $route.params.index }}” jumlasi bo’yicha ma’lumotlar topilmadi
            </h3>
            <div class="search-page-grid">
              <VNewsCard v-for="news in newsSearch" :key="news?.id" :news="news" />
            </div>
            <div class="d-flex justify-content-center">
              <!-- <div class="show-more-count">Yana yuklash</div> -->
            </div>
          </div>
        </div>
        <div class="home-page-right col-3 p-0">
          <div class="block2">
            <div class="right-banner">
              <img src="../../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <TitleComp :link="false" title="Dolzarb mavzular" />

          <div class="right-news-list">
            <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
          </div>
          <div class="right-banner">
            <img src="../../assets/images/Снимок экрана (926).png" alt="" />
          </div>
        </div>
      </div>

      <div>
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
    </div>
  </div>
</template>

<script>
import TitleComp from "../../components/Title-comp.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
import RightNewsCard from "../../components/cards/RightNewsCard.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
    };
  },
  async asyncData({ store, params }) {
    const [searchData, importantNewsData] = await Promise.all([
      store.dispatch("fetchNews/getNews", { search: params.index }),
      store.dispatch("fetchNews/getNews", { important: true, page_size: 6 }),
    ]);
    const newsSearch = searchData.results;
    const importantNews = importantNewsData.results;
    return {
      newsSearch,
      importantNews,
    };
  },
  components: {
    TitleComp,
    VNewsCard,
    RightNewsCard,
    TitleComp,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
.search-page {
  padding-top: 28px;
}
.search-page-container h3 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: var(--text_color);
  margin-bottom: 30px;
}
.search-page-container h3 span {
  color: #0192ff;
}
.search-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-bottom: 68px;
}
</style>
