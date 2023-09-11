<template lang="html">
  <nuxt-link :to="localePath(`/news/${topNews?.slug}`)">
    <div class="banner-card">
      <div class="banner-card-img">
        <LazyYoutube v-if="topNews?.video" ref="lazyVideo" :src="topNews?.video" />
        <div
          class="video-banner"
          v-if="topNews?.video"
          @click="$router.push(localePath(`/news/${topNews?.slug}`))"
          :style="`background-image: url(${topNews?.youtube_image})`"
        >
          <div v-html="video"></div>
        </div>
        <!-- <iframe
          v-if="topNews?.video"
          class="responsive-iframe"
          :src="topNews?.video"
        ></iframe> -->
        <img v-else :src="topNews.image" alt="" />
        <img
          v-if="!topNews?.video && !topNews?.image"
          src="../../assets/images/Снимок экрана (925).png"
          alt=""
        />
        <span>{{ topNews?.category?.title }}</span>
      </div>
      <div class="banner-card-body">
        <div class="banner-card_text">
          <nuxt-link :to="localePath(`/news/${topNews?.slug}`)">{{
            topNews?.title
          }}</nuxt-link>
          <p>
            {{ topNews?.subtitle }}
          </p>
        </div>
        <div class="banner-card-body_footer">
          <span> <span v-html="comments"></span> {{ topNews?.comment_count }} </span>
          <span><span v-html="view"></span> {{ topNews?.views }} </span>
          <span class="full_date"> <span v-html="date"></span>{{ topNews?.date }}</span>
          <span class="only_hours">
            <span v-html="date"></span>{{ topNews?.date.split("|")[0] }}</span
          >
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: ["topNews"],
  data() {
    return {
      comments: require("../../assets/svg/comments.svg?raw"),
      view: require("../../assets/svg/view.svg?raw"),
      date: require("../../assets/svg/date.svg?raw"),
      video: require("../../assets/svg/video.svg?raw"),
    };
  },
  mounted() {
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
.banner-card {
  padding: 12px;
  display: grid;
  grid-template-columns: 5.7fr 4.65fr;
  grid-gap: 12px;
  background: var(--card_bg);
  border-radius: 4px;
}
.banner-card-img {
  height: 423px;
  background: gray;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
}
.banner-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.only_hours {
  display: none;
}
.banner-card-body {
  padding: 13px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.banner-card-img span {
  padding: 7px 12px;
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
  bottom: 12px;
  background: var(--card_badges_bg);
  z-index: 100;
}
.banner-card_text a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: var(--text_color);
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.banner-card_text a:hover {
  color: #0192ff;
}
.banner-card_text p {
  font-family: var(--ROBOTO_SERIF);
  margin-top: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text_color);
  overflow: hidden;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.banner-card-body_footer {
  display: flex;
  justify-content: flex-end;
}
.banner-card-body_footer > span {
  margin-left: 17px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.02em;
  color: #888888;
}
.banner-card-body_footer > span > span {
  margin-right: 7px;
}
@media (max-width: 1024px) {
  /* .banner-card {
    display: flex;
    flex-direction: column;
  } */
  .banner-card {
    padding: 12px;
    display: grid;
    grid-template-columns: 362px 1fr;
    grid-gap: 38px;
  }
  .banner-card_text a {
    font-size: 14px;
    margin-bottom: 24px;
    display: flex;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .banner-card-img {
    height: 268px;
  }
  /* .banner-card_text p {
    display: none;
  } */

  .banner-card_text a {
    font-size: 22px;
    margin-bottom: 6px;
    display: flex;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* .banner-card_text p {
    display: none;
  } */
  /* .banner-card-body {
    padding: 0;
  } */
  /* .banner-card-body_footer > span {
    margin: 0;
  } */
  .banner-card-body_footer {
    gap: 12px;
  }
  .banner-card-body {
    padding: 0;
  }
  .banner-card-body_footer > span {
    margin: 0;
  }
  .banner-card-body_footer {
    gap: 12px;
  }
}
@media (max-width: 768px) {
  .banner-card {
    padding: 12px;
    display: grid;
    grid-template-columns: 290px 1fr;
    grid-gap: 38px;
  }
  .full_date {
    display: none;
  }
  .thumbs {
    display: none;
  }
  .only_hours {
    display: block;
  }
  .banner-card-img {
    height: 214px;
  }
  .banner-card_text a {
    font-size: 19px;
    line-height: 170%;
  }
  .banner-card_text p {
    display: none;
  }
}
@media (max-width: 576px) {
  .banner-card-img {
    height: 380px;
  }
  .banner-card {
    grid-gap: 24px;
    display: flex;
    flex-direction: column;
  }
}
@media (max-width: 390px) {
  .banner-card-img {
    height: 172px;
  }
  .banner-card {
    grid-gap: 14px;
  }
  .banner-card_text a {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
  }
  .banner-card-img span {
    font-size: 10px;
  }
  .banner-card-body_footer > span {
    font-size: 10px;
  }
}
</style>
