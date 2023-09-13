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
          <div class="v-news-grid for_web">
            <VNewsCard v-for="news in simpleNews" :key="news.id" :news="news" />
          </div>
          <div class="hidden">
            <div class="mobile_hidden">
              <div class="block1">
                <div
                  class="home-page-right-title"
                  style="cursor: pointer"
                  @click="$router.push(localePath('newspaper'))"
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
                        <li @click="$router.push(localePath('/library?type=literature'))">
                          {{ $store.state.translations["main.literature"] }}
                        </li>
                        <li @click="$router.push(localePath('/library?type=scientific'))">
                          {{ $store.state.translations["main.science"] }}
                        </li>
                        <li @click="$router.push(localePath('/library?type=articles'))">
                          {{ $store.state.translations["main.articles"] }}
                        </li>
                        <li @click="$router.push(localePath('/library?type=articles'))">
                          {{ $store.state.translations["main.kasaba"] }}
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
                        <li @click="$router.push(localePath('/theater'))">
                          {{ $store.state.translations["main.Ytheatres"] }}
                        </li>
                        <li @click="$router.push(localePath('/concert'))">
                          {{ $store.state.translations["main.concert"] }}
                        </li>
                        <li @click="$router.push(localePath('/presentations'))">
                          {{ $store.state.translations["main.presentations"] }}
                        </li>
                      </ul>
                    </div>
                  </Transition>
                </div>
              </div>
              <div class="audio__container">
                <TitleComp
                  :link="false"
                  :title="$store.state.translations['others.fm_radio']"
                />
                <div class="audio__player">
                  <div class="audio__name">
                    <h6>
                      {{ audioList[currentAudio]?.name }}
                    </h6>
                  </div>
                  <audio-player
                    ref="audioPlayerMobile"
                    :audio-list="audioList.map((elm) => elm.url)"
                    :before-play="handleBeforePlayMobile"
                    theme-color="#051769"
                    :isLoop="false"
                    :currentPlayIndex="currentAudio"
                    :progress-end="($event) => processEnd($event)"
                  />
                </div>
                <div class="audio__list">
                  <ul>
                    <li
                      v-for="(audio, index) in audioList"
                      :key="audio?.id"
                      @click="currentAudioIndexMobile(index)"
                    >
                      <p :class="{ audio__active: currentAudio == index }">
                        {{ audio?.name }}
                      </p>
                      <span>14:32</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="block2">
                <div class="home-page-right-title" style="text-align: center">
                  {{ $store.state.translations["main.about_us"] }}
                </div>
                <div class="right-banner">
                  <a :href="banners[0]?.link">
                    <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div class="laptop_hidden">
              <div>
                <div class="audio__container">
                  <TitleComp
                    :link="false"
                    :title="$store.state.translations['others.fm_radio']"
                  />
                  <div class="audio__player">
                    <div class="audio__name">
                      <h6>
                        {{ audioList[currentAudio]?.name }}
                      </h6>
                    </div>
                    <audio-player
                      ref="audioPlayerMobile"
                      :audio-list="audioList.map((elm) => elm.url)"
                      :before-play="handleBeforePlayMobile"
                      theme-color="#051769"
                      :isLoop="false"
                      :currentPlayIndex="currentAudio"
                      :progress-end="($event) => processEnd($event)"
                    />
                  </div>
                  <div class="audio__list">
                    <ul>
                      <li
                        v-for="(audio, index) in audioList"
                        :key="audio?.id"
                        @click="currentAudioIndexMobile(index)"
                      >
                        <p :class="{ audio__active: currentAudio == index }">
                          {{ audio?.name }}
                        </p>
                        <span>14:32</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="home-page-right-title" style="text-align: center">
                  {{ $store.state.translations["main.about_us"] }}
                </div>
              </div>
              <div>
                <div class="block1">
                  <div
                    class="home-page-right-title"
                    style="cursor: pointer"
                    @click="$router.push(localePath('newspaper'))"
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
                          <li
                            @click="$router.push(localePath('/library?type=literature'))"
                          >
                            {{ $store.state.translations["main.literature"] }}
                          </li>
                          <li
                            @click="$router.push(localePath('/library?type=scientific'))"
                          >
                            {{ $store.state.translations["main.science"] }}
                          </li>
                          <li @click="$router.push(localePath('/library?type=articles'))">
                            {{ $store.state.translations["main.articles"] }}
                          </li>
                          <li @click="$router.push(localePath('/library?type=articles'))">
                            {{ $store.state.translations["main.kasaba"] }}
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
                          <li @click="$router.push(localePath('/theater'))">
                            {{ $store.state.translations["main.Ytheatres"] }}
                          </li>
                          <li @click="$router.push(localePath('/concert'))">
                            {{ $store.state.translations["main.concert"] }}
                          </li>
                          <li @click="$router.push(localePath('/presentations'))">
                            {{ $store.state.translations["main.presentations"] }}
                          </li>
                        </ul>
                      </div>
                    </Transition>
                  </div>
                </div>
                <div class="block2">
                  <div class="right-banner" v-if="banners[1]?.image">
                    <a :href="banners[1]?.link">
                      <img v-if="banners[1]?.image" :src="banners[1]?.image" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="topic_grid">
              <div class="d-flex flex-column w-100" style="overflow: hidden">
                <TitleComp
                  :link="false"
                  :title="$store.state.translations['main.editor_choice']"
                />
                <div class="mt-3 mb-5">
                  <div style="min-width: 0">
                    <div class="swiper-banner-right" style="overflow: hidden">
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
                  <div>
                    <div class="right-banner mobile_banner" v-if="banners[1]?.image">
                      <a :href="banners[1]?.link">
                        <img :src="banners[1]?.image" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <TitleComp
                  :link="false"
                  :title="$store.state.translations['main.active_topics']"
                />

                <div class="right-news-list" v-if="showAll">
                  <RightNewsCard
                    v-for="news in importantNews"
                    :key="news?.id"
                    :news="news"
                  />
                </div>
                <div class="right-news-list" v-else>
                  <RightNewsCard
                    v-for="news in importantNews.slice(0, 6)"
                    :key="news?.id"
                    :news="news"
                  />
                </div>
                <div
                  class="btn_container_show_more"
                  v-if="importantNews.length > 6 && !showAll"
                >
                  <div class="right-show-more">
                    {{ $store.state.translations["main.see_all"] }}
                  </div>
                  <div class="right-show-more-primary" @click="showAll = true">
                    {{ $store.state.translations["main.see_all"] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TitleComp
            link="video-news"
            :title="$store.state.translations['main.video_gallery']"
          />

          <div class="video-news-grid">
            <VideoNewsCard v-for="news in videoNews" :key="news?.id" :news="news" />
          </div>
          <TitleComp
            link="all-photo-news"
            :title="$store.state.translations['main.photo_repartee']"
          />
          <div class="news-images-grid">
            <NewsImagesCard v-for="news in photoNews" :key="news?.id" :news="news" />
          </div>
        </div>
        <div class="home-page-right col-3 p-0 clear" style="position: relative">
          <div style="position: sticky; top: 30px">
            <div class="block1">
              <div
                class="home-page-right-title"
                style="cursor: pointer"
                @click="$router.push(localePath('newspaper'))"
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
                      <li @click="$router.push(localePath('/library?type=literature'))">
                        {{ $store.state.translations["main.literature"] }}
                      </li>
                      <li @click="$router.push(localePath('/library?type=scientific'))">
                        {{ $store.state.translations["main.science"] }}
                      </li>
                      <li @click="$router.push(localePath('/library?type=articles'))">
                        {{ $store.state.translations["main.articles"] }}
                      </li>
                      <li @click="$router.push(localePath('/library?type=articles'))">
                        {{ $store.state.translations["main.kasaba"] }}
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
                      <li @click="$router.push(localePath('/theater'))">
                        {{ $store.state.translations["main.Ytheatres"] }}
                      </li>
                      <li @click="$router.push(localePath('/concert'))">
                        {{ $store.state.translations["main.concert"] }}
                      </li>
                      <li @click="$router.push(localePath('/presentations'))">
                        {{ $store.state.translations["main.presentations"] }}
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
            <div class="audio__container audio_web">
              <TitleComp
                :link="false"
                :title="$store.state.translations['others.fm_radio']"
              />
              <div class="audio__player">
                <div class="audio__name">
                  <h6>
                    {{ audioList[currentAudio]?.name }}
                  </h6>
                </div>
                <audio-player
                  class="audio_web"
                  ref="audioPlayer"
                  :audio-list="audioList.map((elm) => elm.url)"
                  :before-play="handleBeforePlay"
                  theme-color="#051769"
                  :isLoop="false"
                  :currentPlayIndex="currentAudio"
                  :progress-end="($event) => processEnd($event)"
                />
              </div>
              <div class="audio__list">
                <ul>
                  <li
                    v-for="(audio, index) in audioList"
                    :key="audio?.id"
                    @click="currentAudioIndex(index)"
                  >
                    <p :class="{ audio__active: currentAudio == index }">
                      {{ audio?.name }}
                    </p>
                    <span>14:32</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="block2">
              <div
                class="home-page-right-title"
                style="text-align: center; cursor: pointer"
                @click="$router.push(localePath('/about'))"
              >
                {{ $store.state.translations["main.about_us"] }}
              </div>
              <div class="right-banner">
                <a :href="banners[0]?.link">
                  <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
                </a>
              </div>
            </div>
            <TitleComp
              :link="false"
              :title="$store.state.translations['main.editor_choice']"
            />
            <div class="mt-3 mb-5">
              <div style="min-width: 0">
                <div class="swiper-banner-right" style="overflow: hidden">
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

            <div class="right-news-list" v-if="showAll">
              <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
            </div>
            <div class="right-news-list" v-else>
              <RightNewsCard
                v-for="news in importantNews.slice(0, 6)"
                :key="news?.id"
                :news="news"
              />
            </div>
            <div
              class="btn_container_show_more"
              v-if="importantNews.length > 6 && !showAll"
            >
              <div class="right-show-more">
                {{ $store.state.translations["main.see_all"] }}
              </div>
              <div class="right-show-more-primary" @click="showAll = true">
                {{ $store.state.translations["main.see_all"] }}
              </div>
            </div>

            <RightTelegramCard />
          </div>
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
// import Swiper from "swiper/swiper-bundle.js";
import { Swiper, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  name: "IndexPage",
  data() {
    return {
      showAll: false,
      dropVal: false,
      isPlaying: false,
      dropdown: require("../assets/svg/dropdown.svg?raw"),
      currentAudioName: "",
      currentAudio: 0,
      audioList: [],
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
      // effect: "fade",
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
      modules: [Pagination],
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
      audioData,
      photoNewsData,
    ] = await Promise.all([
      store.dispatch("fetchNews/getNews", {
        params: { last_news: true, top: false, page_size: 6, page: 1 },
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
        params: { page_size: 6, page: 2, top: true },
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
        params: { important: true },
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchBanners/getBanners", {
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchAudio/getAudio", {
        headers: {
          Language: i18n.locale,
        },
      }),
      store.dispatch("fetchNews/getPhotoNews", {
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
    const audio = audioData.results;
    const photoNews = photoNewsData.results;
    const audioList = audio.map((item) => {
      return {
        ...item,
        name: item.title,
        url: item.file,
      };
    });
    return {
      news,
      topNews,
      simpleNews,
      videoNews,
      redactorNews,
      importantNews,
      banners,
      audio,
      audioList,
      photoNews,
    };
  },
  methods: {
    async currentAudioIndex(index) {
      this.$refs.audioPlayer.pause();
      this.currentAudio = index;
      this.$refs.audioPlayer.currentPlayIndex = await index;
      setTimeout(() => {
        this.$refs.audioPlayer.play();
      }, 200);
    },
    async currentAudioIndexMobile(index) {
      this.$refs.audioPlayerMobile.pause();
      this.currentAudio = index;
      this.$refs.audioPlayerMobile.currentPlayIndex = await index;
      setTimeout(() => {
        this.$refs.audioPlayerMobile.play();
      }, 200);
    },
    processEnd(e) {},
    handleBeforePlay(next) {
      // There are a few things you can do here...
      this.currentAudioName = this.audioList[
        this.$refs.audioPlayer.currentPlayIndex
      ].name;
      this.currentAudio = this.$refs.audioPlayer.currentPlayIndex;
      next(); // Start playing
    },
    handleBeforePlayMobile(next) {
      // There are a few things you can do here...
      this.currentAudioName = this.audioList[
        this.$refs.audioPlayerMobile.currentPlayIndex
      ].name;
      this.currentAudio = this.$refs.audioPlayerMobile.currentPlayIndex;
      next(); // Start playing
    },
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
.audio__container {
  border-radius: 4px;
  background: var(--gray_292929, #f9f9f9);
  padding: 20px;
  margin-bottom: 24px;
}
.audio__player {
  padding-top: 23px;
  padding-bottom: 27px;
}
.audio__name {
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;
}
.audio__name::after {
  content: "";
  right: 0;
  top: 0;
  z-index: 100;
  background: linear-gradient(
    270deg,
    var(--gray_292929, #f9f9f9) 28.24%,
    var(--gray_292929, rgba(249, 249, 249, 0.95)) 65.53%,
    var(--gray_292929, rgba(249, 249, 249, 0)) 100%
  );

  position: absolute;
  transform: matrix(1, 0, 0, -1, 0, 0);
  width: 37px;
  height: 100%;
}
/* .anim-left {
    left: 0;
    z-index: 100;
    background: linear-gradient(
      270deg,
      #f0f8ff 36.73%,
      rgba(240, 248, 255, 0) 88.16%
    );
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
  .anim-right {
    right: 0;
    z-index: 100;
    background: linear-gradient(
      270deg,
      #f0f8ff 36.73%,
      rgba(240, 248, 255, 0) 88.16%
    );

    transform: matrix(1, 0, 0, -1, 0, 0);
  } */
@keyframes sliderText {
  0% {
    transform: translateX(100%);
  }

  25% {
    transform: translateX(50%);
  }

  50% {
    transform: translateX(0);
  }

  75% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(-100%);
  }
}
.audio__name h6 {
  color: var(--white_ffffff, #051769);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);

  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  white-space: nowrap;
  animation: sliderText 20s infinite linear;
}
.audio__list ul {
  max-height: 312px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  margin-right: -20px;
  padding-right: 18px;
}
.audio__list ul::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.audio__list ul::-webkit-scrollbar-track {
  border-radius: 16px;
  background: var(--black_414141, #eee);
}

/* Handle */
.audio__list ul::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: var(--black_111111, #82c9ff);
}

/* Handle on hover */
.audio__list ul::-webkit-scrollbar-thumb:hover {
  background: rgb(130, 201, 255, 0.5);
}
.audio__list ul li {
  border-bottom: 1px solid var(--black_414141, #eee);
  padding-top: 4px;
  padding-bottom: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.audio__play-prev,
.audio__play-next,
.audio__play-start,
.audio__play-icon,
.audio-player .audio__play-rate,
.audio__play-volume {
  color: var(--white_ffffff, #051769) !important;
}
.audio-player .audio__play-volume-icon-wrap .audio__play-volume-wrap .audio__play-volume {
  background-color: var(--white_ffffff, #051769) !important;
}
.audio__list ul li:hover p {
  color: var(--light-bue-100, #0192ff);
}
.audio__list ul li p {
  color: var(--white_ffffff, #000);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  transition: 0.3s;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.audio__active {
  color: var(--light-bue-100, #0192ff) !important;
}
.audio__list ul li span {
  color: var(--black-40, #888);
  text-align: right;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.24px;
  margin-top: 4px;
  display: block;
  width: 100%;
}
.audio__progress {
  background-color: #0192ff !important;
}
.audio-player .audio__progress-point:after {
  background-color: #0192ff !important;
}
.audio-player .audio__progress-point {
  width: 13px !important;
  height: 13px !important;
  box-shadow: none !important;
  background-color: #0192ff !important;
  margin-top: -6.5px !important;
}
.audio-player .audio__play-rate {
  margin-left: auto !important;
}
.audio-player .audio__play-volume-icon-wrap {
  margin-left: auto !important;
}
.audio-player .audio__current-time,
.audio-player .audio__duration {
  color: var(--black-40, #888) !important;
  text-align: right;
  font-size: 12px !important;
  font-family: var(--ROBOTO_SERIF);

  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.24px;
}
.mobile_hidden {
  display: none;
}
@media screen and (max-width: 1024px) {
  .laptop_hidden {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-gap: 20px;
  }
  .topic_grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
  }
  .right-banner {
    margin-top: 12px !important;
  }
  .home-page-right-drop {
    margin-top: 12px;
  }
  .hidden {
    display: block;
  }
  .clear {
    display: none;
  }
  /* .thumbs {
    display: none;
  } */
  /* .h-news-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
    gap: 0;
  } */
  .home-page-left {
    padding: 0 !important;
  }
  .row {
    margin: 0 !important;
  }

  /* .h-news-card-img {
    min-width: 94px;
    height: 64px;
    border-radius: 4px;
    overflow: hidden;
  } */

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
    font-size: 16px;
  }
  .home-page-right-drop {
    padding: 12px 16px;
  }
  .home-page-right-drop h5 {
    font-size: 16px;
    padding: 0;
    text-transform: uppercase;
  }
  .block1 {
    margin-bottom: 12px;
  }
  .right-banner {
    height: 480px;
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
  /* .video-news-grid,
  .news-images-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  } */
  .video-news-card {
    padding: 12px 10px;
    gap: 12px;
    border-radius: 6px;
    border: none;
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
}
@media (max-width: 768px) {
  .topic_grid {
    grid-template-columns: 1fr 1fr;
  }
  .thumbs {
    display: none;
  }
  .for_web {
    display: none !important;
  }
  .h-news-grid {
    margin-bottom: 50px;
  }
  .right-banner {
    height: 295px;
  }
}
@media (max-width: 576px) {
  .v-news-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .swiper-banner-right {
    /* width: 276px !important; */
  }
  .laptop_hidden {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .audio__name h6 {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 145%;
  }

  .audio_web {
    display: none;
  }
  .banner-card_text p {
    display: none;
  }
  .h-news-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
    gap: 0;
  }
}
@media (max-width: 500px) {
  .laptop_hidden {
    display: none;
  }
  .mobile_hidden {
    display: block;
  }
  .topic_grid {
    display: flex;
    flex-direction: column;
  }
  .swiper-banner-right {
    /* width: 470px !important; */
  }
  .mobile_banner {
    display: none;
  }
}
@media (max-width: 420px) {
  .swiper-banner-right {
    /* width: 337px !important; */
  }
}
</style>
