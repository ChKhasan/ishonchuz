<template>
  <div class="galleries-page">
    <div class="container_xl">
      <div class="galleries-page-header">
        <h5>{{ $store.state.translations["main.new-uzbekistan"] }}</h5>
      </div>
      <div class="galleries-page-container">
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>

        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>

        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
        <div class="galleries-card">
          <img src="../assets/images/galleries.png" alt="" />
        </div>
      </div>
      <div>
        <div class="btn_container_show_more">
          <div class="right-show-more">
            {{ $store.state.translations["main.more"] }}
          </div>
          <div class="right-show-more-primary">
            {{ $store.state.translations["main.see_all"] }}
          </div>
        </div>
        <div class="messangers-container">
          <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
          <div class="follow-us-message">
            {{ $store.state.translations["main.follow"] }}
          </div>
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
import BookCard from "../components/cards/BookCard.vue";
import ArticlesCard from "../components/cards/ArticlesCard.vue";
import NewspaperCard from "../components/cards/NewspaperCard.vue";

export default {
  data() {
    return {
      activeTab: "literature",
      telegram: require("../assets/svg/telegram.svg?raw"),
      facebook: require("../assets/svg/facebook.svg?raw"),
      twitter: require("../assets/svg/twitter.svg?raw"),
      instagram: require("../assets/svg/instagram.svg?raw"),
      whatsapp: require("../assets/svg/whatsapp.svg?raw"),
    };
  },
  //   async asyncData({ store, i18n }) {
  //     const [literatureData, scientificData, articlesData] = await Promise.all([
  //       store.dispatch("fetchBooks/getBooks", {
  //         params: {
  //           type: "literature",
  //         },
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //       store.dispatch("fetchBooks/getBooks", {
  //         params: {
  //           type: "science",
  //         },
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //       store.dispatch("fetchBooks/getArticles", {
  //         headers: {
  //           Language: i18n.locale,
  //         },
  //       }),
  //     ]);
  //     const literature = literatureData.results;
  //     const scientific = scientificData.results;
  //     const articles = articlesData.results;
  //     return {
  //       literature,
  //       scientific,
  //       articles,
  //     };
  //   },
  mounted() {
    if (Object.keys(this.$route.query).length == 0) {
      this.tabChange("literature");
    }
  },
  methods: {
    tabChange(name) {
      this.$router.replace({
        path: "/galleries",
        query: {
          type: name,
        },
      });
    },
  },
  components: {
    BookCard,
    ArticlesCard,
    NewspaperCard,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";
.galleries-page-header h5 {
  color: var(--black-100, #000);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 24px;
}
.galleries-page {
  padding-top: 28px;
  padding-bottom: 80px;
}

.galleries-page-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 30px;
  margin-bottom: 30px;
}
.galleries-card {
  height: 456px;
}
/* .galleries-card {
  grid-column-start: 1;
  grid-column-end: 4;
} */
.galleries-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.galleries-card:nth-child(5n + 1) {
  grid-column: 1 / 4;
}
.galleries-card:nth-child(5n + 2) {
  grid-column: 4 / 7;
}
.galleries-card:nth-child(5n + 3) {
  grid-column: 1 / 3;
}
.galleries-card:nth-child(5n + 4) {
  grid-column: 3 / 5;
}
.galleries-card:nth-child(5n + 5) {
  grid-column: 5 / 7;
}
</style>
