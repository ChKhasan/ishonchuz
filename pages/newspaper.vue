<template>
  <div class="newspaper-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>Gazeta</h5>
        <ul class="library_tab">
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'all',
            }"
          >
            <span @click="tabChange('all')">{{
              $store.state.translations["main.see_all"]
            }}</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'uz',
            }"
          >
            <span @click="tabChange('uz')">O’zbek tili</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'ru',
            }"
          >
            <span @click="tabChange('ru')">{{
              $store.state.translations["main.russian"]
            }}</span>
          </li>
        </ul>
      </div>

      <div class="newspaper-page-container" v-if="newspapers.length > 0">
        <NewspaperCard
          v-for="newspaper in newspapers"
          :key="newspaper?.id"
          :newspaper="newspaper"
        />
      </div>

      <div v-else>
        <div class="messangers-container">
          <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
          <div class="follow-us-message">
            {{ $store.state.translations["main.follow"] }}
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
  computed: {
    routerQuery() {
      return this.$route.query.type;
    },
  },
  async asyncData({ store, i18n, query }) {
    const [newspapersData] = await Promise.all([
      store.dispatch("fetchNewspapers/getNewspapers", {
        params: { language: query.type != "all" ? query.type : "" },
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
      this.tabChange("all");
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
  watch: {
    async routerQuery(val) {
      const [newspapersData] = await Promise.all([
        this.$store.dispatch("fetchNewspapers/getNewspapers", {
          params: { language: val != "all" ? val : "" },
          headers: {
            Language: this.$i18n.locale,
          },
        }),
      ]);
      this.newspapers = newspapersData.results;
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
@media (max-width: 576px) {
  .newspaper-page-container {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}
@media (max-width: 360px) {
  .newspaper-page-container {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
}
</style>
