<template>
  <div class="home-page">
    <div class="container_xl">
      <div class="home-page-grid row mx-0">
        <div class="col-lg-9 col-xs-12 p-0 home-page-left">
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
              <div thumbsSlider="" class="swiper mySwiper thumbs">
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
          <TitleComp
            link="all-news"
            :title="$store.state.translations['main.latest_news']"
          />
          <div class="h-news-grid">
            <HNewsCard v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
          </div>
          <div class="v-news-grid">
            <VNewsCard v-for="news in simpleNews" :key="news.id" :news="news" />
          </div>
          <div class="hidden">
            <div class="block1">
              <div
                class="home-page-right-title"
                style="cursor: pointer"
                @click="$router.push('newspaper')"
              >
                {{ $store.state.translations["main.newspaper"] }}
              </div>
              <div
                class="home-page-right-drop"
                @click="dropAction(1)"
                :class="{ heightAuto: dropVal == 1 }"
              >
                <h5>
                  {{ $store.state.translations["main.library"] }}
                  <span v-html="dropdown" :class="{ rotate180: dropVal == 1 }"></span>
                </h5>
                <Transition name="bounceDrop">
                  <div class="home-page-right-drop-board" v-if="dropVal == 1">
                    <ul>
                      <li @click="$router.push('/library?type=literature')">Adabiyot</li>
                      <li @click="$router.push('/library?type=scientific')">
                        Ilmiy ishlar
                      </li>
                      <li @click="$router.push('/library?type=articles')">Maqolalar</li>
                      <li @click="$router.push('/library?type=articles')">
                        Kasaba faollari uchun qo’llanmalar
                      </li>
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
                  {{ $store.state.translations["main.entertainment"] }}
                  <span v-html="dropdown" :class="{ rotate180: dropVal == 2 }"></span>
                </h5>
                <Transition name="bounceDrop">
                  <div class="home-page-right-drop-board" v-if="dropVal == 2">
                    <ul>
                      <li @click="$router.push('/theater')">
                        {{ $store.state.translations["main.Ytheatres"] }}
                      </li>
                      <li @click="$router.push('/concert')">
                        {{ $store.state.translations["main.concert"] }}
                      </li>
                      <li @click="$router.push('/presentations')">
                        {{ $store.state.translations["main.presentations"] }}
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
            <div class="block2">
              <div class="home-page-right-title" style="text-align: center">
                {{ $store.state.translations["main.about_us"] }}
              </div>
              <div class="right-banner">
                <img src="../assets/images/Снимок экрана (926).png" alt="" />
              </div>
            </div>
            <TitleComp
              :link="false"
              :title="$store.state.translations['main.editor_choice']"
            />
            <div class="mt-3 mb-5">
              <div class="flex items-center justify-center">
                <div class="swiper-banner-right" style="overflow: hidden; width: 337px">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="news in redactorNews"
                      :key="news?.id"
                    >
                      <VNewsCard :news="news" />
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination-banner-right"></div>
              </div>
              <div></div>
            </div>
            <TitleComp
              :link="false"
              :title="$store.state.translations['main.active_topics']"
            />

            <div class="right-news-list">
              <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
            </div>
            <div class="btn_container_show_more">
              <div class="right-show-more">
                {{ $store.state.translations["main.see_all"] }}
              </div>
              <div class="right-show-more-primary">
                {{ $store.state.translations["main.see_all"] }}
              </div>
            </div>
          </div>
          <TitleComp
            link="all-news"
            :title="$store.state.translations['main.video_gallery']"
          />
          <div class="video-news-grid">
            <VideoNewsCard v-for="news in videoNews" :key="news?.id" :news="news" />
          </div>
          <TitleComp
            :link="true"
            :title="$store.state.translations['main.photo_repartee']"
          />
          <div class="news-images-grid">
            <NewsImagesCard />
            <NewsImagesCard />
            <NewsImagesCard />
            <NewsImagesCard />
          </div>
        </div>
        <div class="home-page-right col-3 p-0 clear">
          <div class="block1">
            <div
              class="home-page-right-title"
              style="cursor: pointer"
              @click="$router.push('newspaper')"
            >
              {{ $store.state.translations["main.newspaper"] }}
            </div>
            <div
              class="home-page-right-drop"
              @click="dropAction(1)"
              :class="{ heightAuto: dropVal == 1 }"
            >
              <h5>
                {{ $store.state.translations["main.library"] }}
                <span v-html="dropdown" :class="{ rotate180: dropVal == 1 }"></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board">
                  <ul>
                    <li @click="$router.push('/library?type=literature')">Adabiyot</li>
                    <li @click="$router.push('/library?type=scientific')">
                      Ilmiy ishlar
                    </li>
                    <li @click="$router.push('/library?type=articles')">Maqolalar</li>
                    <li @click="$router.push('/library?type=articles')">
                      Kasaba faollari uchun  qo’llanmalar
                    </li>
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
                {{ $store.state.translations["main.entertainment"] }}
                <span v-html="dropdown" :class="{ rotate180: dropVal == 2 }"></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board" v-if="dropVal == 2">
                  <ul>
                    <li @click="$router.push('/theater')">
                      {{ $store.state.translations["main.Ytheatres"] }}
                    </li>
                    <li @click="$router.push('/concert')">
                      {{ $store.state.translations["main.concert"] }}
                    </li>
                    <li @click="$router.push('/presentations')">
                      {{ $store.state.translations["main.presentations"] }}
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
          </div>
          <div class="block2">
            <div
              class="home-page-right-title"
              style="text-align: center; cursor: pointer"
              @click="$router.push('/about')"
            >
              {{ $store.state.translations["main.about_us"] }}
            </div>
            <div class="right-banner">
              <img :src="banners[0]?.image" alt="" />
            </div>
          </div>
          <TitleComp
            :link="false"
            :title="$store.state.translations['main.editor_choice']"
          />
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
          <TitleComp
            :link="false"
            :title="$store.state.translations['main.active_topics']"
          />

          <div class="right-news-list">
            <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
          </div>
          <div class="btn_container_show_more">
            <div class="right-show-more">
              {{ $store.state.translations["main.see_all"] }}
            </div>
            <div class="right-show-more-primary">
              {{ $store.state.translations["main.see_all"] }}
            </div>
          </div>

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
export default {
  name: "IndexPage",
  data() {
    return {
      dropVal: false,
      dropdown: require("../assets/svg/dropdown.svg?raw"),
    };
  },
  mounted() {
    document.cookie = "username=John Doe";
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 16,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      effect: "fade",
      autoplay: {
        delay: 6000,
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
  async asyncData({ store, i18n }) {
    const [
      newsData,
      topNewsData,
      simpleNewsData,
      videoNewsData,
      redactorNewsData,
      importantNewsData,
      bannersData,
    ] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { last_news: true, page_size: 6 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { top: true, page_size: 6 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { page_size: 4 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { video: true, page_size: 4 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { redactor_choice: true, page_size: 3 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { important: true, page_size: 6 },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    const videoNews = videoNewsData.results;
    const redactorNews = redactorNewsData.results;
    const importantNews = importantNewsData.results;
    const banners = bannersData.results;
    return {
      news,
      topNews,
      simpleNews,
      videoNews,
      redactorNews,
      importantNews,
      banners,
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
.hidden {
  display: none;
}
@media screen and (max-width: 1024px) {
  .hidden {
    display: block;
  }
  .clear {
    display: none;
  }
  .thumbs {
    display: none;
  }

  .home-carousel {
    margin-bottom: 64px;
  }
  .h-news-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
    gap: 0;
  }
  .home-page-left {
    padding: 0 !important;
  }
  .row {
    margin: 0 !important;
  }
  .title-comp h2 {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .title-comp h2 span {
    margin: 0;
  }
  .title-comp a {
    font-size: 14px;
  }
  .title-comp {
    justify-content: space-between;
  }
  .h-news-card-img {
    min-width: 94px;
    height: 64px;
    border-radius: 4px;
    overflow: hidden;
  }

  .h-news-card-body a {
    font-size: 14px;
    margin-bottom: 12px;
  }
  .h-news-card-info > span {
    font-size: 10px;
    display: flex;
  }
  .h-news-card-info {
    justify-content: flex-end;
    gap: 12px;
  }

  .v-news-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .v-news-card-img {
    width: 100%;
    height: 172px;
    border-radius: 4px;
    overflow: hidden;
  }
  .v-news-card-body a {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-news-card-info > span {
    font-size: 10px;
    padding: 0;
    margin: 0;
  }
  .v-news-card-info {
    align-items: center;
    gap: 12px;
  }
  .home-page-right-title {
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
  }
  .home-page-right-drop {
    padding: 12px 16px;
  }
  .home-page-right-drop h5 {
    font-size: 14px;
    padding: 0;
    text-transform: uppercase;
  }
  .block1 {
    margin-bottom: 16px;
  }
  .right-banner {
    height: 480px;
  }
  .swiper-banner-right {
    width: 100% !important;
  }
  .right-news-list {
    margin: 24px 0;
  }
  .right-news-text::after {
    background: #0192ff;
  }
  .right-news-text a {
    font-size: 14px;
  }
  .hidden {
    margin-bottom: 34px;
  }
  .video-news-grid,
  .news-images-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
  .video-news-card {
    padding: 12px 10px;
    gap: 12px;
    border-radius: 6px;
    border: none;
  }
  .video-news-card-img {
    height: 180px;
    border-radius: 4px;
    overflow: hidden;
  }
  .video-news-card-body a {
    font-size: 14px;
  }
  .video-news-card-info > span,
  .news-images-card-info > span {
    margin: 0;
  }
  .video-news-card-info,
  .news-images-card-info {
    justify-content: flex-end;
    gap: 12px;
  }
  .news-images-card-body {
    margin-top: 12px;
  }
  .news-images-card-body p {
    font-size: 14px;
  }
  .home-page {
    padding-bottom: 80px;
  }
  .footer-logo {
    display: flex;
    justify-content: center;
  }
  .footer-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
    text-align: center;
  }
  .footer-info h6 {
    font-size: 12px;
  }
  .footer-info p {
    font-size: 12;
    padding-top: 0;
  }
  .footer-menu {
    width: 100%;
    row-gap: 16px;
    column-gap: 32px;
  }
  .footer-menu ul li a,
  .footer-menu ul li {
    font-size: 14px;
    text-align: center;
  }
  .footer-messangers {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 32px 0;
    padding: 0;
  }
  .footer-messangers a {
    margin: 0;
  }
  .footer-messangers svg {
    width: 24px;
    height: 24px;
  }
  .footer-bottom {
    color: #888;
    text-align: center;
    font-size: 12px;
    line-height: 130%;
  }
  .home-carousel {
    padding-top: 140px;
  }
}
</style>
