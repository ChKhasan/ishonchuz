<template lang="html">
  <div class="v-news-card">
    <div class="v-news-card-img">
      <!-- <iframe
        width="420"
        height="315"
        ref="youtubeVid"
        v-if="news?.video"
        :src="news?.video"
        frameborder="0"
        allowfullscreen
      >
      </iframe> -->
      <LazyYoutube v-if="news?.video" ref="lazyVideo" :src="news?.video" />
      <div
        class="video-banner"
        v-if="videoShow && news?.video"
        @click="$router.push(localePath(`/news/${news?.slug}`))"
        :style="`background-image: url(${news?.youtube_image})`"
      >
        <div v-html="video"></div>
      </div>
      <img v-else :src="news?.image" alt="" />
      <img
        v-if="!news?.video && !news?.image"
        src="../../assets/images/Снимок экрана (925).png"
        alt=""
      />
      <span> {{ news?.category?.title }} </span>
    </div>
    <div class="v-news-card-body">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
      <div class="v-news-card-info">
        <span> <span v-html="comments"></span>{{ news?.comment_count }}</span>
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
      videoShow: true,
      comments: require("../../assets/svg/comments.svg?raw"),
      view: require("../../assets/svg/view.svg?raw"),
      date: require("../../assets/svg/date.svg?raw"),
      video: require("../../assets/svg/video.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.video-banner {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
}
.video-banner div {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.53);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.v-news-card {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  background: var(--card_bg);
  border-radius: 4px;
  cursor: pointer;
}
.v-news-card:hover .v-news-card-img img {
  transform: scale(1.1);
}
.v-news-card-img {
  height: 188px;
  border-radius: 2px;
  background-color: gray;
  position: relative;
  overflow: hidden;
}
.v-news-card-img iframe {
  width: 100%;
  height: 100%;
}
.v-news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}
.v-news-card-img span {
  padding: 7px 12px;
  background: var(--card_badges_bg);
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--card_badges_color);
  position: absolute;
  left: 0;
  bottom: 10px;
  z-index: 100;
}
.v-news-card-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.v-news-card-body a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text_color);
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.v-news-card-body a:hover {
  color: #0192ff;
}
.v-news-card-info > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
  margin-left: 17px;
}
.v-news-card-info > span span {
  margin-right: 7px;
}
.v-news-card-info {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}
@media (max-width: 1024px) {
  .v-news-card-body a {
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-news-card {
    padding: 8px;
  }
  .v-news-card-info {
    margin-top: 15px;
  }
}
</style>
