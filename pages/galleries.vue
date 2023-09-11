<template>
  <div class="galleries-page">
    <div class="container_xl">
      <div class="galleries-page-header">
        <h5>{{ $store.state.translations["main.new-uzbekistan"] }}</h5>
      </div>
      <div class="galleries-page-container" v-if="showAll">
        <div class="galleries-card" v-for="image in galleries" :key="image?.id">
          <img :src="image?.image" alt="" />
        </div>
      </div>
      <div class="galleries-page-container" v-else>
        <div
          v-for="image in galleries.slice(0, 10)"
          class="galleries-card"
          :key="image?.id"
        >
          <div class="galleries-card-img">
            <img :src="image?.image" alt="" />
          </div>
          <p>{{ image?.title }}</p>
        </div>
      </div>
      <div>
        <div class="btn_container_show_more" v-if="galleries?.length > 10 && !showAll">
          <div class="right-show-more">
            {{ $store.state.translations["main.more"] }}
          </div>
          <div class="right-show-more-primary" @click="showAll = true">
            {{ $store.state.translations["main.see_all"] }}
          </div>
        </div>
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
      showAll: false,
      activeTab: "literature",
      telegram: require("../assets/svg/telegram.svg?raw"),
      facebook: require("../assets/svg/facebook.svg?raw"),
      twitter: require("../assets/svg/twitter.svg?raw"),
      instagram: require("../assets/svg/instagram.svg?raw"),
      whatsapp: require("../assets/svg/whatsapp.svg?raw"),
    };
  },
  async asyncData({ store, i18n }) {
    const [galleriesData] = await Promise.all([
      store.dispatch("fetchBanners/getGalleries", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const galleries = galleriesData.results;
    return {
      galleries,
    };
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
  color: var(--white_ffffff, #000);
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
.galleries-card-img {
  height: 456px;
  border-radius: 6px;
  overflow: hidden;
}
/* .galleries-card {
  grid-column-start: 1;
  grid-column-end: 4;
} */
.galleries-card-img img {
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
@media (max-width: 1024px) {
  .galleries-page-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  .galleries-card {
    height: auto;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    grid-column: auto;
  }
}
.galleries-card p {
  margin-top: 8px;
  color: #aaa;
}
@media (max-width: 360px) {
  .galleries-page-header {
    display: flex;
    justify-content: center;
  }
  .galleries-page-header h5 {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
  }
}
</style>
