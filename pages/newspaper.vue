<template>
  <div class="newspaper-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>Gazeta</h5>
        <ul class="library_tab">
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'literature',
            }"
            class="news-menu-active-categry"
          >
            <span @click="tabChange('literature')">{{
              $store.state.translations["main.see_all"]
            }}</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'scientific',
            }"
          >
            <span @click="tabChange('scientific')">O’zbek tili</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'articles',
            }"
          >
            <span @click="tabChange('articles')">{{
              $store.state.translations["main.russian"]
            }}</span>
          </li>
        </ul>
      </div>
      <div class="newspaper-page-container">
        <NewspaperCard
          v-for="newspaper in newspapers"
          :key="newspaper?.id"
          :newspaper="newspaper"
        />
      </div>
      <div>
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
  async asyncData({ store, i18n }) {
    const [newspapersData] = await Promise.all([
      store.dispatch("fetchNewspapers/getNewspapers", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const newspapers = newspapersData.results;
    return {
      newspapers,
    };
  },
  mounted() {
    if (Object.keys(this.$route.query).length == 0) {
      this.tabChange("literature");
    }
  },
  methods: {
    tabChange(name) {
      this.$router.replace({
        path: "/newspaper",
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

.newspaper-page {
  padding-top: 28px;
  padding-bottom: 80px;
}

.newspaper-page-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 30px;
}
</style>
