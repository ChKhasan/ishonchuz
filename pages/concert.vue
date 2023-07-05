<template lang="html">
  <div class="theater-page">
    <div class="container_xl">
      <div class="theater_title">
        <h3>{{ $store.state.translations["main.concerts"] }}</h3>
      </div>
      <div class="theater-page-container" v-if="showAll">
        <TheaterCard v-for="theater in theaters" :key="theater?.id" :theater="theater" />
      </div>
      <div class="theater-page-container" v-else>
        <TheaterCard
          v-for="theater in theaters.slice(0, 8)"
          :key="theater?.id"
          :theater="theater"
        />
      </div>
      <div class="theater__show" v-if="theaters.length > 8">
        <div class="btn_container_show_more">
          <div class="right-show-more">
            {{ $store.state.translations["news.see_again"] }}
          </div>
          <div class="right-show-more-primary" @click="showAll = true">
            {{ $store.state.translations["news.see_again"] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheaterCard from "../components/cards/TheaterCard.vue";

export default {
  data() {
    return {
      showAll: false,
    };
  },
  async asyncData({ store, i18n }) {
    const [theatersData] = await Promise.all([
      store.dispatch("fetchConcert/getTheaters", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    console.log(theatersData);
    const theaters = theatersData.results;
    return {
      theaters,
    };
  },
  components: { TheaterCard },
};
</script>
<style lang="css">
@import "../assets/css/pages/theater.css";
.theater__show {
  max-width: 214px;
  margin: 0 auto;
}
</style>
