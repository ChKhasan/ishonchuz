<template>
  <div class="home-page news-page">
    <div class="container_xl">
      <div class="row mx-0">
        <div class="col-lg-9 col-md-12 p-0 home-page-left">
          <!-- <div class="new-category-title">
            <h2>{{ news?.category?.title }}</h2>
          </div> -->
          <div class="news-breadcrumb mb-0" v-if="news?.category">
            <nuxt-link :to="localePath('/')"
              >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
            ></nuxt-link>
            <nuxt-link
              v-if="news?.category?.parent?.slug"
              :to="localePath(`/news-menu/${news?.category?.parent?.slug}`)"
              >{{ news?.category?.parent?.title }} <span v-html="dropdown"></span
            ></nuxt-link>
            <nuxt-link :to="localePath(`/news-menu/${news?.category?.slug}`)"
              >{{ news?.category?.title }} <span v-html="dropdown"></span
            ></nuxt-link>
            <nuxt-link :to="localePath('/')" style="pointer-events: none"
              >{{ news?.title }} <span v-html="dropdown"></span
            ></nuxt-link>
          </div>
          <div class="news-container-header">
            <h1>{{ news?.title }}</h1>
            <h6>
              {{ news?.subtitle }}
            </h6>
          </div>
        </div>
        <div class="home-page-right col-3 p-0 news-page-right position-relative"></div>
      </div>
      <div class="home-page-grid row mx-0">
        <div class="col-lg-9 col-md-12 p-0 home-page-left">
          <div class="news-container">
            <div
              class="news-container-tag d-flex justify-content-between align-items-end"
            >
              <span class="tag" v-if="news?.category?.title">{{
                news?.category?.title
              }}</span>
              <div class="news-container-character d-flex">
                <span><span v-html="view"></span>{{ news?.views }}</span>
                <span class="news-date_web"
                  ><span v-html="date"></span>{{ news?.date }}</span
                >
                <span class="news-date_mobile"
                  ><span v-html="date"></span>{{ news?.date.split("|")[0] }}</span
                >
              </div>
            </div>
            <!-- <div class="news-container-head">
              <div class="news-container-character d-flex">
                <span><span v-html="view"></span>{{ news?.views }}</span>
                <span class="news-date_web"
                  ><span v-html="date"></span>{{ news?.date }}</span
                >
                <span class="news-date_mobile"
                  ><span v-html="date"></span>{{ news?.date.split("|")[0] }}</span
                >
              </div>
              <div class="news-container-messangers">
                <a
                  v-if="$store.state.siteInfo['telegram']"
                  :href="$store.state.siteInfo['telegram']"
                  ><span v-html="telegram"></span
                ></a>
                <a
                  v-if="$store.state.siteInfo['facebook']"
                  :href="$store.state.siteInfo['facebook']"
                  ><span v-html="facebook"></span
                ></a>
                <a
                  v-if="$store.state.siteInfo['twitter']"
                  :href="$store.state.siteInfo['twitter']"
                  ><span v-html="twitter"></span
                ></a>
                <a
                  v-if="$store.state.siteInfo['instagram']"
                  :href="$store.state.siteInfo['instagram']"
                  ><span v-html="instagram"></span
                ></a>
                <a
                  v-if="$store.state.siteInfo['whatsapp']"
                  :href="$store.state.siteInfo['whatsapp']"
                  ><span v-html="whatsapp"></span
                ></a>
              </div>
            </div> -->

            <!-- <div class="news-container-banner">
              <div>
                <img :src="news?.image" v-if="news?.image" alt="" />
                <img v-else src="../../assets/images/Frame 92654103.png" alt="" />
              </div>
              <span>Foto: Ishonch.uz</span>
            </div> -->
            <div class="news_video mt-4" v-if="news?.video">
              <!-- <video :src="news?.video"></video> -->
              <!-- <iframe width="420" height="315" :src="news?.video"> </iframe> -->
              <LazyYoutube v-if="news?.video" ref="lazyVideo" :src="news?.video" />
            </div>
            <div class="mt-4 news_banner" v-if="news?.image">
              <img :src="news?.image" alt="" />
            </div>
            <div
              class="news-container-body"
              v-html="
                news?.text?.replaceAll('</p>', '</p><br/>').replaceAll('&nbsp;', ' ')
              "
            ></div>
            <div class="d-flex justify-content-between news-container-bottom">
              <div class="news-container-links">
                <a href="#" v-for="tag in news?.tags" :key="tag?.id">#{{ tag?.title }}</a>
              </div>
              <div class="news-container-messangers">
                <a
                  :href="`https://t.me/share/url?url=${host + $route.fullPath}`"
                  target="_blank"
                  ><span v-html="telegram"></span
                ></a>
                <a
                  :href="`https://www.facebook.com/sharer.php?u=https://ishonch.uz/news/alloning-tarihini-bilasizmi`"
                  target="_blank"
                  ><span v-html="facebook"></span
                ></a>
                <a
                  :href="`https://twitter.com/intent/tweet?url=${host + $route.fullPath}`"
                  target="_blank"
                  ><span v-html="twitter"></span
                ></a>
                <!-- <a
                  :href="`https://www.instagram.com/?url=${host + $route.fullPath}`"
                  target="_blank"
                  ><span v-html="instagram"></span
                ></a> -->
                <a
                  :href="`https://api.whatsapp.com/send?text=${host + $route.fullPath}`"
                  target="_blank"
                  ><span v-html="whatsapp"></span
                ></a>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span style="white-space: nowrap; font-size: 14px" ref="text">{{
                      host + $route.fullPath.replace(news?.slug, news?.id)
                    }}</span>
                  </template>
                  <span
                    style="cursor: pointer"
                    @click="copyURL(host + $route.fullPath.replace(news?.slug, news?.id))"
                    ><span
                      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M13.0605 8.11073L14.4747 9.52494C17.2084 12.2586 17.2084 16.6908 14.4747 19.4244L14.1211 19.778C11.3875 22.5117 6.95531 22.5117 4.22164 19.778C1.48797 17.0443 1.48797 12.6122 4.22164 9.87849L5.63585 11.2927C3.68323 13.2453 3.68323 16.4112 5.63585 18.3638C7.58847 20.3164 10.7543 20.3164 12.7069 18.3638L13.0605 18.0102C15.0131 16.0576 15.0131 12.8918 13.0605 10.9392L11.6463 9.52494L13.0605 8.11073ZM19.778 14.1211L18.3638 12.7069C20.3164 10.7543 20.3164 7.58847 18.3638 5.63585C16.4112 3.68323 13.2453 3.68323 11.2927 5.63585L10.9392 5.98941C8.98653 7.94203 8.98653 11.1079 10.9392 13.0605L12.3534 14.4747L10.9392 15.8889L9.52494 14.4747C6.79127 11.741 6.79127 7.30886 9.52494 4.57519L9.87849 4.22164C12.6122 1.48797 17.0443 1.48797 19.778 4.22164C22.5117 6.95531 22.5117 11.3875 19.778 14.1211Z"
                        ></path></svg></span
                  ></span>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="home-page-right col-3 p-0 news-page-right position-relative">
          <div style="position: sticky; top: 30px">
            <div class="block2">
              <div class="right-banner mt-0">
                <a :href="banners[0]?.link">
                  <img v-if="banners[0]?.image" :src="banners[0]?.image" alt="" />
                </a>
              </div>
            </div>
            <TitleComp
              :link="false"
              :title="$store.state.translations['main.active_topics']"
            />
            <div class="right-news-list">
              <RightNewsCard v-for="news in importantNews" :key="news?.id" :news="news" />
            </div>
            <div class="right-banner">
              <a :href="banners[1]?.link">
                <img v-if="banners[1]?.image" :src="banners[1]?.image" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-container-grid">
        <a-form-model ref="ruleFormComment" :model="form" :rules="rules">
          <div>
            <div class="comment-form">
              <h5>{{ $store.state.translations["news.leave_comment"] }}</h5>
              <a-form-model-item class="form-item mb-0 w-100" prop="full_name">
                <div>
                  <input
                    type="text"
                    v-model="form.full_name"
                    :placeholder="$store.state.translations['news.comment_input_place']"
                  />
                  <a-rate v-model="form.stars" />
                </div>
              </a-form-model-item>
              <a-form-model-item class="form-item mb-0 w-100" prop="text">
                <textarea
                  rows="5"
                  v-model="form.text"
                  :placeholder="$store.state.translations['news.comment_textarea_place']"
                ></textarea>
              </a-form-model-item>

              <div class="send-btn" @click="submit()">
                {{ $store.state.translations["inner.send-comment"] }}
              </div>
            </div>
            <div class="general-assessment general-assessment-mobile">
              <h5>{{ $store.state.translations["inner.comment-title"] }}</h5>
              <div class="main-rate">
                <a-rate
                  :default-value="Number.parseInt(Number(news?.rating))"
                  allow-half
                  disabled
                /><span>{{ Number.parseInt(news?.rating) }}/5</span>
              </div>
              <div class="item-rate">
                <a-rate :default-value="5" disabled /><span
                  ><p>{{ news?.rating_info["5"] }}</p></span
                >
              </div>
              <div class="item-rate">
                <a-rate :default-value="4" disabled /><span
                  ><p>{{ news?.rating_info["4"] }}</p></span
                >
              </div>
              <div class="item-rate">
                <a-rate :default-value="3" disabled /><span
                  ><p>{{ news?.rating_info["3"] }}</p></span
                >
              </div>
              <div class="item-rate">
                <a-rate :default-value="2" disabled /><span
                  ><p>{{ news?.rating_info["2"] }}</p></span
                >
              </div>
              <div class="item-rate">
                <a-rate :default-value="1" disabled /><span
                  ><p>{{ news?.rating_info["1"] }}</p></span
                >
              </div>
            </div>
            <div class="comments-list" v-if="news?.comments.length > 0">
              <h4>
                {{ $store.state.translations["news.comments_title"] }} ({{
                  news?.comments.length
                }})
              </h4>
              <div class="comments-grid" v-if="showAll">
                <CommentCard
                  v-for="comment in news?.comments"
                  :key="comment?.id"
                  :comment="comment"
                />
              </div>
              <div class="comments-grid" v-else>
                <CommentCard
                  v-for="comment in news?.comments.slice(0, 3)"
                  :key="comment?.id"
                  :comment="comment"
                />
              </div>
              <div
                class="show-more-count"
                v-if="news?.comments.length > 3 && !showAll"
                @click="showAll = true"
              >
                {{ $store.state.translations["news.see_again"] }} ({{
                  news?.comments.length - 3
                }})
              </div>
            </div>
          </div>
        </a-form-model>
        <div>
          <div class="general-assessment general-assessment-web">
            <h5>{{ $store.state.translations["inner.comment-title"] }}</h5>
            <div class="main-rate">
              <a-rate
                :default-value="Number.parseInt(Number(news?.rating))"
                allow-half
                disabled
              /><span>{{ Number.parseInt(news?.rating) }}/5</span>
            </div>
            <div class="item-rate">
              <a-rate :default-value="5" disabled /><span
                ><p>{{ news?.rating_info["5"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="4" disabled /><span
                ><p>{{ news?.rating_info["4"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="3" disabled /><span
                ><p>{{ news?.rating_info["3"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="2" disabled /><span
                ><p>{{ news?.rating_info["2"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="1" disabled /><span
                ><p>{{ news?.rating_info["1"] }}</p></span
              >
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="comment-container-grid">
          <TitleComp
            :link="false"
            :title="$store.state.translations['news.on_subject']"
          />
          <span></span>
        </div>
        <div
          class="flex items-center justify-center container_xl mt-3"
          style="min-width: 0"
        >
          <div class="swiper-news-mobile" style="overflow: hidden">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                style="height: auto"
                v-for="news in news.other_news"
                :key="news?.id"
              >
                <VNewsCard :news="news" />
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
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
import Swiper from "swiper/swiper-bundle.js";
import "swiper/swiper-bundle.min.css";
export default {
  name: "IndexPage",
  head() {
    return {
      title: this.news["title"],
      meta: [
        {
          name: "title",
          content: `${this.news["title"]}`,
        },
        {
          name: "keywords",
          content: this.news?.meta?.meta_keys,
        },
        {
          name: "description",
          content: this.cleanedCkeditorContent,
        },

        { hid: "og-title", property: "og:title", content: this.news["title"] },
        { hid: "og-title", property: "og:title", content: this.news["title"] },
        {
          hid: "og-description",
          property: "og:description",
          content: this.cleanedCkeditorContent,
        },
        {
          hid: "og-url",
          property: "og:url",
          content: process.env.BASE_URL + "/" + this.$route.fullPath,
        },
        { hid: "og-image", property: "og:image", content: this.news?.image },
      ],
    };
  },

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
      showAll: false,
      rules: {
        full_name: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
      },
      form: {
        full_name: "",
        text: "",
        news: null,
        stars: 0,
      },
      host: process.env.HOST_URL,
    };
  },
  mounted() {
    this.$store.commit("viewNewsStore", { id: this.news?.id });
    const swiper = new Swiper(".swiper-news-mobile", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: false,
      visibilityFullFit: true,
      autoResize: false,
      loopedSlides: 3,
      autoplay: {
        delay: 40000,
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
    // const swiperRight = new Swiper(".swiper-news-mobile", {
    //   flipEffect: {
    //     slideShadows: false,
    //   },
    //   slidesPerView: 1,
    //   pagination: false,
    // });
  },

  async asyncData({ store, params, i18n }) {
    const [newsData, topicNewsData, importantNewsData, bannersData] = await Promise.all([
      store.dispatch("fetchNews/getNewsBySlug", {
        id: params.index,
        header: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
      store.dispatch("fetchNews/getNews", {
        params: { video: true, page_size: 3 },
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
    const news = newsData;
    const topicNews = topicNewsData.results;
    const importantNews = importantNewsData.results;
    const banners = bannersData.results;
    return {
      news,
      topicNews,
      importantNews,
      banners,
    };
  },
  computed: {
    cleanedCkeditorContent() {
      return this.stripHtmlTags(this.news?.text);
    },
    rateSumm() {
      const summa =
        this.news?.rating_info["5"] * 5 +
        this.news?.rating_info["4"] * 4 +
        this.news?.rating_info["3"] * 3 +
        this.news?.rating_info["2"] * 2 +
        this.news?.rating_info["1"] * 1;
      return summa;
    },
  },
  methods: {
    stripHtmlTags(input) {
      return input.replace(/<\/?[^>]+(>|$)/g, "");
    },
    async copyURL(name) {
      await navigator.clipboard.writeText(name);
      this.$message.success("Copy");
    },
    submit() {
      this.form.news = this.news.id;
      this.$refs.ruleFormComment.validate((valid) => {
        if (valid) {
          this.__POST_COMMENT(this.form);
        } else {
          return false;
        }
      });
    },
    emptyForm() {
      this.form = {
        full_name: "",
        text: "",
        news: null,
        stars: 0,
      };
    },
    async __POST_COMMENT(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchNews/postNewsComment", dataForm);
        this.$notification["success"]({
          message: "Success",
          description: "Комментарий отправлен успешно.",
        });
        this.emptyForm();
      } catch (e) {
        console.log(e);
      }
    },
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
@import "../../assets/css/pages/comment-components.css";
.news-page {
  padding-top: 20px;
}
.news_banner {
  width: 100%;
}
.news_banner img {
  width: 100%;
}
.news_video {
  width: 100%;
}
.news_video iframe,
.vlt-wrapper {
  width: 100% !important;
  max-width: 100% !important;
}

.news-container {
  padding: 60px 70px;
  background: var(--gray_292929, #eee);
  border-radius: 8px;
  padding-bottom: 90px;
}
.news-container .tag {
  background: var(--blue_0192FF, #f9f9f9);
  padding: 7px 12px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--card_badges_color);
}
.news-container-tag {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--news_container_br);
}
.news-container-character > span {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: var(--news_date);
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
.news-container-messangers span svg path {
  fill: var(--footer_messangers);
}
/* .news-container-messangers span {
  margin-right: 32px;
} */
.news-container-header {
  margin-top: 20px;
  margin-bottom: 30px;
}
.news-container-header h1 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  color: var(--text_color);
}
.news-container-header h6 {
  font-family: var(--ROBOTO_SERIF);
  margin-top: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--sub_title);
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
  padding-bottom: 32px;
  border-bottom: 1px solid var(--news_container_br);
  color: var(--white_ffffff, #000);
}

.news-container-body img {
  max-width: 100%;
}
.news-container-body figure {
  width: 100% !important;
  margin-left: 0 !important;
}
.news-container-body h1,
.news-container-body::v-deep h1 {
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
.news-date_mobile {
  display: none;
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
.news-container-body p,
.news-container-body span,
.news-container-body li {
  color: var(--text_color) !important;
  background-color: transparent !important;
  font-family: var(--ROBOTO_SERIF) !important;
  font-weight: 400 !important;
  font-size: 19px !important;
  line-height: 170%;
  color: #1e2e78;
}
.news-container-body strong {
  color: var(--dark-blue-90, #1e2e78) !important;
  font-size: 19px !important;
  font-family: var(--ROBOTO_SERIF) !important;

  font-style: italic;
  line-height: 170%;
}
.article-card-text p,
.news-container-body li {
  font-family: var(--ROBOTO_SERIF) !important;
  font-weight: 400;
  font-style: italic;

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
.news-container-bottom {
  margin-top: 16px;
}
.news-container-links {
  display: flex;
}
.news-container-links a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: var(--news_container_link);
  margin-right: 16px;
}
.news-container-messangers-mobile {
  display: none;
}
.news-container-messangers {
  display: flex;
  gap: 32px;
}
@media screen and (max-width: 1024px) {
  .news-container-tag {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    grid-gap: 10px;
  }
  .news-page-right {
    display: none;
  }
  .news-menu-page {
    padding-top: 20px;
  }
  .news-container {
    padding: 5px;
    background: var(--transparent, #ffffff);
  }
  .news-container-character > span {
    margin-right: 13px;
  }
  .news-container-messangers-mobile a svg {
    width: 24px;
    height: 24px;
  }
  .news-container-messangers-mobile a {
    margin-left: 8px;
  }

  .news-container-links a {
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0.24px;
  }
  .news-container-body {
    padding-bottom: 50px;
    /* overflow: hidden; */
  }
  .comment-form {
    padding: 20px 24px;
  }
  .comment-form h5,
  .general-assessment h5 {
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
    margin-bottom: 15px;
  }
  .send-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-left: 0;
    padding-right: 0;
  }

  .news-container-header {
    margin-top: 20px;
  }
}
@media (max-width: 768px) {
  .news-container-body p,
  .news-container-body span,
  .news-container-body li {
    font-size: 16px !important;
    line-height: 145%;
  }
  .news-container-header h1 {
    font-size: 22px;
    font-weight: 500;
    line-height: 130%;
  }
  .news-container-header h6 {
    font-size: 16px;
    /* font-weight: 500; */
    line-height: 150%;
  }
}
@media (max-width: 576px) {
  .news-container .tag {
    font-size: 10px;
  }
  .news-date_mobile {
    display: block;
  }
  .news-date_web {
    display: none;
  }
  .news-container-body p,
  .news-container-body span,
  .news-container-body li {
    font-size: 14px !important;
    line-height: 145%;
  }
  .news-container-header h1 {
    font-size: 19px;
    font-weight: 600;
    line-height: 170%;
  }
  .news-container-header h6 {
    font-size: 14px;
    /* font-weight: 500; */
    line-height: 150%;
  }
  .news-container-bottom {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
}
@media (max-width: 421px) {
  .news-container-messangers-mobile {
    display: block;
  }
  .news-container-messangers {
    /* display: none; */
  }
  .news-container-header h1 {
    font-size: 16px;
    font-weight: 600;
    line-height: 170%;
  }
}
</style>
