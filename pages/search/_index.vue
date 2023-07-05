<template lang="html">
  <div class="search-page">
    <div class="container_xl">
      <div class="search-page-input" v-if="newsSearch?.length > 0">
        <input v-model="searchVal" @keyup.enter="searchFunc" placeholder="Search..." />
        <span @click="searchFunc" v-html="search"></span>
      </div>
      <div class="home-page-grid row" v-if="newsSearch?.length > 0">
        <div class="col-lg-9 col-xs-12 p-0 home-page-left">
          <div class="search-page-container">
            <h3 v-if="newsSearch?.length > 0">
              “{{ $route.params.index }}” jumlasi bo’yicha qidiruv natijasi -
              <span>{{ newsSearch?.length }}</span> ta maqola topildi
            </h3>
            <h3 v-else>
              “{{ $route.params.index }}” jumlasi bo’yicha ma’lumotlar topilmadi
            </h3>
            <div class="search-page-grid search_web_news" v-if="showAll">
              <VNewsCard v-for="news in newsSearch" :key="news?.id" :news="news" />
            </div>
            <div class="search-page-grid search_web_news" v-else>
              <VNewsCard
                v-for="news in newsSearch.slice(0, 18)"
                :key="news?.id"
                :news="news"
              />
            </div>
            <div class="search-page-grid search_mobile_news" v-if="showAll">
              <AllNewsCard
                v-for="newsItem in newsSearch"
                :key="newsItem?.id"
                :news="newsItem"
              />
            </div>
            <div class="search-page-grid search_mobile_news" v-else>
              <AllNewsCard
                v-for="newsItem in newsSearch.slice(0, 18)"
                :key="newsItem?.id"
                :news="newsItem"
              />
            </div>
            <div class="d-flex justify-content-center">
              <div
                class="btn_container_show_more w-100"
                v-if="newsSearch?.length > 18 && !showAll"
              >
                <div class="right-show-more">
                  {{ $store.state.translations["main.more"] }}
                </div>
                <div class="right-show-more-primary" @click="showAll = true">
                  {{ $store.state.translations["main.see_all"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-page-right col-3 p-0">
          <div class="block2">
            <div class="right-banner">
              <img src="../../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <TitleComp
            :link="false"
            :title="$store.state.translations['main.active_topics']"
          />

          <div class="right-news-list">
            <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
          </div>

          <div class="right-banner">
            <img src="../../assets/images/Снимок экрана (926).png" alt="" />
          </div>
        </div>
      </div>
      <div class="search_empty search-page-container" v-else>
        <h3>
          “{{ $route.params.index }}” jumlasi bo’yicha qidiruv natijasi -
          <span>{{ newsSearch?.length }}</span> ta maqola topildi
        </h3>
        <div class="search_to_back">
          <div class="btn_container_show_more">
            <div class="right-show-more">Bosh sahifaga qaytish</div>
            <div class="right-show-more-primary" @click="$router.push('/')">
              Bosh sahifaga qaytish
            </div>
          </div>
        </div>
        <div v-if="newsSearch?.length == 0">
          <div class="messangers-container">
            <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
            <div class="follow-us-message">FOLLOW US!</div>
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
  </div>
</template>

<script>
import TitleComp from "../../components/Title-comp.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
import RightNewsCard from "../../components/cards/RightNewsCard.vue";
import AllNewsCard from "../../components/cards/AllNewsCard.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      showAll: false,
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      search: require("../../assets/svg/search.svg?raw"),
      // searchVal: "",
    };
  },
  async asyncData({ store, params, i18n }) {
    const [searchData, importantNewsData] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { search: params.index },
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
    ]);
    const newsSearch = searchData.results;
    const importantNews = importantNewsData.results;
    const searchVal = params.index;
    return {
      newsSearch,
      importantNews,
      searchVal,
    };
  },
  methods: {
    searchFunc() {
      console.log("asdasdasd");
      this.$router.replace({
        path: `/search/${this.searchVal}`,
      });
      this.$store.dispatch("fetchNews/getNews", {
        params: { search: this.$route.params.index },
        headers: {
          Language: this.$i18n.locale,
        },
      });
    },
  },
  components: {
    TitleComp,
    VNewsCard,
    RightNewsCard,
    TitleComp,
    AllNewsCard,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
.search_empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-page {
  padding-top: 28px;
  padding-bottom: 40px;
}
.search_to_back {
  margin: 0 auto;
  min-width: 337px;
  margin-top: 50px;
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
.search-page-input {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.search-page-input input {
  border-radius: 8px;
  border: 1px solid var(--black_111111, #9ba2c3);
  background: var(--black_414141, #f9f9f9);
  padding: 12px 12px 12px 59px;
  color: var(--white_ffffff, #292929);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  min-width: 460px;
}
.search-page-input input:focus {
  outline: none;
}
.search-page-input span {
  position: absolute;
  left: 12px;
}
.search_web_news {
  display: grid;
}
.search_mobile_news {
  display: none;
}
@media (max-width: 360px) {
  .search-page-grid {
    grid-template-columns: 1fr;
    margin-bottom: 50px;
  }
  .search-page-container h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
  }
  .search-page {
    padding-top: 20px;
  }
}
@media (max-width: 576px) {
  .search-page-grid {
    grid-template-columns: 1fr;
    margin-bottom: 50px;
  }
  .search_to_back {
    min-width: 100%;
  }
}
@media (max-width: 992px) {
  .search-page-right {
    display: none;
  }
}
@media (max-width: 768px) {
  .search-page-right {
    display: none;
  }
  .search-page-input {
    max-width: 100%;
    width: 100%;
  }
  .search-page-input input {
    max-width: 100%;
    width: 100%;
    min-width: 0px !important;
  }
  .search_web_news {
    display: none;
  }
  .search_mobile_news {
    display: grid;
  }
}
</style>
