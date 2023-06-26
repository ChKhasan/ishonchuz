<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <div class="profile-grid">
        <ProfileMenu />
        <div class="profile-saved">
          <h3>{{ $store.state.translations["main.my-shelf"] }}</h3>
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
              <span>{{ $store.state.translations["main.society"] }}</span>
            </li>
          </ul>
          <div
            class="saved-books-grid"
            v-if="$route.query.type == 'literature'"
          >
            <BookCard
              v-for="book in savedBooks?.literature_books"
              :book="book"
              :key="book?.id"
            />
          </div>
          <div
            class="saved-books-grid"
            v-if="$route.query.type == 'scientific'"
          >
            <BookCard
              v-for="book in savedBooks?.science_books"
              :book="book"
              :key="book?.id"
            />
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>
<script>
import ProfileMenu from "../../components/profile-menu.vue";
import Loading from "../../components/loading.vue";
import BookCard from "../../components/cards/BookCard.vue";

export default {
  middleware: "auth",
  data() {
    return {
      loading: true,
      savedBooks: {},
    };
  },

  mounted() {
    if (this.loading) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    }
    if (Object.keys(this.$route.query).length == 0) {
      this.tabChange("literature");
    }
    this.__GET_SAVED();
    this.middlewareAuth();
  },
  methods: {
    tabChange(name) {
      this.$router.replace({
        path: "/profile/saved",
        query: {
          type: name,
        },
      });
    },
    async __GET_SAVED() {
      const literatureStore = JSON.parse(localStorage.getItem("literature"));
      const scienceStore = JSON.parse(localStorage.getItem("science"));
      const savedData = await this.$store.dispatch(
        "fetchAuth/postViewSaved",
        {
          literature: literatureStore,
          science: scienceStore,
          articles: [],
        },
        {
          headers: {
            Language: this.$i18n.locale,
          },
        }
      );
      this.savedBooks = savedData;
      console.log(savedData);
    },
    middlewareAuth() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/");
      } else {
        this.loading = false;
      }
    },
  },

  watch: {
    loading(val) {
      if (val) {
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    },
  },
  components: { ProfileMenu, Loading, BookCard },
};
</script>
<style lang="css">
.profile-page {
  padding-top: 78px;
}
.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
}
.profile-saved h3 {
  color: var(--black, #020105);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 16px;
}
.saved-books-grid {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}
.profile-saved {
  border-radius: 8px;
  border: 1px solid var(--black-5, #e7e7e7);
  background: var(--white, #fff);
  padding: 50px 65px;
}
</style>
