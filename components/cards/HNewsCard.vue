<template lang="html">
  <div class="h-news-card">
    <nuxt-link :to="localePath(`/news/${news?.slug}`)">
      <div class="h-news-card-img">
        <LazyYoutube v-if="news?.video" ref="lazyVideo" :src="news?.video" />
        <img v-else :src="news?.image" alt="" />
        <img
          v-if="!news?.video && !news?.image"
          src="../../assets/images/Снимок экрана (925).png"
          alt=""
        />
      </div>
    </nuxt-link>
    <div class="h-news-card-body">
      <nuxt-link :to="localePath(`/news/${news?.slug}`)">
        {{ news?.title }}
      </nuxt-link>
      <div class="h-news-card-info">
        <span> <span v-html="comments"></span>{{ news?.comment_count }}</span>
        <span><span v-html="view"></span>{{ news?.views }}</span>
        <span><span v-html="date"></span>{{ news?.date.split("|")[1] }}</span>
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
  grid-template-columns: 169px auto;
  grid-gap: 16px;
  border-bottom: 1px solid var(--right_drop_border);
}

.h-news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.h-news-card-img {
  height: 107px;
  border-radius: 2px;
  /* background-color: gray; */
  overflow: hidden;
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
  color: var(--text_color);
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
@media (max-width: 1024px) {
  .h-news-card-body a {
    font-size: 16px;
    margin-bottom: 12px;
  }
  .h-news-card {
    grid-template-columns: 162px auto;
  }
}
@media (max-width: 768px) {
  .h-news-card {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .h-news-card-body a {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 145%;
  }
  .h-news-card {
    grid-template-columns: 100px auto;
  }
  .h-news-card-img {
    height: 66px;
  }
  .h-news-card-info > span {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0.24px;
  }
  .h-news-card-info {
    justify-content: flex-end;
  }
}
@media (max-width: 576px) {
  .h-news-card {
    grid-template-columns: 141px auto;
  }
  .h-news-card-img {
    height: 93px;
  }
}
@media (max-width: 390px) {
  .h-news-card {
    grid-template-columns: 96px auto;
  }
  .h-news-card-img {
    height: 63px;
  }
  .h-news-card-info > span {
    font-size: 10px;
  }
}
</style>
