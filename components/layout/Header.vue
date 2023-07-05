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
              <p>
                {{
                  currency
                    ?.find((item) => item["Ccy"] == "USD")
                    ["Rate"].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}<span
                  :class="{
                    currency__down: currency
                      ?.find((item) => item['Ccy'] == 'USD')
                      ['Diff'].includes('-'),
                  }"
                  >{{ currency?.find((item) => item["Ccy"] == "USD")["Diff"] }}</span
                >
              </p>
            </li>
            <li>
              EUR
              <p>
                {{
                  currency
                    ?.find((item) => item["Ccy"] == "EUR")
                    ["Rate"].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}<span
                  :class="{
                    currency__down: currency
                      ?.find((item) => item['Ccy'] == 'EUR')
                      ['Diff'].includes('-'),
                  }"
                  >{{ currency?.find((item) => item["Ccy"] == "EUR")["Diff"] }}</span
                >
              </p>
            </li>
            <li>
              RUB
              <p>
                {{
                  currency
                    ?.find((item) => item["Ccy"] == "RUB")
                    ["Rate"].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}<span
                  :class="{
                    currency__down: currency
                      ?.find((item) => item['Ccy'] == 'RUB')
                      ['Diff'].includes('-'),
                  }"
                  >{{ currency?.find((item) => item["Ccy"] == "RUB")["Diff"] }}</span
                >
              </p>
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
          <div class="weather-drop" @click="visible = true">
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
    <MenuList :categories="categories" :columnist="columnist" />
    <div class="to_top_btn" v-show="scY > 300" @click="toTop">
      <span v-html="drop"></span>
    </div>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visible"
      centered
      :closable="false"
      width="858px"
      @ok="handleOk"
    >
      <div class="weather__container">
        <div class="weather__body">
          <div class="weather__current">
            <div class="weather__currentText">
              <h4>Tashkent</h4>
              <p>yakshanba, 15-mart</p>
              <h1><span>+20</span>C</h1>
            </div>
            <div class="weather__currentSvg">
              <span v-html="lightSun"></span>
            </div>
          </div>
          <div class="weather__time">
            <ul>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
              <li>
                Hozir
                <p><span>+20</span> C</p>
                <span v-html="lightSun"></span>
              </li>
            </ul>
          </div>
          <div class="weather__days">
            <ul>
              <li>
                Dushanba, 16
                <span v-html="lightSun"></span>
                <p><span>+20</span> <span>+20</span></p>
              </li>
            </ul>
            <ul>
              <li>
                Dushanba, 16
                <span v-html="lightSun"></span>
                <p><span>+20</span> <span>+20</span></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="weather__list"></div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import MenuList from "./menu-list.vue";
import HeaderBanner from "./HeaderBanner.vue";
export default {
  props: ["categories", "currency", "banners", "columnist"],
  data() {
    return {
      scTimer: 0,
      scY: 0,
      visible: false,
      logo: require("../../assets/svg/logo.svg?raw"),
      lightSun: require("../../assets/svg/light-sun.svg?raw"),
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
    handleOk() {
      this.visible = true;
    },
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
  background: var(--gray_292929, #ffffff);
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
.weather__container {
  height: 400px;
  background: #ffffff;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 260px;
}
.weather__current div h4 {
  color: var(--dark-blue-80, #374587);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
}
.weather__current div p {
  color: var(--dark-blue-80, #374587);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
}
.weather__current div h1 {
  color: var(--light-bue-100, #0192ff);
  font-size: 80px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
}
.weather__current div h1 span {
  position: relative;
  margin-right: 36px;
}
.weather__current div h1 span::after {
  content: "o";
  position: absolute;
  top: -4px;
  right: -5px;
  width: 5px;
  height: 5px;
  font-size: 46px;
  font-weight: 600;
  line-height: 150%;
}
.weather__current {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.weather__currentSvg {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.weather__current div svg {
  width: 166px;
  height: 166px;
}
.weather__time {
  padding: 10px 13px;
  border-radius: 12px;
  background: var(--black-1, #f9f9f9);
}
.weather__time ul {
  display: flex;
  justify-content: space-between;
}
.weather__time ul li {
  color: var(--dark-blue-80, #374587);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  display: flex;
  flex-direction: column;
}
.weather__time ul li p,
.weather__time ul li p span {
  color: var(--dark-blue-100, #051769);
  font-size: 16px;
  line-height: 150%;
  position: relative;
}
.weather__time ul li p span {
  padding-right: 3px;
}
.weather__time ul li p span::after {
  content: "o";
  position: absolute;
  color: var(--dark-blue-100, #051769);
  font-size: 12px;
  line-height: 150%;
  top: -4px;
  right: -2px;
  width: 5px;
  height: 5px;
}
.weather__days {
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--black-1, #f9f9f9);
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.weather__days ul {
  display: flex;
  flex-direction: column;
}
.weather__days ul:first-child {
  padding-right: 25px;
  border-right: 1px solid #e7e7e7;
}
.weather__days ul:last-child {
  padding-left: 25px;
}
.weather__days ul li {
  color: var(--black-80, #292929);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.weather__days ul li p {
  color: var(--dark-blue-80, #374587);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
.weather__days ul li p span {
  position: relative;
  margin-right: 6px;
}
.weather__days ul li p span::after {
  content: "o";
  position: absolute;
  color: var(--dark-blue-80, #374587);
  font-size: 12px;
  font-family: var(--ROBOTO_SERIF);
  top: -7px;
  right: -5px;
  width: 5px;
  height: 5px;
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
  cursor: pointer;
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
.currency__down {
  color: #c02600 !important;
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
