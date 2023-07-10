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
          <ul class="currency-list currency-list__web">
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

          <div class="color-switch color-switch__web">
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
          <div class="weather-drop weather-drop__web1" @click="visible = true">
            <span>
              <img :src="currentWeather(0)[0]?.image" alt="" />
            </span>
            <p>
              {{
                currentWeather(0)[0]?.temp > 0
                  ? `+${currentWeather(0)[0]?.temp}`.split(".")[0]
                  : `${currentWeather(0)[0]?.temp}`.split(".")[0]
              }}C {{ regions.find((item) => item.value == activeRegion)?.name }}
            </p>
            <span v-html="drop"></span>
          </div>
          <div class="weather-drop__container">
            <div class="color-switch color-switch__web1">
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
            <div class="weather-drop weather-drop__web2" @click="visible = true">
              <span>
                <img :src="currentWeather(0)[0]?.image" alt="" />
              </span>
              <p>
                {{
                  currentWeather(0)[0]?.temp > 0
                    ? `+${currentWeather(0)[0]?.temp}`.split(".")[0]
                    : `${currentWeather(0)[0]?.temp}`.split(".")[0]
                }}C {{ regions.find((item) => item.value == activeRegion)?.name }}
              </p>
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
    </div>
    <MenuList
      :categories="categories"
      :columnist="columnist"
      :currency="currency"
      :weather="weather"
      :regions="regions"
    />
    <div class="to_top_btn" v-show="scY > 300" @click="toTop">
      <span v-html="drop"></span>
    </div>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visible"
      centered
      class="weather__modal"
      :closable="false"
      width="858px"
      @ok="handleOk"
    >
      <div class="weather__container">
        <div class="weather__body">
          <div class="weather__spin" v-if="loading">
            <a-spin />
          </div>
          <div class="weather__current__mobile">
            <div class="weather__current">
              <div class="weather__currentText">
                <h4>{{ regions.find((item) => item.value == activeRegion)?.name }}</h4>
                <p>
                  {{ weeks[moment(currentWeather(0)[0]?.time).format("dddd")] }},
                  {{ moment(currentWeather(0)[0]?.time).format("DD-MMMM") }}
                </p>
                <h1>
                  <span>{{
                    currentWeather(0)[0]?.temp > 0
                      ? `+${currentWeather(0)[0]?.temp}`.split(".")[0]
                      : `${currentWeather(0)[0]?.temp}`.split(".")[0]
                  }}</span
                  >C
                </h1>
              </div>
              <div class="weather__currentSvg">
                <span>
                  <img :src="currentWeather(0)[0]?.image" alt="" />
                </span>
              </div>
            </div>
            <div class="weather_dropdown__container">
              <div class="weather_dropdown" @click="weatherDrop = !weatherDrop">
                <h2>Toshkent</h2>
                <span v-html="drop" :class="{ rotate180: weatherDrop }"></span>
              </div>
              <Transition name="weather_drop_anim">
                <div class="weather_dropdown__body" v-if="weatherDrop">
                  <div class="weather__list">
                    <h3>Hududlar</h3>
                    <ul>
                      <li
                        v-for="(region, index) in regions"
                        :key="index"
                        :class="{ region__active: activeRegion == region.value }"
                        @click="currentRegionChange(region)"
                      >
                        {{ region.name }} <span></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div class="weather__time">
            <ul>
              <li v-for="time in currentWeather(0)">
                {{
                  moment(time?.time).format("HH") == moment(thisTime).format("HH")
                    ? "Hozir"
                    : moment(time?.time).format("HH:mm")
                }}
                <p>
                  <span>{{
                    time?.temp > 0
                      ? `+${time?.temp}`.split(".")[0]
                      : `${time?.temp}`.split(".")[0]
                  }}</span>
                  C
                </p>
                <span>
                  <img :src="time?.image" alt="" />
                </span>
              </li>
            </ul>
          </div>
          <div class="weather__days">
            <ul>
              <li v-for="(day, index) in otherDays">
                {{ weeks[moment(currentWeather(index)[0]?.time).format("dddd")] }},
                {{ moment(currentWeather(index)[0]?.time).format("DD") }}
                <div class="weather__info">
                  <span> <img :src="currentWeather(index)[0]?.image" alt="" /></span>
                  <p>
                    <span>{{
                      currentWeather(index)[0]?.temp > 0
                        ? `+${currentWeather(index)[0]?.temp}`.split(".")[0]
                        : `${
                            currentWeather(index)[currentWeather(index).length - 1]?.temp
                          }`.split(".")[0]
                    }}</span>
                    <span>+20</span>
                  </p>
                </div>
              </li>
            </ul>
            <ul>
              <li v-for="(day, index) in otherDays">
                {{ weeks[moment(currentWeather(index + 4)[0]?.time).format("dddd")] }},
                {{ moment(currentWeather(index + 4)[0]?.time).format("DD") }}
                <div class="weather__info">
                  <span> <img :src="currentWeather(index + 4)[0]?.image" alt="" /></span>
                  <p>
                    <span>{{
                      currentWeather(index + 4)[0]?.temp > 0
                        ? `+${currentWeather(index)[0]?.temp}`.split(".")[0]
                        : `${
                            currentWeather(index)[currentWeather(index).length - 1]?.temp
                          }`.split(".")[0]
                    }}</span>
                    <span>+20</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="weather__list weather__list__web">
          <h3>Hududlar</h3>
          <ul>
            <li
              v-for="(region, index) in regions"
              :key="index"
              :class="{ region__active: activeRegion == region.value }"
              @click="currentRegionChange(region)"
            >
              {{ region.name }} <span></span>
            </li>
          </ul>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import MenuList from "./menu-list.vue";
import HeaderBanner from "./HeaderBanner.vue";
import moment from "moment";
export default {
  props: ["categories", "currency", "banners", "columnist"],
  data() {
    return {
      weather: {},
      weatherDrop: false,
      loading: false,
      weeks: {
        Monday: "Dushanba",
        Tuesday: "Seshanba",
        Wednesday: "Chorshanba",
        Thursday: "Payshanba",
        Friday: "Juma",
        Saturday: "Shanba",
        Sunday: "Yakshanba",
      },
      regions: [
        {
          name: "Toshkent Shahar",
          value: "toshkentSh",
          lat: 41.311081,
          lon: 69.240562,
        },
        {
          name: "Andijon",
          value: "andijon",
          lat: 40.77408090036615,
          lon: 72.5355339,
        },
        {
          name: "Namangan",
          value: "namangan",
          lat: 41.00362870039255,
          lon: 71.26119519999999,
        },
        {
          name: "Sirdaryo",
          value: "sirdaryo",
          lat: 40.50184730033293,
          lon: 68.7426643,
        },
        {
          name: "Surxandaryo",
          value: "surxandaryo",
          lat: 37.95208429997525,
          lon: 67.12659959999999,
        },
        {
          name: "Qashqadaryo",
          value: "qashqadaryo",
          code: "qashqadaryo",
          lat: 38.563939700062676,
          lon: 65.5311095,
        },
        {
          name: "Xorazm",
          value: "xorazm",
          lat: 41.29028350042324,
          lon: 60.542853699999995,
        },
        {
          name: "Navoiy",
          value: "navoiy",
          lat: 42.00000000048624,
          lon: 63.999999999999986,
        },
        {
          name: "Buxoro",
          value: "buxoro",
          lat: 40.22936600029793,
          lon: 63.54705839999999,
        },

        {
          name: "Qoraqaplog’iston",
          value: "qoraqaplogiston",
          lat: 43.77388410053869,
          lon: 57.6234617,
        },
        {
          name: "Farg’ona",
          value: "fargona",
          lat: 40.5000000003327,
          lon: 71.24999999999999,
        },
        {
          name: "Toshkent vil.",
          value: "toshkentvil",
          lat: 41.04968150039766,
          lon: 69.3711365,
        },
        {
          name: "Jizzax",
          value: "Jizzax",
          lat: 40.33190950031129,
          lon: 67.4551198,
        },
      ],
      otherDays: [1, 2, 3, 4],
      scTimer: 0,
      activeRegion: "toshkentSh",
      thisTime: new Date(),
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
  async fetch() {
    const [weatherData] = await Promise.all([
      this.$store.dispatch("fetchWeather/getWeathers", {
        params: {
          lat: 41.25,
          lon: 69.25,
        },
        headers: {
          Language: this.$i18n.locale,
        },
      }),
    ]);
    this.weather = weatherData;
  },
  methods: {
    currentRegionChange(region) {
      this.activeRegion = region.value;
      this.__GET_WEATHER(region);
    },
    async __GET_WEATHER(region) {
      this.loading = true;
      const data = await this.$store.dispatch("fetchWeather/getWeathers", {
        params: {
          lat: region.lat,
          lon: region.lon,
        },
        headers: {
          Language: this.$i18n.locale,
        },
      });
      this.loading = false;
      this.weather = data;
    },
    currentWeather(index) {
      const currentW = this.weather[Object.keys(this.weather)[index]].filter(
        (item) => moment(item?.time).format("HH") >= moment(this.thisTime).format("HH")
      );
      return currentW;
    },
    moment,
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
  /* height: 400px; */
  border-radius: 16px;
  background: var(--black_000000, #ffffff);
  padding: 20px;
  display: grid;
  grid-template-columns: 540px 1fr;
  grid-gap: 20px;
}
.weather__current div h4 {
  color: var(--white_ffffff, #374587);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
}
.weather__current div p {
  color: var(--white_ffffff, #374587);
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
.weather_dropdown {
  display: none;
  position: relative;
}
.weather_dropdown__body {
  position: absolute;
  top: 100%;
  /* background: red; */
  /* padding: 12px 24px; */
  border-radius: 12px;
  z-index: 100;
  width: 100%;
  display: none;
}
.weather__info {
  display: flex;
  align-items: center;
  gap: 3px;
}
.weather__body {
  position: relative;
}
.weather__spin {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  position: absolute;
  background: var(--dark_000066, #ffffff66);
  z-index: 1000;
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
.weather-drop__web2 {
  display: none !important;
}

.weather__currentSvg {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.weather__currentSvg img {
  width: 166px;
  height: 166px;
}
.weather__current div svg {
  width: 166px;
  height: 166px;
}
.weather__time {
  padding: 10px 13px;
  border-radius: 12px;
  background: var(--black_111111, #f9f9f9);
}
.weather__time ul {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  overflow-x: scroll;
  width: 100%;
  max-width: 100%;
}
.weather__time ul::-webkit-scrollbar {
  display: none;
}
.weather__time ul li {
  color: var(--gray__9ba2c3, #374587);
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
  white-space: nowrap;
  color: var(--white_ffffff, #051769);
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
  background: var(--black_111111, #f9f9f9);
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.weather__days ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.weather__days ul:first-child {
  padding-right: 25px;
  border-right: 1px solid #e7e7e7;
}
.weather__days ul:last-child {
  padding-left: 25px;
}
.weather__days ul li {
  color: var(--gray__CDD1E1, #292929);
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
  color: var(--white_ffffff, #374587);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
.weather__days ul li img {
  width: 36px;
  height: 36px;
}
.weather__days ul li p span {
  position: relative;
  margin-right: 6px;
}
.weather__days ul li p span::after {
  content: "o";
  position: absolute;
  color: var(--white_ffffff, #374587);
  font-size: 12px;
  font-family: var(--ROBOTO_SERIF);
  top: -7px;
  right: -5px;
  width: 5px;
  height: 5px;
}
.weather__list {
  max-height: 482px;
  padding: 14px;
  border-radius: 12px;
  background: var(--black_111111, #f9f9f9);
  overflow: hidden;
}
.weather__list h3 {
  color: var(--blue_0192FF, #000);
  font-family: var(--ROBOTO_SERIF);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  padding-left: 10px;
  padding-bottom: 10px;
}
.weather__list ul {
  display: flex;
  overflow-y: scroll;
  height: 100%;
  flex-direction: column;

  gap: 4px;
}
.weather__list ul::-webkit-scrollbar {
  display: none;
}
.weather__list ul li {
  padding: 8px 12px 8px 10px;
  color: var(--white_ffffff, #000);
  font-family: var(--ROBOTO_SERIF);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  transition: 0.2s;
}
.weather__list ul li:hover {
  background: var(--gray_292929, #eee);
}
.weather__list ul li span {
  width: 16px;
  height: 16px;
  border: 2px solid #b8b8b8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.region__active span {
  border: 2px solid #0192ff !important;
}
.region__active span::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #0192ff;
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
.weather-drop span svg path {
  fill: var(--white_ffffff, #000);
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
.color-switch__web1 {
  display: none;
}
@media (max-width: 992px) {
  .currency-list__web {
    display: none;
  }
  .header-container {
    padding: 20px 0;
  }
  .color-switch__web {
    display: none;
  }
  .color-switch__web1 {
    display: flex;
  }
  .logo_block svg {
    height: 30px;
  }
  .weather-drop__web2 {
    display: flex !important;
  }
  .weather-drop__container {
    display: flex;
    gap: 26px;
    align-items: center;
  }
  .weather-drop__web1 {
    display: none;
  }
}
@media (max-width: 768px) {
  .weather_dropdown__body {
    display: block;
  }
  .weather__body {
    width: 100%;
    max-width: 100%;
    /* overflow: hidden; */
  }
  .currency-list li:last-child {
    padding-right: 0;
  }
  .weather_dropdown__container {
    display: block;
  }
  .header-lang li {
    font-size: 17px;
  }
  .weather__list__web {
    display: none;
  }
  .weather__list {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  }
  .header-container {
    padding: 13px 0;
  }
  .logo_block svg {
    height: 23px;
    width: 156px;
  }
  .weather__container {
    grid-template-columns: 1fr;
    position: relative;
    display: flex;
  }
  .weather__modal .ant-modal {
    width: 579px !important;
  }
  .weather__current div h4 {
    display: none;
  }
  .weather__current div h1 {
    font-size: 50px;
  }
  .weather__current div h1 span::after {
    font-size: 32px;
  }
  .weather_drop_anim-enter-active {
    animation: weather-drop-anim 0.5s;
  }
  .weather_drop_anim-leave-active {
    animation: weather-drop-anim 0.5s reverse;
  }
  @keyframes weather-drop-anim {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    50% {
      transform: translateY(20px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .weather_dropdown {
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    min-width: 236px;
    border-radius: 8px;
    background: var(--black-1, #f9f9f9);
    padding: 10px;
  }
  .weather_dropdown span svg {
    transition: 0.2s;
  }
  .weather_dropdown span svg path {
    fill: #0192ff;
  }
  .weather_dropdown__container {
    /* margin-left: 40px; */
    /* display: none; */
    position: relative;
    height: 47px;
  }

  .weather_dropdown h2 {
    color: var(--light-bue-100, #0192ff);
    font-family: var(--ROBOTO_SERIF);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    text-transform: uppercase;
  }
  .weather__current {
    display: flex;
  }
  .weather__currentSvg img {
    width: 100px;
    height: 100px;
    margin-left: 16px;
  }
  .weather__current__mobile {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
  }
}
@media (max-width: 858px) {
  .weather__modal .ant-modal {
    width: 100% !important;
  }
}
@media (max-width: 576px) {
  .weather__modal .ant-modal {
    width: 100% !important;
  }
  .weather__currentSvg img {
    width: 96px;
    height: 96px;
    margin-left: 16px;
  }
}
@media (max-width: 360px) {
  .weather__modal {
    display: none !important;
  }
}
</style>
