<template>
  <div class="home-page journalists-page">
    <div class="container_xl">
      <div>
        <h3 class="journalists-page-title">
          {{ $store.state.translations["main.journalists"] }}
          <span>({{ journalists?.length }}) </span>
        </h3>
        <div class="journalists_container" v-if="showAll">
          <JournalistsCard
            v-for="journalist in journalists"
            :journalist="journalist"
            :key="journalist?.id"
          />
        </div>
        <div class="journalists_container" v-else>
          <JournalistsCard
            v-for="journalist in journalists?.slice(0, 9)"
            :journalist="journalist"
            :key="journalist?.id"
          />
        </div>
      </div>
      <div>
        <div class="btn_container_show_more" v-if="journalists?.length > 9">
          <div class="right-show-more">
            {{ $store.state.translations["main.more"] }}
          </div>
          <div class="right-show-more-primary" @click="showAll = true">
            {{ $store.state.translations["main.see_all"] }}
          </div>
        </div>
        <div class="messangers-container">

<div class="messangers-banner">
  <svg xmlns="http://www.w3.org/2000/svg" width="57" height="55" viewBox="0 0 57 55" fill="none">
<path d="M28.5 0C12.756 0 0 12.3085 0 27.5C0 42.6915 12.756 55 28.5 55C44.244 55 57 42.6915 57 27.5C57 12.3085 44.244 0 28.5 0ZM42.4972 18.8397L37.82 40.1079C37.4752 41.6159 36.5444 41.9819 35.2458 41.2722L28.1208 36.2046L24.6847 39.3982C24.3054 39.7641 23.9837 40.0746 23.2482 40.0746L23.7538 33.0776L36.9581 21.5675C37.5327 21.0796 36.8316 20.8024 36.0732 21.2903L19.7546 31.2036L12.7216 29.0857C11.1931 28.62 11.1587 27.6109 13.0433 26.9012L40.5206 16.6774C41.7962 16.2339 42.9109 16.9768 42.4972 18.8397Z" fill="#F9F9F9"/>
</svg>
  <h5>{{ $store.state.translations["main.follow_us_text"] }}</h5>
</div>
  <!-- <div class="follow-us-message">
    {{ $store.state.translations["main.follow-us"] }}
  </div> -->
  <div class="messanger-icons">
    <a
      v-if="$store.state.siteInfo['telegram']"
      :href="$store.state.siteInfo['telegram']"
      ><span >
        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
<g clip-path="url(#clip0_1988_6123)">
<path d="M29.0625 0.908203C13.0078 0.908203 0 13.5095 0 29.0625C0 44.6155 13.0078 57.2168 29.0625 57.2168C45.1172 57.2168 58.125 44.6155 58.125 29.0625C58.125 13.5095 45.1172 0.908203 29.0625 0.908203ZM43.3359 20.1962L38.5664 41.9703C38.2148 43.5143 37.2656 43.8889 35.9414 43.1624L28.6758 37.9742L25.1719 41.2438C24.7852 41.6184 24.457 41.9363 23.707 41.9363L24.2227 34.7728L37.6875 22.9889C38.2734 22.4894 37.5586 22.2056 36.7852 22.7051L20.1445 32.8542L12.9727 30.6859C11.4141 30.2091 11.3789 29.176 13.3008 28.4495L41.3203 17.9824C42.6211 17.5283 43.7578 18.2889 43.3359 20.1962Z" fill="#0192FF"/>
</g>
<defs>
<clipPath id="clip0_1988_6123">
<rect width="58.125" height="58.125" fill="white"/>
</clipPath>
</defs>
</svg>
      </span
    ></a>
    <a
      v-if="$store.state.siteInfo['facebook']"
      :href="$store.state.siteInfo['facebook']"
      ><span >
        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
<g clip-path="url(#clip0_1988_6125)">
<path d="M33.8177 32.6953H39.5841L41.8906 23.0078H33.8177V18.1641C33.8177 15.6695 33.8177 13.3203 38.4308 13.3203H41.8906V5.18281C41.1387 5.07867 38.2993 4.84375 35.3008 4.84375C29.0385 4.84375 24.5915 8.8568 24.5915 16.2266V23.0078H17.6719V32.6953H24.5915V53.2812H33.8177V32.6953Z" fill="#0192FF"/>
</g>
<defs>
<clipPath id="clip0_1988_6125">
<rect width="58.125" height="58.125" fill="white" transform="translate(0.71875)"/>
</clipPath>
</defs>
</svg>
      </span
    ></a>
    <a
      v-if="$store.state.siteInfo['twitter']"
      :href="$store.state.siteInfo['twitter']"
      ><span >
        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
<g clip-path="url(#clip0_1988_6129)">
<path d="M58.5596 12.7282C56.3827 13.6658 54.0741 14.2815 51.7103 14.5551C54.2018 13.1042 56.0666 10.8208 56.9571 8.13036C54.6189 9.48527 52.0554 10.4348 49.3835 10.9485C47.5888 9.07874 45.2099 7.83872 42.6168 7.4212C40.0236 7.00368 37.3614 7.43205 35.0441 8.63971C32.7267 9.84736 30.8841 11.7666 29.8026 14.0992C28.7211 16.4317 28.4613 19.0468 29.0637 21.5379C24.322 21.3065 19.6832 20.1067 15.4486 18.0164C11.214 15.9261 7.47822 12.9921 4.48378 9.40475C3.42385 11.1774 2.86685 13.1925 2.86983 15.2437C2.86983 19.2695 4.97424 22.8262 8.17362 24.9085C6.28025 24.8505 4.42855 24.3526 2.77288 23.4564V23.6008C2.77345 26.2821 3.72633 28.8806 5.46996 30.9558C7.2136 33.0311 9.64067 34.4553 12.3397 34.9871C10.582 35.4509 8.73909 35.5192 6.95033 35.187C7.7113 37.4949 9.19448 39.5133 11.1922 40.9596C13.1899 42.4059 15.6021 43.2077 18.0911 43.2526C15.6174 45.1443 12.785 46.5427 9.75587 47.3678C6.72673 48.193 3.56026 48.4287 0.4375 48.0615C5.88871 51.475 12.2344 53.2871 18.7156 53.2812C40.6522 53.2812 52.6485 35.5868 52.6485 20.2413C52.6485 19.7415 52.6342 19.2362 52.6114 18.742C54.9464 17.0988 56.9617 15.0632 58.5625 12.731L58.5596 12.7282Z" fill="#0192FF"/>
</g>
<defs>
<clipPath id="clip0_1988_6129">
<rect width="58.125" height="58.125" fill="white" transform="translate(0.4375)"/>
</clipPath>
</defs>
</svg></span
    ></a>
    <a
      v-if="$store.state.siteInfo['instagram']"
      :href="$store.state.siteInfo['instagram']"
      ><span ><svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
<g clip-path="url(#clip0_1988_6133)">
<path d="M29.2188 4.84375C35.799 4.84375 36.62 4.86797 39.2017 4.98906C41.781 5.11016 43.5369 5.51461 45.082 6.11523C46.6805 6.73039 48.027 7.56352 49.3736 8.90766C50.6051 10.1183 51.558 11.5828 52.166 13.1992C52.7642 14.742 53.1711 16.5002 53.2922 19.0795C53.406 21.6612 53.4375 22.4823 53.4375 29.0625C53.4375 35.6427 53.4133 36.4637 53.2922 39.0455C53.1711 41.6248 52.7642 43.3806 52.166 44.9258C51.5598 46.543 50.6066 48.0079 49.3736 49.2173C48.1626 50.4484 46.6982 51.4013 45.082 52.0098C43.5393 52.608 41.781 53.0148 39.2017 53.1359C36.62 53.2498 35.799 53.2812 29.2188 53.2812C22.6385 53.2812 21.8175 53.257 19.2358 53.1359C16.6565 53.0148 14.9006 52.608 13.3555 52.0098C11.7384 51.403 10.2737 50.4499 9.06391 49.2173C7.83216 48.0069 6.87921 46.5423 6.27148 44.9258C5.67086 43.383 5.26641 41.6248 5.14531 39.0455C5.03148 36.4637 5 35.6427 5 29.0625C5 22.4823 5.02422 21.6612 5.14531 19.0795C5.26641 16.4978 5.67086 14.7444 6.27148 13.1992C6.87753 11.5818 7.8307 10.1169 9.06391 8.90766C10.274 7.67548 11.7387 6.72247 13.3555 6.11523C14.9006 5.51461 16.6541 5.11016 19.2358 4.98906C21.8175 4.87523 22.6385 4.84375 29.2188 4.84375ZM29.2188 16.9531C26.0071 16.9531 22.9271 18.2289 20.6561 20.4999C18.3852 22.7708 17.1094 25.8509 17.1094 29.0625C17.1094 32.2741 18.3852 35.3542 20.6561 37.6251C22.9271 39.8961 26.0071 41.1719 29.2188 41.1719C32.4304 41.1719 35.5104 39.8961 37.7814 37.6251C40.0523 35.3542 41.3281 32.2741 41.3281 29.0625C41.3281 25.8509 40.0523 22.7708 37.7814 20.4999C35.5104 18.2289 32.4304 16.9531 29.2188 16.9531ZM44.9609 16.3477C44.9609 15.5448 44.642 14.7747 44.0743 14.207C43.5065 13.6393 42.7365 13.3203 41.9336 13.3203C41.1307 13.3203 40.3607 13.6393 39.7929 14.207C39.2252 14.7747 38.9062 15.5448 38.9062 16.3477C38.9062 17.1506 39.2252 17.9206 39.7929 18.4883C40.3607 19.056 41.1307 19.375 41.9336 19.375C42.7365 19.375 43.5065 19.056 44.0743 18.4883C44.642 17.9206 44.9609 17.1506 44.9609 16.3477ZM29.2188 21.7969C31.1457 21.7969 32.9938 22.5624 34.3563 23.9249C35.7189 25.2875 36.4844 27.1355 36.4844 29.0625C36.4844 30.9895 35.7189 32.8375 34.3563 34.2001C32.9938 35.5626 31.1457 36.3281 29.2188 36.3281C27.2918 36.3281 25.4437 35.5626 24.0812 34.2001C22.7186 32.8375 21.9531 30.9895 21.9531 29.0625C21.9531 27.1355 22.7186 25.2875 24.0812 23.9249C25.4437 22.5624 27.2918 21.7969 29.2188 21.7969Z" fill="#0192FF"/>
</g>
<defs>
<clipPath id="clip0_1988_6133">
<rect width="58.125" height="58.125" fill="white" transform="translate(0.15625)"/>
</clipPath>
</defs>
</svg></span
    ></a>
    <a
      v-if="$store.state.siteInfo['whatsapp']"
      :href="$store.state.siteInfo['whatsapp']"
      ><span >
        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
<g clip-path="url(#clip0_1988_6137)">
<path d="M5.72847 53.2812L9.00284 41.2493C6.84529 37.5508 5.71175 33.3443 5.71878 29.0625C5.71878 15.6865 16.5615 4.84375 29.9375 4.84375C43.3135 4.84375 54.1562 15.6865 54.1562 29.0625C54.1562 42.4385 43.3135 53.2812 29.9375 53.2812C25.6575 53.2881 21.4529 52.1555 17.7555 49.9996L5.72847 53.2812ZM21.197 17.6991C20.8842 17.7185 20.5786 17.8008 20.2985 17.9412C20.0357 18.09 19.7959 18.276 19.5864 18.4934C19.2958 18.7671 19.1311 19.0044 18.9543 19.2345C18.0592 20.3994 17.5778 21.8294 17.586 23.2984C17.5908 24.4851 17.9008 25.6404 18.3852 26.7205C19.3757 28.9051 21.0056 31.2179 23.1587 33.3613C23.677 33.8772 24.1831 34.3954 24.7281 34.8774C27.4003 37.2302 30.5848 38.9269 34.0281 39.8326L35.4061 40.0433C35.8542 40.0675 36.3022 40.0336 36.7527 40.0118C37.458 39.9754 38.1467 39.7844 38.7701 39.4523C39.1721 39.2392 39.361 39.1326 39.6977 38.9195C39.6977 38.9195 39.8018 38.8517 40.0004 38.7015C40.3274 38.4594 40.5284 38.2874 40.7996 38.004C41.0006 37.7958 41.175 37.5512 41.3082 37.2726C41.4971 36.8779 41.686 36.1247 41.7635 35.4974C41.8216 35.0179 41.8047 34.7563 41.7974 34.594C41.7877 34.3349 41.5722 34.0661 41.3373 33.9522L39.9277 33.3201C39.9277 33.3201 37.8207 32.4022 36.5347 31.8162C36.3991 31.757 36.2538 31.7234 36.106 31.7169C35.9403 31.6998 35.7729 31.7185 35.615 31.7715C35.4571 31.8246 35.3124 31.9108 35.1906 32.0244V32.0196C35.1784 32.0196 35.0162 32.1576 33.2652 34.2792C33.1647 34.4142 33.0262 34.5163 32.8675 34.5724C32.7088 34.6285 32.5369 34.636 32.3739 34.594C32.2161 34.5518 32.0615 34.4984 31.9113 34.4342C31.611 34.3083 31.5069 34.2598 31.301 34.1702L31.2889 34.1654C29.9034 33.5604 28.6206 32.7434 27.4866 31.7435C27.1814 31.4771 26.8981 31.1865 26.6074 30.9055C25.6546 29.9931 24.8242 28.9608 24.1371 27.8346L23.9942 27.6045C23.8916 27.4499 23.8086 27.2831 23.7472 27.108C23.6552 26.752 23.8949 26.4662 23.8949 26.4662C23.8949 26.4662 24.4835 25.822 24.7571 25.4733C24.985 25.1834 25.1976 24.8819 25.3941 24.5699C25.6799 24.1098 25.7695 23.6375 25.6193 23.2718C24.9412 21.6152 24.2388 19.9659 23.5171 18.3287C23.3742 18.0042 22.9504 17.7717 22.5653 17.7257C22.4346 17.7112 22.3038 17.6966 22.173 17.6869C21.8477 17.6708 21.5218 17.674 21.197 17.6966V17.6991Z" fill="#0192FF"/>
</g>
<defs>
<clipPath id="clip0_1988_6137">
<rect width="58.125" height="58.125" fill="white" transform="translate(0.875)"/>
</clipPath>
</defs>
</svg>
      </span
    ></a>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import JournalistsCard from "@/components/cards/JournalistsCard.vue";

export default {
  data() {
    return {
      showAll: false,
      telegram: require("@/assets/svg/telegram.svg?raw"),
      facebook: require("@/assets/svg/facebook.svg?raw"),
      twitter: require("@/assets/svg/twitter.svg?raw"),
      instagram: require("@/assets/svg/instagram.svg?raw"),
      whatsapp: require("@/assets/svg/whatsapp.svg?raw"),
    };
  },

  async asyncData({ store, params, i18n }) {
    const [journalistsData] = await Promise.all([
      store.dispatch("fetchJournalists/getJournalists", {
        params: { last_news: true, page_size: 3 },
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const journalists = journalistsData.results;
    return { journalists };
  },
  components: { JournalistsCard },
};
</script>
<style lang="css">
@import "@/assets/css/pages/news-menu-page.css";
.journalists_container {
  margin-top: 16px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.journalists-page-title {
  color: var(--white_ffffff, #051769);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
}
.journalists-page-title span {
  color: var(--blue_0192FF, #6974a5);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-left: 13px;
}
.journalists-page {
  padding-top: 40px;
}
@media (max-width: 992px) {
  .journalists_container {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .journalists-page-title {
    font-size: 22px;
    font-weight: 600;
    line-height: 150%; /* 33px */
  }
  .journalists-page {
    padding-top: 20px;
  }
}
@media (max-width: 768px) {
  .journalists_container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 576px) {
  .journalists-page-title {
    font-size: 19px;
    font-weight: 600;
    line-height: 170%;
  }
  .journalists-page-title span {
    font-size: 19px;
  }
  .journalists_container {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
}
@media (max-width: 420px) {
  .journalists_container {
    margin-top: 0;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  .journalists-page-title {
    display: none;
  }
}
</style>
