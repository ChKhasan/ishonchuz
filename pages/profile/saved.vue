<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <ul class="library_tab top_tab">
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-personal-info'),
          }"
        >
          <span @click="$router.push(localePath('/profile/personal-info'))">{{
            $store.state.translations["main.my-room"]
          }}</span>
        </li>
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-my-board'),
          }"
        >
          <span @click="$router.push(localePath('/profile/my-board'))">
            {{ $store.state.translations["main.my-shelf"] }}</span
          >
        </li>
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-saved'),
          }"
        >
          <span @click="$router.push(localePath('/profile/saved'))">{{
            $store.state.translations["main.saved"]
          }}</span>
        </li>
        <li @click="logOut">
          <span>Chiqish</span>
        </li>
      </ul>
      <div class="profile-grid">
        <ProfileMenu />
        <div class="profile-saved">
          <h3 class="profile-saved_title">Mening javonim</h3>
          <ul class="library_tab saved_tab">
            <li
              :class="{
                'news-menu-active-categry': $route.query.type == 'literature',
              }"
            >
              <span @click="tabChange('literature')">Adabiyot</span>
            </li>
            <li
              :class="{
                'news-menu-active-categry': $route.query.type == 'scientific',
              }"
            >
              <span @click="tabChange('scientific')">Ilmiy ishlar</span>
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
          <div class="saved-books-grid" v-if="$route.query.type == 'literature'">
            <BookCard
              v-for="book in savedBooks?.literature_books"
              :book="book"
              :key="book?.id"
            />
          </div>
          <div class="saved-books-grid" v-if="$route.query.type == 'scientific'">
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
    async logOut() {
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
      try {
        const data = await this.$store.dispatch("fetchAuth/postLogOut", {
          refresh_token: refreshToken,
        });
        this.$router.push("/");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.$store.commit("chackAuth");
      } catch (e) {
        if (e.response.status == 401) {
          this.$router.push("/");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.$store.commit("chackAuth");
        }
      }
    },
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
.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
}

.profile-saved_title {
  color: var(--white_ffffff, #020105);
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
  border: 1px solid var(--gray_292929, #e7e7e7);
  background: var(--black_000000, #fff);
  padding: 50px 65px;
}

@media (max-width: 576px) {
  .profile-saved {
    padding: 20px;
  }
  .saved-books-grid {
    margin-top: 20px;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .profile-saved_title {
    font-size: 19px;
    font-weight: 600;
    line-height: 170%;
  }
}
</style>
