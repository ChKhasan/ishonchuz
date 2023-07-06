<template>
  <div class="wrap">
    <div class="container_xl">
      <div class="row">
        <div class="col-lg-4 col-xs-12 left">
          <div class="cardo">
            <div class="wrapper">
              <div class="img">
                <img
                  v-if="journalists?.image"
                  :src="journalists?.image"
                  alt=""
                  class="pic"
                />
                <img v-else src="@/assets/images/review.jpg" alt="" class="pic" />
              </div>
              <div class="content">
                <h4 class="name">{{ journalists?.full_name }}</h4>
                <p class="status">Jurnalist</p>
              </div>
              <div class="socials">
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
            </div>
          </div>
          <div class="second">
            <div class="item">
              <p class="question">
                <img src="@/assets/images/logo/bag.svg" alt="" /> {{ $store.state.translations["main.workspace"] }}:
              </p>
              <p class="answer">{{ journalists?.work_place }}</p>
            </div>
            <div class="item">
              <p class="question">
                <img src="@/assets/images/logo/target.svg" alt="" /> {{ $store.state.translations["main.experience"] }}:
              </p>
              <p class="answer">{{ journalists?.experience }}</p>
            </div>
            <div class="item">
              <p class="question">
                <img src="@/assets/images/logo/lang.svg" alt="" />Tillar
              </p>
              <p class="answer">{{ journalists?.experience }}</p>
            </div>
            <div class="socials__mobile">
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
          </div>
        </div>
        <div class="col-lg-8 col-xs-12 right">
          <div class="buttons">
            <button
              :class="{ active: handleBio }"
              @click="(handleBio = true), (handleArticles = false)"
            >
              Biografiyasi
            </button>
            <button
              :class="{ active: handleArticles }"
              @click="(handleBio = false), (handleArticles = true)"
            >
              Maqolalari
            </button>
          </div>
          <div class="body">
            <div :class="{ show: handleBio }" class="bio">
              <div class="bio-body" v-html="journalists?.bio"></div>
              <!-- <h1>Qisqacha biografiyasi</h1>
              <p>
                Bilol Alixon Toxirov 1915 yil 1 mart kuni Toshkentning Oʻqchi mahallasida
                hunarmand-ishchilar oilasida tavallud topgan. Sheʼrga, soʻzga, adabiyotga
                muhabbat unda bolaligida oialsidagi muhit sababli paydo boʻlgan boʻlsa
                ajab emas. Ayniqsa, bunda onasi Xadichabegimning roli katta: – Onamning
                qanchadan-qancha qoʻshiq va afsonalarni bilishiga aqlimiz bovar qilmasdi.
                Bu sehrli afsona va dostonlar bizga benihoya huzur bagʻishlar, oʻziga rom
                qilib olar, har safar yangi jilva kasb etar edi
              </p>
              <h4>Ta’lim davri</h4>
              <p>
                Bilol Alixon Toxirov 1915 yil 1 mart kuni Toshkentning Oʻqchi mahallasida
                hunarmand-ishchilar oilasida tavallud topgan. Sheʼrga, soʻzga, adabiyotga
                muhabbat unda bolaligida oialsidagi muhit sababli paydo boʻlgan boʻlsa
                ajab emas. Ayniqsa, bunda onasi Xadichabegimning roli katta: – Onamning
                qanchadan-qancha qoʻshiq va afsonalarni bilishiga aqlimiz bovar qilmasdi.
                Bu sehrli afsona va dostonlar bizga benihoya huzur bagʻishlar, oʻziga rom
                qilib olar, har safar yangi jilva kasb etar edi
              </p>-->
              <h2 v-if="journalists?.images.length > 0">Diplom va Sertifikatlar</h2>
              <div class="images">
                <img
                  :src="image?.image"
                  alt=""
                  v-for="image in journalists?.images"
                  :key="image?.id"
                />
              </div>
              <h2 v-if="journalists?.awards.length > 0">Mukofotlar</h2>
              <div class="awards__list">
                <div
                  class="awards__card"
                  v-for="award in journalists?.awards"
                  :key="award?.id"
                >
                  <div class="awards__image">
                    <img :src="award?.image" alt="" />
                  </div>
                  <div class="awards__body" v-html="award?.text"></div>
                </div>
              </div>
              <div class="awards__list_resp">
                <div class="images">
                  <img
                    :src="award?.image"
                    alt=""
                    v-for="award in journalists?.awards"
                    :key="award?.id"
                  />
                </div>
                <div
                  class="awards__body"
                  v-for="award in journalists?.awards"
                  v-html="award?.text"
                ></div>
              </div>
            </div>
            <div :class="{ show: handleArticles }" class="articles">
              <div class="grid">
                <div
                  class="article"
                  v-for="article in journalists?.articles"
                  :key="article?.id"
                  @click="$router.push(`/library-inner/${article?.slug}`)"
                >
                  <NuxtLink to="">
                    <div class="content">
                      <h4 class="name">{{ article?.title }}</h4>
                      <p class="sub" v-html="article?.text"></p>
                    </div>
                    <div class="v-news-card-info">
                      <span><span v-html="comments"></span>0</span>
                      <span
                        ><span v-html="view"></span
                        >{{ article?.views ? article?.views : 0 }}</span
                      >
                      <span><span v-html="date"></span>{{ article?.date }}</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handleBio: true,
      handleArticles: false,
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      comments: require("../../assets/svg/comments.svg?raw"),
      view: require("../../assets/svg/view.svg?raw"),
      date: require("../../assets/svg/date.svg?raw"),
    };
  },
  async mounted() {
    const [journalistsData] = await Promise.all([
      this.$store.dispatch("fetchJournalists/getJournalistsBySlug", {
        id: this.$route.params.id,
        header: {
          headers: {
            Language: this.$i18n.locale,
          },
        },
      }),
    ]);
  },
  async asyncData({ store, params, i18n }) {
    const [journalistsData] = await Promise.all([
      store.dispatch("fetchJournalists/getJournalistsBySlug", {
        id: params.id,
        header: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
    ]);
    const journalists = journalistsData;
    return { journalists };
  },
};
</script>

<style scoped>
.awards__list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
}
.awards__card {
  display: grid;
  grid-template-columns: 174px 1fr;
  grid-gap: 16px;
}
.awards__image img {
  height: 123px;
  width: 100%;
  object-fit: contain;
}
.awards__body::v-deep p {
  color: var(--white_ffffff, #292929);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
.wrap {
  padding: 32px 0 120px 0;
}
.cardo {
  border-radius: 12px;
  background: var(--black_111111, #f9f9f9);
  padding: 52px 0;
}
.wrapper {
  max-width: 270px;
  margin: 0 auto;
  text-align: center;
}
.pic {
  width: 100%;
  max-width: 270px;
  height: 270px;
  border-radius: 50%;
  margin-bottom: 35px;
  object-fit: cover;
}
.name {
  font-size: 22px;
  font-weight: 600;
  line-height: 150%;
  color: var(--white_ffffff, #051769);
  font-family: var(--ROBOTO_SERIF);
  margin-bottom: 12px;
}
.status {
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  font-family: var(--ROBOTO_SERIF);
  color: var(--breadcrumb_text);
  margin-bottom: 60px;
}

.socials {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
}
.second {
  border-radius: 12px;
  background: var(--black_111111, #f9f9f9);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}
.question {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.24px;
  margin-bottom: 8px;
  font-family: var(--ROBOTO_SERIF);
  color: #a0a0a0;
}
.answer {
  font-size: 14px;
  line-height: 150%;
  color: var(--white_ffffff, #051769);
  font-family: var(--ROBOTO_SERIF);
}
.buttons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.buttons button {
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
  font-family: var(--ROBOTO_SERIF);
  padding: 10px;
  color: var(--white_ffffff, #505d96);
  background: transparent;
  border: none;
  border-radius: 4px;
}
.buttons button.active {
  color: var(--active_tab_color);
  background: var(--active_tab_bg);
}
.bio {
  border-radius: 12px;
  padding: 40px;
  background: var(--header_bg);
}
.bio-body p {
  color: var(--white_ffffff, #292929) !important;
}
.bio-body {
  margin-bottom: 40px;
}
.bio div p span {
  color: #ffffff !important;
}
.bio h1 {
  font-size: 19px;
  font-weight: 600;
  line-height: 170%;
  font-family: var(--ROBOTO_SERIF);
  color: var(--active_tab_color);
  margin-bottom: 8px;
}
.bio::v-deep h2,
.bio h3,
.bio h4,
.bio h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 170%;
  font-family: var(--ROBOTO_SERIF);
  color: var(--active_tab_color);
  margin-bottom: 8px;
}
.bio::v-deep p,
.bio::v-deep span,
.bio p,
.bio span {
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 16px;
  font-family: var(--ROBOTO_SERIF);
  color: var(--footer_subtitle);
}
.bio img {
  width: auto;
  height: 123px;
  object-fit: contain;
  /* margin-right: 10px; */
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.article {
  padding-left: 24px;
  padding: 14px;
  border-left: 1px solid var(--gray_292929, #e7e7e7);
  cursor: pointer;
}
.articles .name {
  font-size: 19px;
  margin-bottom: 10px;
}
.articles .sub {
  font-size: 14px;
  line-height: 150%;
  font-family: var(--ROBOTO_SERIF);
  color: var(--news_container_link);
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.v-news-card-info {
  justify-content: flex-start !important;
}
.v-news-card-info span {
  color: var(--header_btns_svg);
}
.v-news-card-info::v-deep svg path {
  stroke: var(--header_btns_svg) !important;
}
.v-news-card-info span:first-child {
  margin-left: 0;
}
.bio,
.articles {
  display: none;
}
.bio.show,
.articles.show {
  display: block;
}
.socials__mobile {
  display: none;
}
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}
.awards__list_resp {
  display: none;
}
@media (max-width: 992px) {
  .awards__body::v-deep p {
    font-size: 14px;
    line-height: 145%;
  }
  .bio img {
    height: 101px;
  }
  .awards__list {
    display: none;
  }
  .awards__list_resp {
    display: block;
  }
}
@media (max-width: 576px) {
  .articles .name {
    font-size: 16px;
  }
  .left,
  .right {
    padding-left: 0;
    padding-right: 0;
  }
  .bio {
    padding: 0;
    background: transparent;
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .buttons {
    margin-top: 20px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 360px) {
  .left {
    padding-left: 0;
    padding-right: 0;
  }
  .right {
    margin-top: 20px;
    padding-left: 0;
    padding-right: 0;
  }
  .cardo {
    border-radius: 0;
    background: transparent;
    padding: 0;
  }
  .pic {
    max-width: 113px;
    height: 113px;
    margin-bottom: 28px;
    object-fit: cover;
  }
  .name {
    font-size: 16px;
    line-height: 130%;
    margin-bottom: 10px;
  }
  .status {
    margin-bottom: 24px;
  }
  .socials {
    display: none;
  }
  .socials__mobile {
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  .second {
    border-radius: 12px;
    background: transparent;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 32px;
  }
  .second .item {
    display: flex;
  }
  .second .item .answer {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    line-height: 130%;
    display: flex;
    align-items: center;
  }
  .second .item .question {
    margin-bottom: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 130%;
  }
  .buttons button {
    border-radius: 3px;
    max-height: 35px;
    display: flex;
    align-items: center;
  }
  .buttons {
    justify-content: center;
  }
  .bio {
    padding: 0;
    background: transparent;
  }
  .images {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .grid {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .content .name {
    font-size: 19px;
    font-weight: 500;
    line-height: 170%;
  }
  .content .sub {
    font-size: 14px;
    font-weight: 400;
    line-height: 145%;
  }
  .bio p,
  .bio span,
  .bio p,
  .bio span {
    font-size: 14px !important;
  }
}
</style>
