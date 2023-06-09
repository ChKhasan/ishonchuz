<template lang="html">
  <div class="right-news-card">
    <div class="right-news-text">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
    </div>
    <div class="right-news-footer">
      <span> <span v-html="comments"></span> {{ news?.comment_count }}</span>
      <span><span v-html="view"></span> {{ news?.views }}</span>
      <span><span v-html="date"></span> {{ news?.date }}</span>
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
.right-news-card {
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.right-news-text {
  padding-left: 17px;
  position: relative;
  cursor: pointer;
}
.right-news-text::after {
  position: absolute;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0192ff;
  top: 8px;
  left: 0;
}
.right-news-text a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.right-news-text a:hover {
  color: #0192ff;
}
.right-news-footer {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
}
.right-news-footer > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: #888888;
  margin-left: 17px;
}
.right-news-footer span span {
  margin-right: 5px;
}
</style>
