<template lang="html">
  <div class="footer">
    <div class="container_xl">
      <div class="footer-container">
        <div class="footer-logo">
          <span v-html="$store.state.theme ? logo : darkLogo"></span>
        </div>
        <div class="footer-body">
          <div class="footer-info">
            <h6>
              {{ $store.state.translations["main.footer_text"] }}
            </h6>
            <p>
              {{ $store.state.translations["main.footer_number"] }}:
              <span>1263</span>
            </p>
            <p>
              {{ $store.state.translations["main.footer_adress"] }}:
              <span>{{ $store.state.siteInfo["adres"] }}</span>
            </p>
            <p>
              {{ $store.state.translations["main.footer_email"] }}:
              <a :href="`mailto:${$store.state.siteInfo['email']}`">{{
                $store.state.siteInfo["email"]
              }}</a>
            </p>
          </div>
          <div class="footer-menu">
            <ul>
              <!-- <li v-for="category in categories.slice(0, 4)" :key="category?.id">
                <nuxt-link :to="localePath('/')">{{ category?.title }}</nuxt-link>
              </li> -->
              <li v-for="category in categories.slice(0, 4)" :key="category?.id">
                <a-dropdown :trigger="['click']" v-if="category?.children?.length > 0">
                  <a class="" @click="(e) => e.preventDefault()">
                    {{ category?.title }} <span v-html="drop"></span>
                  </a>
                  <a-menu slot="overlay" class="dropdown-board">
                    <a-menu-item
                      :key="index"
                      v-for="(child, index) in category?.children"
                    >
                      <nuxt-link :to="localePath(`/news-menu/${child?.slug}`)">{{
                        child?.title
                      }}</nuxt-link>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
                <nuxt-link v-else :to="localePath(`/news-menu/${category?.slug}`)">
                  {{ category?.title }}</nuxt-link
                >
              </li>
              <!-- <li>Xorij</li>
              <li>{{ $store.state.translations["main.analysis"] }}</li>
              <li>O’zgacha rakurs</li> -->
            </ul>
            <ul>
              <li
                v-for="category in categories.slice(4, 6)"
                :key="category?.id"
                @click="$router.push(`/news-menu/${category?.slug}`)"
              >
                {{ category?.title }}
              </li>
              <!-- <li>Mehnat huquqi</li> -->
              <li @click="$router.push(`/library`)">
                {{ $store.state.translations["main.library"] }}
              </li>
              <li @click="$router.push(`/library`)">
                {{ $store.state.translations["main.others"] }}
              </li>
            </ul>
            <ul>
              <li @click="$router.push(localePath('/about-site'))">
                {{ $store.state.translations["main.about_site"] }}
              </li>
              <li>{{ $store.state.translations["main.reklama"] }}</li>
              <li>{{ $store.state.translations["main.contact"] }}</li>
              <li @click="$router.push(localePath('/about'))">
                {{ $store.state.translations["main.about_us"] }}
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-messangers">
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
    <div class="footer-bottom">
      <div class="container_xl">
        <p>{{ $store.state.translations["main.footerBottom_text"] }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["categories"],
  data() {
    return {
      logo: require("../../assets/svg/logo.svg?raw"),
      darkLogo: require("../../assets/svg/dark-logo.svg?raw"),
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      drop: require("../../assets/svg/dropdown.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.footer {
  padding-top: 36px;
  border-top: 1px solid var(--footer_border_top);
  background: var(--footer_bg);
}
.footer-logo {
  margin-bottom: 30px;
}
.footer-logo span svg {
  height: 26px;
  width: 170px;
}
.footer-body {
  display: flex;
  justify-content: space-between;
}

.footer-info h6 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: var(--footer_subtitle);
}
.footer-info {
  max-width: 555px;
}
.footer-info p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #707070;
  padding-top: 11px;
}
.footer-info p span {
  color: var(--text_color);
}
.footer-menu {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.footer-menu ul li a,
.footer-menu ul li {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: uppercase;
  color: var(--text_color);
  margin-bottom: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.footer-menu ul li:hover {
  color: var(--blue_0192FF);
}
.footer-menu ul li a span {
  margin-left: 14px;
}
.footer-menu ul li a span svg path {
  fill: #9ba2c3;
}
.footer-bottom p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--text_color);
}
.footer-bottom {
  border-top: 1px solid var(--footer_border_top);
  padding-top: 16px;
  padding-bottom: 16px;
  background: var(--body_color);
}
.footer-messangers {
  padding-top: 50px;
  padding-bottom: 66px;
}
.footer-messangers span svg path {
  fill: var(--footer_messangers);
}
.footer-messangers a {
  margin-right: 30px;
}
@media screen and (max-width: 1024px) {
  .footer-body {
    flex-direction: column;
  }
}
</style>
