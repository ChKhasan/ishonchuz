<template>
  <div class="home-page journalists-page">
    <div class="container_xl">
      <h3 class="journalists-page-title">
        {{ $store.state.translations["main.journalists"] }} <span>(523) </span>
      </h3>
      <div class="journalists_container" v-if="showAll">
        <JournalistsCard
          v-for="journalist in journalists"
          :journalist="journalist"
          :key="journalist?.id"
        />
      </div>
      <div class="journalists_container" v-else>
        <JournalistsCard
          v-for="journalist in journalists?.slice(0, 9)"
          :journalist="journalist"
          :key="journalist?.id"
        />
      </div>
      <div class="">
        <div class="btn_container_show_more" v-if="journalists?.length > 9">
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
import JournalistsCard from "@/components/cards/JournalistsCard.vue";

export default {
  data() {
    return {
      showAll: false,
      telegram: require("@/assets/svg/telegram.svg?raw"),
      facebook: require("@/assets/svg/facebook.svg?raw"),
      twitter: require("@/assets/svg/twitter.svg?raw"),
      instagram: require("@/assets/svg/instagram.svg?raw"),
      whatsapp: require("@/assets/svg/whatsapp.svg?raw"),
    };
  },

  async asyncData({ store, params, i18n }) {
    const [journalistsData] = await Promise.all([
      store.dispatch("fetchJournalists/getJournalists", {
        params: { last_news: true, page_size: 3 },
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const journalists = journalistsData.results;
    return { journalists };
  },
  components: { JournalistsCard },
};
</script>
<style lang="css">
@import "@/assets/css/pages/news-menu-page.css";
.journalists_container {
  margin-top: 16px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.journalists-page-title {
  color: var(--white_ffffff, #051769);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
}
.journalists-page-title span {
  color: var(--blue_0192FF, #6974a5);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-left: 13px;
}
.journalists-page {
  padding-top: 40px;
}
</style>
