<template lang="html">
  <div class="h-news-card">
    <nuxt-link :to="`/news/${news?.slug}`">
      <div class="h-news-card-img">
        <img v-if="news?.image" :src="news?.image" alt="" />
        <img v-else src="../../assets/images/Снимок экрана (925).png" alt="" />
      </div>
    </nuxt-link>
    <div class="h-news-card-body">
      <nuxt-link :to="`/news/${news?.slug}`">
        {{ news?.title }}
      </nuxt-link>
      <div class="h-news-card-info">
        <span> <span v-html="comments"></span> 0</span>
        <span><span v-html="view"></span>{{ news?.views }}</span>
        <span><span v-html="date"></span>{{ news?.date }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["news"],
  data() {
    return {
      comments: require("../../assets/svg/comments.svg?raw"),
      view: require("../../assets/svg/view.svg?raw"),
      date: require("../../assets/svg/date.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.h-news-card {
  padding-top: 10px;
  padding-bottom: 13px;
  display: grid;
  grid-template-columns: 1.6fr 2.8fr;
  grid-gap: 16px;
  border-bottom: 1px solid #eeeeee;
}

.h-news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.h-news-card-img {
  height: 107px;
  border-radius: 2px;
  background-color: gray;
}
.h-news-card-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.h-news-card:hover a {
  color: #0192ff;
}
.h-news-card-body a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  /* height: 42px; */
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.h-news-card-info > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
}
.h-news-card-info span span {
  margin-right: 7px;
}
.h-news-card-info {
  display: flex;
  justify-content: space-between;
}
</style>
