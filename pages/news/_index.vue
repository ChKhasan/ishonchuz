<template>
  <div class="home-page news-page">
    <div class="container_xl">
      <div class="home-page-grid row">
        <div class="col-9 p-0 home-page-left">
          <div class="new-category-title"><h2>Iqtisod</h2></div>
          <div class="news-breadcrumb" v-if="news?.category">
            <nuxt-link to="/">Home <span v-html="dropdown"></span></nuxt-link>
            <nuxt-link :to="`/news-menu/${news?.category?.slug}`"
              >{{ news?.category?.title }} <span v-html="dropdown"></span
            ></nuxt-link>
            <nuxt-link to="/" style="pointer-events: none"
              >{{ news?.title }} <span v-html="dropdown"></span
            ></nuxt-link>
          </div>
          <div class="news-container">
            <div class="news-container-tag">
              <span class="tag">Tahlil</span>
            </div>
            <div class="news-container-head">
              <div class="news-container-character">
                <span><span v-html="view"></span>{{ news?.views }}</span>
                <span><span v-html="date"></span>{{ news?.date }}</span>
              </div>
              <div class="news-container-messangers">
                <a href="#"><span v-html="telegram"></span></a>
                <a href="#"><span v-html="facebook"></span></a>
                <a href="#"><span v-html="twitter"></span></a>
                <a href="#"><span v-html="instagram"></span></a>
                <a href="#"><span v-html="whatsapp"></span></a>
              </div>
            </div>
            <div class="news-container-header">
              <h1>{{ news?.title }}</h1>
              <h6>
                {{ news?.subtitle }}
              </h6>
            </div>
            <!-- <div class="news-container-banner">
              <div>
                <img :src="news?.image" v-if="news?.image" alt="" />
                <img v-else src="../../assets/images/Frame 92654103.png" alt="" />
              </div>
              <span>Foto: Ishonch.uz</span>
            </div> -->
            <div class="news-container-body" v-html="news?.text">
              <!-- <p class="news-container-text" v-html="news?.text"></p> -->
              <!-- <div class="article-card">
                <div class="article-card-text">
                  <p>
                    O‘zbekiston kasaba uyushmalari Federatsiyasining viloyat kengashi
                    tomonidan Sojida Jo‘rayevani o‘z lavozimiga tiklash haqida kiritilgan
                    taqdimnoma eʼtiborsiz qoldirilgach, fuqarolik ishlari bo‘yicha Jizzax
                    tumanlararo sudiga daʼvo arizasi yo‘llandi. Lekin 2022 yilning 30
                    avgustida sudning hal qiluv qaroriga ko‘ra, daʼvo qanoatlantirilmadi.
                  </p>
                </div>
                <h6>O‘zbekiston Respublikasi Konstitutsiyasi 124-modda</h6>
              </div>
              <h1>Viloyat kengashi</h1>
              <div class="news-container-desc">
                <p class="news-container-text">
                  Viloyat kengashining mehnat huquq inspektori bilan hamkorlikda ariza
                  o‘rganildi. Aniqlanishicha, S.Jo‘rayeva Jizzax viloyati xalq taʼlimi
                  boshqarmasining 2017 yil 18 dekabrdagi buyrug‘iga ko‘ra, Jizzax
                  shahridagi 16-maktab direktori vazifasiga ishga qabul qilingan. 2022 yil
                  30 iyundagi buyruqqa asosan u bilan tuzilgan mehnat shartnomasi bekor
                  qilingan. Buyruq Xalq deputatlari Jizzax shahar kengashining qarori,
                  ichki tartib-qoidalardan kelib chiqqan holda <span>chiqarilgan</span>.
                </p>
                <div>...</div>
                <p class="news-container-text">
                  Viloyat kengashining mehnat huquq inspektori bilan hamkorlikda ariza
                  o‘rganildi. Aniqlanishicha, S.Jo‘rayeva Jizzax viloyati xalq taʼlimi
                  boshqarmasining 2017 yil 18 dekabrdagi buyrug‘iga ko‘ra, Jizzax
                  shahridagi 16-maktab direktori vazifasiga ishga qabul qilingan. 2022 yil
                  30 iyundagi buyruqqa asosan u bilan tuzilgan mehnat shartnomasi bekor
                  qilingan. Buyruq Xalq deputatlari Jizzax shahar kengashining qarori,
                  ichki tartib-qoidalardan kelib chiqqan holda <span>chiqarilgan</span>.
                </p>
              </div>
              <div class="decree-card">
                <div>
                  <p>
                    O‘zbekiston kasaba uyushmalari Federatsiyasining viloyat kengashi
                    tomonidan Sojida Jo‘rayevani o‘z lavozimiga tiklash haqida kiritilgan
                    taqdimnoma eʼtiborsiz qoldirilgach, fuqarolik ishlari bo‘yicha Jizzax
                    tumanlararo sudiga daʼvo arizasi yo‘llandi.
                  </p>
                </div>
                <h6>
                  <span>O‘zbekiston Respublikasi Prezindenti </span>Shavkat Mirziyoyev
                </h6>
              </div> -->
            </div>
            <div class="news-container-links">
              <a href="#">#Xotinqizlar</a>
              <a href="#">#bolalar</a>
              <a href="#">#openbudget</a>
            </div>
          </div>
        </div>
        <div class="home-page-right col-3 p-0">
          <div class="block2">
            <div class="right-banner">
              <img src="../../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <TitleComp :link="false" title="Dolzarb mavzular" />
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
            <img src="../../assets/images/Снимок экрана (926).png" alt="" />
          </div>
        </div>
      </div>
      <div class="comment-container-grid">
        <div>
          <div class="comment-form">
            <h5>Izoh qoldiring</h5>
            <div><input type="text" placeholder="Ism*" /><a-rate v-model="value" /></div>
            <textarea
              rows="5"
              placeholder="Qoldirilgan izohlar, admin tomonidan ahloqiy, manaviy jihattan tekshirilgandan so’ng izohlarda ko’rinadi.*"
            ></textarea>
            <div class="send-btn">Izoh qoldiring</div>
          </div>
          <div class="comments-list">
            <h4>Qoldirilgan izohlar (11)</h4>
            <div class="comments-grid">
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <div class="show-more-count">Yana ko’rish (8)</div>
          </div>
          <TitleComp :link="false" title="Mavzuga oid" />
          <div class="v-news-grid">
            <VNewsCard v-for="news in topicNews" :key="news?.id" :news="news" />
          </div>
        </div>
        <div>
          <div class="general-assessment">
            <h5>Izoh qoldiring</h5>
            <div class="main-rate"><a-rate v-model="value" /><span>4/5</span></div>
            <div class="item-rate">
              <a-rate v-model="value" /><span><p>3</p></span>
            </div>
            <div class="item-rate">
              <a-rate v-model="value" /><span><p>3</p></span>
            </div>
            <div class="item-rate">
              <a-rate v-model="value" /><span><p>3</p></span>
            </div>
            <div class="item-rate">
              <a-rate v-model="value" /><span><p>3</p></span>
            </div>
            <div class="item-rate">
              <a-rate v-model="value" /><span><p>3</p></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComp from "../../components/Title-comp.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
import RightNewsCard from "../../components/cards/RightNewsCard.vue";
import CommentCard from "../../components/cards/CommentCard.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      view: require("../../assets/svg/view.svg?raw"),
      date: require("../../assets/svg/date.svg?raw"),
      value: 0,
    };
  },
  async asyncData({ store, params }) {
    const [newsData, topicNewsData] = await Promise.all([
      store.dispatch("fetchNews/getNewsBySlug", params.index),
      store.dispatch("fetchNews/getNews", { video: true, page_size: 3 }),
    ]);
    const news = newsData;
    const topicNews = topicNewsData.results;
    return {
      news,
      topicNews,
    };
  },

  components: {
    TitleComp,
    VNewsCard,
    RightNewsCard,
    CommentCard,
    TitleComp,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
.news-page {
  padding-top: 28px;
}
.new-category-title h2 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: #000000;
}
.news-container {
  padding: 60px 70px;
  background: #f9f9f9;
  border-radius: 8px;
  padding-bottom: 90px;
}
.news-container .tag {
  background: #eeeeee;
  padding: 7px 12px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #111111;
}
.news-container-tag {
  padding-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
}
.news-container-character > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #888888;
  margin-right: 32px;
}
.news-container-head {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.news-container-character > span > span {
  margin-right: 7px;
}
.news-container-messangers span svg {
  height: 16px;
}
.news-container-messangers span {
  margin-right: 32px;
}
.news-container-header {
  margin-top: 50px;
}
.news-container-header h1 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: #000000;
}
.news-container-header h6 {
  font-family: var(--ROBOTO_SERIF);
  margin-top: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 150%;
  color: #111111;
}
.news-container-banner {
  margin-top: 40px;
}
.news-container-banner div {
  height: 484px;
  border-radius: 4px;
}
.news-container-banner div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news-container-banner span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #707070;
  display: flex;
  margin-top: 12px;
}
.news-container-text,
.news-container-text p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 170%;
  color: #292929;
  /* margin-bottom: 40px; */
}
.news-container-text span {
  color: #0192ff;
}
.news-container-body {
  margin-top: 40px;
  padding-bottom: 160px;
  border-bottom: 1px solid #e7e7e7;
}
.news-container-body img {
  width: 100%;
}
.news-container-body h1 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 150%;
  color: #000000;
  margin-bottom: 20px;
}
.article-card {
  padding-left: 52px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 40px;
}
.article-card h6 {
  font-family: var(--ROBOTO_SERIF);
  font-style: italic;
  font-weight: 500;
  font-size: 19px;
  line-height: 170%;
  text-align: right;
  color: #051769;
}
.article-card-text p {
  font-family: var(--ROBOTO_SERIF);
  font-style: italic;
  font-weight: 400;
  font-size: 19px;
  line-height: 170%;
  color: #1e2e78;
}
.article-card-text {
  padding-left: 44px;
  border-left: 1px solid #b8b8b8;
  padding-top: 24px;
  padding-bottom: 24px;
}
.news-container-desc p {
  margin-bottom: 20px;
}
.news-container-desc div {
  display: flex;
  justify-content: center;
}
.news-container-desc div {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  font-feature-settings: "pnum" on, "lnum" on, "kern" off;
  color: #99d3ff;
  margin-bottom: 20px;
  cursor: pointer;
}
.decree-card {
  background: #ffffff;
  padding: 26px 37px 24px 50px;
  margin-left: 31px;
  margin-right: 31px;
  margin-top: 10px;
}
.decree-card div p {
  font-family: var(--ROBOTO_SERIF);
  font-style: italic;
  font-weight: 400;
  font-size: 19px;
  line-height: 170%;
  color: #051769;
}
.decree-card h6 {
  margin-top: 13px;
  font-family: var(--ROBOTO_SERIF);
  font-style: italic;
  font-weight: 500;
  font-size: 19px;
  line-height: 170%;
  text-align: right;
  color: #051769;
  display: flex;
  flex-direction: column;
}
.decree-card h6 span {
  font-family: var(--ROBOTO_SERIF);
  font-style: italic;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  text-align: right;
  color: #505d96;
}
.news-container-links {
  margin-top: 16px;
  display: flex;
}
.news-container-links a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: #707070;
  margin-right: 16px;
}
.comment-container-grid {
  display: grid;
  grid-template-columns: 10.7fr 3.37fr;
  grid-gap: 30px;
  margin-top: 70px;
}
.comment-form {
  padding: 40px 50px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 68px;
}
.comment-form h5,
.general-assessment h5 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 170%;
  color: #000000;
  margin-bottom: 20px;
}
.comment-form input {
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: #000;
  width: 288px;
  margin-right: 20px;
  padding: 11px 20px;
}
.comment-form input::placeholder {
  color: #888888;
}
.comment-form textarea {
  padding: 9px 20px;
  margin-top: 14px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  width: 100%;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: #000;
}
.comment-form textarea::placeholder {
  color: #888888;
}
.send-btn {
  display: inline-flex;
  padding: 10px 87px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  background: #0192ff;
  border-radius: 4px;
  margin-top: 40px;
}
.general-assessment {
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
}
.main-rate svg {
  width: 28px;
  height: 26px;
}
.main-rate span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: right;
  color: #414141;
}
.main-rate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.main-rate .ant-rate-star:not(:last-child) {
  margin-right: 4px !important;
}
.item-rate .ant-rate-star:not(:last-child) {
  margin-right: 4px !important;
}
.item-rate {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
  align-items: center;
}
.item-rate:last-child {
  margin-bottom: 0;
}
.item-rate svg {
  width: 20px;
  height: 19px;
}
.item-rate span {
  padding-left: 10px;
  position: relative;
  z-index: 15;
  background: #f9f9f9;
}
.item-rate .ant-rate {
  padding-right: 10px;
  position: relative;
  z-index: 15;
  background: #f9f9f9;
}
.item-rate::after {
  content: "";
  position: absolute;
  background: #e7e7e7;
  border-radius: 2px;
  height: 3px;
  width: 100%;
}
.comments-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  margin-bottom: 40px;
}
.comments-list {
  margin-bottom: 86px;
}
.comments-list h4 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 170%;
  color: #000000;
  margin-bottom: 28px;
}
</style>
