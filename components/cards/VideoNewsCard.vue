<template lang="html">
  <div class="video-news-card">
    <div class="video-news-card-img">
      <!-- <iframe
        width="420"
        height="315"
        v-if="news?.video"
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
      <span v-if="news?.category?.title"> {{ news?.category?.title }} </span>
      <div
        class="video-banner"
        v-if="videoShow"
        @click="$router.push(localePath(`/news/${news?.slug}`))"
        :style="`background-image: url(${news?.youtube_image})`"
      >
        <div v-html="video"></div>
      </div>
    </div>
    <div class="video-news-card-body">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
      <div class="video-news-card-info">
        <span> <span v-html="comments"></span> {{ news?.comment_count }}</span>
        <span><span v-html="view"></span>{{ news?.views }}</span>
        <span class="video-news-card_web"
          ><span v-html="date"></span>{{ news?.date }}</span
        >
        <span class="video-news-card_mobile"
          ><span v-html="date"></span>{{ news?.date.split("|")[0] }}</span
        >
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
    },
    changeVideo(e) {
    },
  },
  mounted() {
    // console.log(this.$refs["lazyVideo"]);
  },
};
</script>
<style lang="css">
.video-banner {
  background-position: center;
  background-size: 100%;
}
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
  background-repeat: no-repeat;
  background-size: cover;
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
  top: 26px;
  z-index: 200;
}
.video-news-card_mobile {
  display: none;
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
  /* margin-right: 55px; */
}
.video-news-card-info > span span {
  margin-right: 7px;
}
.video-news-card-info {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 32px;
}
@media (max-width: 1024px) {
  .video-news-card-img {
    height: 307px;
    border-radius: 4px;
    overflow: hidden;
  }
  .video-news-card-info {
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  .video-news-card-img {
    height: 188px;
  }
  .video-news-card_mobile {
    display: flex;
  }
  .video-news-card_web {
    display: none;
  }
}

@media (max-width: 576px) {
  .video-news-card-img {
    height: 136px;
  }
}
@media (max-width: 488px) {
  .video-news-card-img {
    height: 183px;
  }
}
@media (max-width: 468px) {
  .video-news-card-img {
    height: 110px;
  }
}
</style>
