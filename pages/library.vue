<template>
  <div class="home-page library-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>{{ $store.state.translations["main.libraries"] }}</h5>
        <ul class="library_tab">
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'literature',
            }"
          >
            <span @click="tabChange('literature')">{{
              $store.state.translations["main.literature"]
            }}</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'scientific',
            }"
          >
            <span @click="tabChange('scientific')">{{
              $store.state.translations["main.science"]
            }}</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'articles',
            }"
          >
            <span @click="tabChange('articles')">{{
              $store.state.translations["main.articles"]
            }}</span>
          </li>
          <li>
            <span>{{ $store.state.translations["main.kasaba"] }}</span>
          </li>
        </ul>
      </div>
      <div
        class="library-page-container"
        v-if="$route.query.type == 'literature'"
      >
        <BookCard v-for="book in literature" :key="book.id" :book="book" />
      </div>
      <div
        class="library-page-container"
        v-if="$route.query.type == 'scientific'"
      >
        <BookCard v-for="book in scientific" :key="book.id" :book="book" />
      </div>
      <div
        class="articles-page-container"
        v-if="$route.query.type == 'articles'"
      >
        <ArticlesCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BookCard from "../components/cards/BookCard.vue";
import ArticlesCard from "../components/cards/ArticlesCard.vue";

export default {
  data() {
    return {
      activeTab: "literature",
    };
  },
  async asyncData({ store, i18n }) {
    const [literatureData, scientificData, articlesData] = await Promise.all([
      store.dispatch("fetchBooks/getBooks", {
        params: {
          type: "literature",
        },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchBooks/getBooks", {
        params: {
          type: "science",
        },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchBooks/getArticles", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const literature = literatureData.results;
    const scientific = scientificData.results;
    const articles = articlesData.results;
    return {
      literature,
      scientific,
      articles,
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
        path: "/library",
        query: {
          type: name,
        },
      });
    },
  },
  components: {
    BookCard,
    ArticlesCard,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";

.library-page-page {
  padding-top: 28px;
}
.library-page-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 30px;
}
.articles-page-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
}
</style>
