<template lang="html">
  <div class="video-news-card">
    <div class="video-news-card-img">
      <!-- <iframe
        width="420"
        height="315"
        ref="youtubeVid"
        :src="news?.video"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe> -->
      <LazyYoutube
        v-if="news?.video"
        @change="changeVideo"
        ref="lazyVideo"
        :src="news?.video"
      />
      <img v-else src="../../assets/images/Снимок экрана (925).png" alt="" />
      <span> {{ $store.state.translations["main.analysis"] }} </span>
      <div v-if="videoShow">
        <div @click="handleClick('playVideo')" v-html="video"></div>
      </div>
    </div>
    <div class="video-news-card-body">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
      <div class="video-news-card-info">
        <span> <span v-html="comments"></span> {{ news?.comment_count }}</span>
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
  methods: {
    handleClick(event) {
      this.$refs["lazyVideo"][event]();
      this.videoShow = false;
      console.log(this.$refs["lazyVideo"]);
    },
    changeVideo(e) {
      console.log(e);
    },
  },
  mounted() {
    console.log(this.$refs["lazyVideo"]);
  },
};
</script>
<style lang="css">
.video-news-card {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  border-bottom: 1px solid var(--right_drop_border);
}
.video-news-card-img {
  height: 307px;
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-news-card-img iframe {
  width: 100% !important;
}
.video-news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-news-card-img > div {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  height: 100%;
}
.video-news-card-img > div div {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.53);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.video-news-card-img span {
  padding: 7px 12px;
  background: #eeeeee;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #111111;
  position: absolute;
  left: 0;
  bottom: 26px;
}
.video-news-card-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.video-news-card-body a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text_color);
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.video-news-card-body a:hover {
  color: #0192ff;
}
.video-news-card-info > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
  margin-right: 55px;
}
.video-news-card-info > span span {
  margin-right: 7px;
}
.video-news-card-info {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
