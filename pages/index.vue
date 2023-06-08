<template>
  <div class="home-page">
    <div class="container_xl">
      <div class="home-page-grid row">
        <div class="col-9 p-0 home-page-left">
          <div class="home-carousel">
            <div class="world">
              <div
                style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                class="swiper mySwiper2"
              >
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="item in topNews" :key="item.id">
                    <BannerCard :topNews="item" />
                  </div>
                </div>
              </div>
              <div thumbsSlider="" class="swiper mySwiper">
                <div class="swiper-wrapper flex-row">
                  <div
                    class="swiper-slide carousel-dot-items"
                    v-for="item in topNews"
                    :key="item.id"
                  >
                    <div>
                      {{ item?.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TitleComp :link="true" title="So’ngi yangiliklar" />
          <div class="h-news-grid">
            <HNewsCard v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
          </div>
          <div class="v-news-grid">
            <VNewsCard v-for="news in simpleNews" :key="news.id" :news="news" />
          </div>
          <TitleComp :link="true" title="Video galereya" />
          <div class="video-news-grid">
            <VideoNewsCard v-for="news in videoNews" :key="news?.id" :news="news" />
          </div>
          <TitleComp :link="true" title="Foto repartaj" />
          <div class="news-images-grid">
            <NewsImagesCard />
            <NewsImagesCard />
            <NewsImagesCard />
            <NewsImagesCard />
          </div>
        </div>
        <div class="home-page-right col-3 p-0">
          <div class="block1">
            <div class="home-page-right-title">Gazeta</div>
            <div
              class="home-page-right-drop"
              @click="dropAction(1)"
              :class="{ heightAuto: dropVal == 1 }"
            >
              <h5>
                Kutubxona
                <span v-html="dropdown" :class="{ rotate180: dropVal == 1 }"></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board">
                  <ul>
                    <li>Teatrlar</li>
                    <li>Kutubxona</li>
                    <li>Ko’rgazmalar</li>
                  </ul>
                </div>
              </Transition>
            </div>

            <div
              class="home-page-right-drop"
              @click="dropAction(2)"
              :class="{ heightAuto: dropVal == 2 }"
            >
              <h5>
                Ko'ngil-Ochar
                <span v-html="dropdown" :class="{ rotate180: dropVal == 2 }"></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board" v-if="dropVal == 2">
                  <ul>
                    <li>Teatrlar</li>
                    <li>Kutubxona</li>
                    <li>Ko’rgazmalar</li>
                  </ul>
                </div>
              </Transition>
            </div>
          </div>
          <div class="block2">
            <div class="home-page-right-title" style="text-align: center">
              biz haqimizda
            </div>
            <div class="right-banner">
              <img src="../assets/images/Снимок экрана (926).png" alt="" />
            </div>
          </div>
          <TitleComp :link="false" title="Muharrir Tanlovi" />
          <div class="mt-3 mb-5">
            <div class="flex items-center justify-center">
              <div class="swiper-banner-right" style="overflow: hidden; width: 337px">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="news in redactorNews" :key="news?.id">
                    <VNewsCard :news="news" />
                  </div>
                </div>
              </div>
              <div class="swiper-pagination-banner-right"></div>
            </div>
            <div></div>
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
          <div class="right-show-more">Barchashini ko’rish</div>
          <RightTelegramCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerCard from "../components/cards/BannerCard.vue";
import TitleComp from "../components/Title-comp.vue";
import HNewsCard from "../components/cards/HNewsCard.vue";
import VNewsCard from "../components/cards/VNewsCard.vue";
import VideoNewsCard from "../components/cards/VideoNewsCard.vue";
import NewsImagesCard from "../components/cards/NewsImagesCard.vue";
import RightNewsCard from "../components/cards/RightNewsCard.vue";
import RightTelegramCard from "../components/cards/RightTelegramCard.vue";
import Swiper from "swiper/swiper-bundle.js";
import "swiper/swiper-bundle.min.css";
const baseUrl =
  "https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/";
export default {
  name: "IndexPage",
  data() {
    return {
      baseUrl,
      dropVal: false,
      dropdown: require("../assets/svg/dropdown.svg?raw"),
    };
  },
  mounted() {
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 16,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
      },
      thumbs: {
        swiper: swiper,
      },
    });
    const swiperRight = new Swiper(".swiper-banner-right", {
      flipEffect: {
        slideShadows: false,
      },
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination-banner-right",
        type: "bullets",
        clickable: true,
      },
    });
  },
  async asyncData({ store }) {
    const [
      newsData,
      topNewsData,
      simpleNewsData,
      videoNewsData,
      redactorNewsData,
    ] = await Promise.all([
      store.dispatch("fetchNews/getNews", { last_news: true, page_size: 6 }),
      store.dispatch("fetchNews/getNews", { top: true, page_size: 6 }),
      store.dispatch("fetchNews/getNews", { page_size: 4 }),
      store.dispatch("fetchNews/getNews", { video: true, page_size: 4 }),
      store.dispatch("fetchNews/getNews", { redactor_choice: true, page_size: 3 }),
    ]);
    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    const videoNews = videoNewsData.results;
    const redactorNews = redactorNewsData.results;
    return {
      news,
      topNews,
      simpleNews,
      videoNews,
      redactorNews,
    };
  },
  methods: {
    dropAction(val) {
      if (val != this.dropVal) {
        this.dropVal = val;
      } else {
        this.dropVal = false;
      }
    },
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
  },
  components: {
    BannerCard,
    TitleComp,
    HNewsCard,
    VNewsCard,
    VideoNewsCard,
    NewsImagesCard,
    RightNewsCard,
    RightTelegramCard,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
.heightAuto {
  max-height: 500px !important;
  transition: max-height 0.4s ease-in !important;
}
.swiper-banner-right .swiper-slide {
  width: 100% !important;
}
.swiper-pagination-banner-right {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.bounceDrop-enter-active {
  animation: bounceDrop-in 0.3s;
}
.bounceDrop-leave-active {
  animation: bounceDrop-in 0.3s reverse;
}
@keyframes bounceDrop-in {
  0% {
    transform: translateY(-20%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
