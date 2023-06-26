<template>
  <div class="home-page">
    <div class="container_xl">
      <div class="home-page-grid row">
        <div class="col-9 p-0 home-page-left">
          <div class="home-carousel">
            <div class="world">
              <div
                style="
                  --swiper-navigation-color: #fff;
                  --swiper-pagination-color: #fff;
                "
                class="swiper mySwiper2"
              >
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="item in topNews"
                    :key="item.id"
                  >
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
            :link="true"
            :title="$store.state.translations['main.latest_news']"
          />
          <div class="h-news-grid">
            <HNewsCard
              v-for="newsItem in news"
              :key="newsItem.id"
              :news="newsItem"
            />
          </div>
          <div class="v-news-grid">
            <VNewsCard v-for="news in simpleNews" :key="news.id" :news="news" />
          </div>
          <div class="hidden">
            <div class="block1">
              <div class="home-page-right-title">
                {{ $store.state.translations["main.newspaper"] }}
              </div>
              <div
                class="home-page-right-drop"
                @click="dropAction(1)"
                :class="{ heightAuto: dropVal == 1 }"
              >
                <h5>
                  {{ $store.state.translations["main.library"] }}
                  <span
                    v-html="dropdown"
                    :class="{ rotate180: dropVal == 1 }"
                  ></span>
                </h5>
                <Transition name="bounceDrop">
                  <div class="home-page-right-drop-board">
                    <ul>
                      <li>{{ $store.state.translations["main.theatres"] }}</li>
                      <li>{{ $store.state.translations["main.libraries"] }}</li>
                      <li>
                        {{ $store.state.translations["main.presentations"] }}
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
                  <span
                    v-html="dropdown"
                    :class="{ rotate180: dropVal == 2 }"
                  ></span>
                </h5>
                <Transition name="bounceDrop">
                  <div class="home-page-right-drop-board" v-if="dropVal == 2">
                    <ul>
                      <li>{{ $store.state.translations["main.theatres"] }}</li>
                      <li>{{ $store.state.translations["main.libraries"] }}</li>
                      <li>
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
                <div
                  class="swiper-banner-right"
                  style="overflow: hidden; width: 337px"
                >
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
              <RightNewsCard
                v-for="news in importantNews"
                :key="news?.id"
                :news="news"
              />
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
            :link="true"
            :title="$store.state.translations['main.video_gallery']"
          />
          <div class="video-news-grid">
            <VideoNewsCard
              v-for="news in videoNews"
              :key="news?.id"
              :news="news"
            />
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
            <div class="home-page-right-title">
              {{ $store.state.translations["main.newspaper"] }}
            </div>
            <div
              class="home-page-right-drop"
              @click="dropAction(1)"
              :class="{ heightAuto: dropVal == 1 }"
            >
              <h5>
                {{ $store.state.translations["main.library"] }}
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == 1 }"
                ></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board">
                  <ul>
                    <li>{{ $store.state.translations["main.theatres"] }}</li>
                    <li>{{ $store.state.translations["main.libraries"] }}</li>
                    <li>
                      {{ $store.state.translations["main.presentations"] }}
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
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == 2 }"
                ></span>
              </h5>
              <Transition name="bounceDrop">
                <div class="home-page-right-drop-board" v-if="dropVal == 2">
                  <ul>
                    <li>{{ $store.state.translations["main.theatres"] }}</li>
                    <li>{{ $store.state.translations["main.libraries"] }}</li>
                    <li>
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
              <div
                class="swiper-banner-right"
                style="overflow: hidden; width: 337px"
              >
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
            <RightNewsCard
              v-for="news in importantNews"
              :key="news?.id"
              :news="news"
            />
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
  async asyncData({ store, i18n }) {
    const [
      newsData,
      topNewsData,
      simpleNewsData,
      videoNewsData,
      redactorNewsData,
      importantNewsData,
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
    ]);
    const news = newsData.results;
    const topNews = topNewsData.results;
    const simpleNews = simpleNewsData.results;
    const videoNews = videoNewsData.results;
    const redactorNews = redactorNewsData.results;
    const importantNews = importantNewsData.results;
    return {
      news,
      topNews,
      simpleNews,
      videoNews,
      redactorNews,
      importantNews,
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
</style>
