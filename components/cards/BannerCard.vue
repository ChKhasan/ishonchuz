<template lang="html">
  <nuxt-link :to="`/news/${topNews?.slug}`">
    <div class="banner-card">
      <div class="banner-card-img">
        <img v-if="topNews?.image" :src="topNews.image" alt="" />
        <img v-else src="../../assets/images/Снимок экрана (925).png" alt="" />
        <span>Jamiyat</span>
      </div>
      <div class="banner-card-body">
        <div class="banner-card_text">
          <nuxt-link :to="`/news/${topNews?.slug}`">{{ topNews?.title }}</nuxt-link>
          <p>
            {{ topNews?.subtitle }}
          </p>
        </div>
        <div class="banner-card-body_footer">
          <span> <span v-html="comments"></span> {{ topNews?.comments }} </span>
          <span><span v-html="view"></span> {{ topNews?.views }} </span>
          <span> <span v-html="date"></span>{{ topNews?.date }}</span>
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
    };
  },
};
</script>
<style lang="css">
.banner-card {
  padding: 12px;
  display: grid;
  grid-template-columns: 5.7fr 4.65fr;
  grid-gap: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}
.banner-card-img {
  height: 423px;
  background: gray;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.banner-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  color: #111111;
  position: absolute;
  left: 0;
  bottom: 12px;
  background: #eeeeee;
}
.banner-card_text a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: #000000;
  overflow: hidden;
  -webkit-line-clamp: 3;
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
  color: #000000;
  overflow: hidden;
  -webkit-line-clamp: 5;
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
</style>
