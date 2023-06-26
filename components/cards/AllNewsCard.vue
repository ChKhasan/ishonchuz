<template lang="html">
  <div class="all-news-card">
    <nuxt-link :to="localePath(`/news/${news?.slug}`)">
      <div class="all-news-card-img">
        <img v-if="news?.image" :src="news?.image" alt="" />
        <img v-else src="../../assets/images/Снимок экрана (925).png" alt="" />
      </div>
    </nuxt-link>
    <div class="all-news-card-body">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
      <div class="all-news-card-info">
        <!-- <span> <span v-html="comments"></span>{{ news?.comment_count }}</span> -->
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
.all-news-card {
  display: grid;
  grid-template-columns: 169px auto;
  grid-gap: 16px;
  background: var(--black_111111, #f9f9f9);
  padding: 12px;
}

.all-news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.all-news-card-img {
  height: 98px;
  border-radius: 2px;
  background-color: gray;
}
.all-news-card-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.all-news-card:hover a {
  color: #0192ff;
}
.all-news-card-body a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text_color);
  /* height: 42px; */
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.all-news-card-info > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
}
.all-news-card-info span span {
  margin-right: 7px;
}
.all-news-card-info > span {
  margin-left: 26px;
}
.all-news-card-info {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 1024px) {
  .all-news-card {
    grid-template-columns: 96px auto;
    padding: 0;
    grid-gap: 15px;
    padding: 0;
    padding-bottom: 10px;
    background: var(--black_111111, transparent);
    border-bottom: 1px solid var(--black-5, #e7e7e7);
  }
  .all-news-card-img {
    height: 63px;
    background-color: gray;
  }
  .all-news-card-body a {
    font-size: 14px;
    line-height: 145%;
  }
  .all-news-card-info > span {
    text-align: right;
    font-size: 10px;
    line-height: 130%;
    letter-spacing: 0.2px;
  }
  .all-news-card-info {
    margin-top: 11px;
  }
  .all-news-card-info span svg {
    width: 14px;
    height: 14px;
  }
}
</style>
