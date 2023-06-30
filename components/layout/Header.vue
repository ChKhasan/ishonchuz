<template lang="html">
  <div>
    <div class="header">
      <HeaderBanner :banners="banners" />
      <div class="container_xl">
        <div class="header-container">
          <div class="logo_block">
            <nuxt-link :to="localePath('/')" class="header-logo">
              <span v-html="$store.state.theme ? logo : darkLogo"></span>
            </nuxt-link>
          </div>
          <ul class="currency-list">
            <h6>{{ $store.state.translations["main.currency"] }} UZS</h6>
            <li>
              USD
              <p>11 418.11 <span>7.94</span></p>
            </li>
            <li>
              EUR
              <p>12 460.11 <span>16.94</span></p>
            </li>
            <li>
              RUB
              <p>139.11 <span>-0.43</span></p>
            </li>
          </ul>

          <div class="color-switch">
            <span
              v-html="sun"
              @click="$store.commit('changeTheme', true)"
              :class="{ 'active-color': $store.state.theme }"
            ></span>
            <span
              v-html="moon"
              @click="$store.commit('changeTheme', false)"
              :class="{ 'active-color': !$store.state.theme }"
            ></span>
          </div>
          <div class="weather-drop">
            <span v-html="cloud"></span>
            <p>+20C Toshkent</p>
            <span v-html="drop"></span>
          </div>
          <ul class="header-lang">
            <li
              :class="{ 'active-lang': $i18n.locale == lang.code }"
              v-for="lang in locales"
              :key="lang.id"
              @click="$router.push(switchLocalePath(lang.code))"
            >
              {{ lang.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MenuList :categories="categories" />
    <div class="to_top_btn" v-show="scY > 300" @click="toTop">
      <span v-html="drop"></span>
    </div>
  </div>
</template>
<script>
import MenuList from "./menu-list.vue";
import HeaderBanner from "./HeaderBanner.vue";
export default {
  props: ["categories", "currency", "banners"],
  data() {
    return {
      scTimer: 0,
      scY: 0,
      logo: require("../../assets/svg/logo.svg?raw"),
      darkLogo: require("../../assets/svg/dark-logo.svg?raw"),
      sun: require("../../assets/svg/sun.svg?raw"),
      moon: require("../../assets/svg/moon.svg?raw"),
      cloud: require("../../assets/svg/cloud.svg?raw"),
      drop: require("../../assets/svg/dropdown.svg?raw"),
      locales: [
        { id: 1, code: "oz", name: "O'z" },
        {
          id: 2,
          code: "uz",
          name: "Уз",
        },
        {
          id: 3,
          code: "ru",
          name: "Ру",
        },
      ],
      color: true,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
    },
  },
  components: {
    MenuList,
    HeaderBanner,
  },
};
</script>
<style lang="css">
.to_top_btn {
  display: flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.to_top_btn:hover {
  -webkit-animation: swing 0.5s ease;
  animation: swing 0.5s ease;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
@keyframes swing {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  33% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  66% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.to_top_btn svg {
  fill: var(--blue_0192FF, #0192ff);
  transform: rotate(180deg);
  width: 20px;
  height: 30px;
}
.to_top_btn svg path {
  fill: var(--blue_0192FF, #0192ff);
}
.header {
  background: var(--header_bg);
}
.weather-drop {
  display: flex;
}
.weather-drop p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--gray_f9f9f9, #000000);
  margin: 0 10px;
}
.color-switch {
  padding: 3px;
  background: var(--body_color);
  border-radius: 26px;
  display: flex;
}
.color-switch span:first-child svg path {
  fill: var(--gray_B4B9D2, #0192ff);
}
.color-switch span:last-child svg path {
  fill: var(--blue_0192FF, #b4b9d2);
}
.color-switch span {
  width: 34px;
  border-radius: 50%;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  cursor: pointer;
}
.color-switch span:last-child {
  margin-right: 0;
}
.active-color {
  background: #e6f4ff;
  pointer-events: none;
}
.header-logo svg path {
  /* fill: #041769; */
}
.header-container {
  display: flex;
  justify-content: space-between;
  max-height: 75px;
  padding: 22px 0;
  display: flex;
  align-items: center;
}
.currency-list {
  display: flex;
}
.currency-list li {
  display: flex;
  padding: 0 20px;
  border-right: 1px solid #a0a0a0;
}
.currency-list li:last-child {
  border-right: none;
}
.header-lang {
  display: flex;
}
.currency-list h6 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--text_color_nav);
}
.currency-list li p {
  font-family: var(--ROBOTO_SERIF);
  /* font-style: italic; */
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #a0a0a0;
  margin-left: 7px;
}
.currency-list li {
  font-family: var(--ROBOTO_SERIF);
  /* font-style: italic; */
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--text_color_nav);
}
.currency-list li p span {
  font-family: var(--ROBOTO_SERIF);
  /* font-style: italic; */
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #00c008;
  margin-left: 13px;
}
.header-lang {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 19px;
}
.header-lang li {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 130%;
  color: #a0a0a0;
  cursor: pointer;
}
.active-lang {
  color: #0192ff !important;
}
</style>
