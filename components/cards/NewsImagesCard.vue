<template lang="html">
  <div class="news-images-card">
    <nuxt-link :to="localePath('/')">
      <div class="news-images-card-img">
        <div><img src="../../assets/images/Снимок экрана (925).png" alt="" /></div>
        <div>
          <div><img src="../../assets/images/Снимок экрана (925).png" alt="" /></div>
          <div><img src="../../assets/images/Снимок экрана (925).png" alt="" /></div>
        </div>
      </div>
      <div class="news-images-card-body">
        <p>
          Si Szinpinning aytishicha, Rossiyaning yadro qurolidan foydalanishini bo‘lmaydi…
        </p>
        <div class="news-images-card-info">
          <span> <span v-html="comments"></span> 0</span>
          <span><span v-html="view"></span>1232</span>
          <span><span v-html="date"></span>12:32 | 23.12.2023</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
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
.news-images-card {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  background: var(--card_bg);
  border-radius: 4px;
}
.news-images-card-img {
  border-radius: 2px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 8px;
  position: relative;
}
.news-images-card-img div {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  overflow: hidden;
}
.news-images-card-img img,
.news-images-card-img div img,
.news-images-card-img div div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news-images-card-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 16px;
}
.news-images-card-body p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text_color);
}
.news-images-card-info > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
  margin-right: 40px;
}
.news-images-card-info span span {
  margin-right: 7px;
}
.news-images-card-info {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
