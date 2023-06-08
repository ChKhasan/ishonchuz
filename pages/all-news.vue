<template>
  <div class="home-page all-news-page">
    <div class="container_xl">
      <div class="home-page-grid">
        <div>
          <div class="all-news-page-container">
            <h3>
              “Toshkent” jumlasi bo’yicha qidiruv natijasi - <span>2323</span> ta maqola
              topildi
            </h3>
            <div class="all-news-page-grid">
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
              <HNewsCard />
            </div>
          </div>
        </div>
        <div class="home-page-right">
          <div class="block2">
            <div class="right-banner">
              <img src="../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <TitleComp :link="false" />

          <div class="right-news-list">
            <RightNewsCard />
            <RightNewsCard />
            <RightNewsCard />
            <RightNewsCard />
            <RightNewsCard />
            <RightNewsCard />
            <RightNewsCard />
          </div>
          <div class="right-banner">
            <img src="../assets/images/Снимок экрана (926).png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComp from "../components/Title-comp.vue";
import HNewsCard from "../components/cards/HNewsCard.vue";
import RightNewsCard from "../components/cards/RightNewsCard.vue";

export default {
  components: {
    TitleComp,
    HNewsCard,
    RightNewsCard,
    TitleComp,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
.all-news-page {
  padding-top: 28px;
}
.all-news-page-container h3 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: var(--text_color);
  margin-bottom: 30px;
}
.all-news-page-container h3 span {
  color: #0192ff;
}
.all-news-page-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
}
</style>
