<template lang="html">
  <div class="menu-list" id="navbar" ref="navScroll">
    <div class="container_xl">
      <div class="menu-list-container">
        <ul>
          <li class="menu-list__web1" v-for="category in categories" :key="category?.id">
            <a-dropdown :trigger="['click']" v-if="category?.children?.length > 0">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ category?.title }} <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item :key="index" v-for="(child, index) in category?.children">
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
          <li
            class="menu-list__web2"
            v-for="category in categories.slice(0, 3)"
            :key="category?.id"
          >
            <a-dropdown :trigger="['click']" v-if="category?.children?.length > 0">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ category?.title }} <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item :key="index" v-for="(child, index) in category?.children">
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
          <li
            class="menu-list__web3"
            v-for="category in categories
              .slice(0, 3)
              .filter((item) => item.children.length > 0)"
            :key="category?.id"
          >
            <a-dropdown :trigger="['click']" v-if="category?.children?.length > 0">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ category?.title }} <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item :key="index" v-for="(child, index) in category?.children">
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
          <!-- <li>Xorij <span v-html="drop"></span></li>
          <li @click="$router.push('/news-menu')">{{$store.state.translations['main.analysis']}}</li>
          <li>O'zgacha rakurs</li>
          <li>Madaniyat va ma'rifat</li>
          <li>Mehnat huquqi</li> -->
          <li>
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ $store.state.translations["main.library"] }}
                <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item key="0">
                  <nuxt-link :to="localePath('/library?type=literature')">{{
                    $store.state.translations["main.literature"]
                  }}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="1">
                  <nuxt-link :to="localePath('/library?type=scientific')">{{
                    $store.state.translations["main.science"]
                  }}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                  <nuxt-link :to="localePath('/library?type=articles')">{{
                    $store.state.translations["main.articles"]
                  }}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="3">
                  <nuxt-link :to="localePath('/library?type=manuals')">{{
                    $store.state.translations["main.kasaba"]
                  }}</nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
          <li>
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ $store.state.translations["main.others"] }}
                <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item key="0">
                  <nuxt-link :to="localePath('/galleries')">{{
                    $store.state.translations["main.new-uzbekistan"]
                  }}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="1">
                  <nuxt-link :to="localePath(`/news-menu/${columnist?.slug}`)">{{
                    columnist?.title
                  }}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                  <a href="https://ishonch.uz/">{{
                    $store.state.translations["main.archive"]
                  }}</a>
                </a-menu-item>
                <a-menu-item key="3">
                  <nuxt-link :to="localePath('/journalists')">{{
                    $store.state.translations["main.journalists"]
                  }}</nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
        </ul>
        <div class="menu-list-btns">
          <div @click="visibleSearch = true"><span v-html="search"></span></div>
          <div
            @click="
              $store.state.auth
                ? $router.push('/profile/personal-info')
                : (visible = true)
            "
          >
            <span v-html="user"></span>
          </div>
          <div class="web__drawer" @click="webDrawer = !webDrawer">
            <span v-if="!webDrawer" v-html="menu"></span>
            <span v-else
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g id="close-line">
                  <path
                    id="Vector"
                    d="M10 8.66671L14.6667 4L16 5.33333L11.3334 10L16 14.6667L14.6667 16L10 11.3334L5.33333 16L4 14.6667L8.66671 10L4 5.33333L5.33333 4L10 8.66671Z"
                    fill="#6974A5"
                  />
                </g></svg
            ></span>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visible"
      centered
      :closable="false"
      width="670px"
      @ok="handleOk"
    >
      <div class="vmodal-container">
        <div class="vmodal-header">
          <h2>Profilga kirish</h2>
          <span @click="handleOk" v-html="mClose"></span>
        </div>
        <div class="vmodal-body">
          <a-form-model ref="ruleFormAuth" :model="form" :rules="rules">
            <a-form-model-item
              class="form-item mb-0 w-100 auth-form"
              label="Номер телефона"
              prop="phone_number"
            >
              <input
                v-mask="'+998 (##) ### ## ##'"
                class="w-100"
                @keyup.enter="onSubmit()"
                v-model="form.phone_number"
                placeholder="+998 (__) ___ __ __"
              />
              <!-- <the-mask
                v-model="form.phone_number"
                class="w-100"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              /> -->
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="vmodal-footer">
          <div class="auth-btn" @click="onSubmit()">Kirish</div>
        </div>
      </div>
    </a-modal>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visibleSms"
      centered
      :closable="false"
      width="670px"
      @ok="handleOkSms"
    >
      <div class="vmodal-container">
        <div class="vmodal-header">
          <h2>Profilga kirish</h2>
          <span @click="handleOkSms" v-html="mClose"></span>
        </div>
        <div class="vmodal-body">
          <a-form-model ref="ruleFormSms" :model="formSms" :rules="rulesSms">
            <div class="modal-form-grid">
              <a-form-model-item class="form-item mb-0 w-100" label="Номер телефона">
                <!-- <the-mask
                  v-model="formSms.phone_number"
                  class="w-100 disabled"
                  :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                  placeholder="+998 (__) ___ __ __"
                /> -->
                <input
                  v-mask="'+998 (##) ### ## ##'"
                  class="w-100"
                  v-model="formSms.phone_number"
                  placeholder="+998 (__) ___ __ __"
                />
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0 w-100 auth-form"
                label="SMS-kod"
                prop="code"
                :class="{
                  sms_code_success: responseTypes.smsCodeSuccess,
                  sms_code_error: responseTypes.smsCodeError,
                }"
              >
                <a-input
                  v-model="formSms.code"
                  class="w-100"
                  placeholder="SMS kodni tering"
                />
                <span
                  class="sms_success_icon"
                  v-if="responseTypes.smsCodeSuccess"
                  v-html="smsSuccess"
                ></span>
                <span
                  class="sms_timer"
                  v-if="!responseTypes.smsCodeError && !responseTypes.smsCodeSuccess"
                  >{{ smsTimer }}</span
                >
                <span class="error_code" v-if="responseTypes.smsCodeError"
                  >Xato kiritildi!</span
                >
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0 w-100"
                label="Name"
                prop="name"
                v-if="responseTypes.userResponse"
              >
                <a-input
                  v-model="formName.full_name"
                  class="w-100"
                  placeholder="Ismingizni kiriting..."
                />
              </a-form-model-item>
            </div>
          </a-form-model>
        </div>
        <div class="vmodal-footer">
          <div class="auth-btn" @click="onSubmitSms()">Kirish</div>
        </div>
      </div>
    </a-modal>
    <!-- <a-modal
      :body-style="{ padding: '0' }"
      v-model="visibleName"
      centered
      :closable="false"
      width="670px"
      @ok="handleOkName"
    >
      <div class="vmodal-container">
        <div class="vmodal-header">
          <h2>Profilga kirish</h2>
          <span @click="handleOkName" v-html="mClose"></span>
        </div>
        <div class="vmodal-body">
          <a-form-model ref="ruleFormName" :model="formName" :rules="rulesName">
            <div class="modal-form-grid">
              <a-form-model-item class="form-item mb-0 w-100" label="Ism" prop="name">
                <the-mask
                  v-model="formName.phone_number"
                  class="w-100"
                  :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                  placeholder="+998 (__) ___ __ __"
                />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-0 w-100" label="SMS-kod" prop="name">
                <a-input
                  v-model="formName.sms"
                  class="w-100"
                  placeholder="SMS kodni tering"
                />
                <span class="error_code">Xato kiritildi!</span>
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0 w-100"
                label="Name"
                prop="name"
                v-if="responseTypes.smsCodeSuccess"
              >
                <a-input
                  v-model="formName.name"
                  class="w-100"
                  placeholder="SMS kodni tering"
                />
              </a-form-model-item>
            </div>
          </a-form-model>
        </div>
        <div class="vmodal-footer">
          <div class="auth-btn" @click="$router.push('/profile/personal-info')">
            Ro’yhattan o’tish
          </div>
        </div>
      </div>
    </a-modal> -->
    <a-modal
      class="search-modal"
      :body-style="{ padding: '0' }"
      v-model="visibleSearch"
      centered
      :closable="false"
      width="337px"
      @ok="handleOkSearch"
    >
      <div class="search-block">
        <input
          type="text"
          v-model="searchValue"
          :autofocus="visibleSearch"
          @keyup.enter="submit"
          placeholder="Yangilikda qatnashgan so’zni kiriting"
        />
        <span v-html="searchInput"></span>
      </div>
    </a-modal>
    <div class="web_drawer" :class="{ 'h-100vh': webDrawer }">
      <div class="web_drawer__body">
        <div class="web_drawer__container container_xl">
          <div class="web_drawer__list">
            <ul v-for="category in categories.filter((item) => item.children.length > 0)">
              <h5>{{ category?.title }}</h5>
              <li
                v-for="child in category?.children"
                :key="child?.id"
                @click="$router.push(localePath(`/news-menu/${child?.slug}`))"
              >
                {{ child?.title }}
              </li>
            </ul>
            <ul>
              <h5>
                {{ $store.state.translations["main.library"] }}
              </h5>
              <li @click="$router.push(localePath('/library?type=literature'))">
                {{ $store.state.translations["main.literature"] }}
              </li>
              <li @click="$router.push(localePath('/library?type=scientific'))">
                {{ $store.state.translations["main.science"] }}
              </li>
              <li @click="$router.push(localePath('/library?type=articles'))">
                {{ $store.state.translations["main.articles"] }}
              </li>
              <li @click="$router.push(localePath('/library?type=manuals'))">
                Qo'llanmalar
              </li>
            </ul>
            <ul class="others__web">
              <h5>
                {{ $store.state.translations["main.others"] }}
              </h5>
              <li @click="$router.push(localePath('/galleries'))">
                {{ $store.state.translations["main.new-uzbekistan"] }}
              </li>
              <li @click="$router.push(localePath(`/news-menu/${columnist?.slug}`))">
                {{ columnist?.title }}
              </li>
              <li>
                <a href="https://ishonch.uz/">{{
                  $store.state.translations["main.archive"]
                }}</a>
              </li>
              <li @click="$router.push(localePath('/journalists'))">
                {{ $store.state.translations["main.journalists"] }}
              </li>
            </ul>
            <div class="web_drawer__weather__container">
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
                <span v-html="drop" class="rotate-90"></span>
              </div>
              <div class="weather__current">
                <div class="webDrawer_weather__currentText weather__currentText_mobile">
                  <h1>
                    <span>{{
                      currentWeather(0)[0]?.temp > 0
                        ? `+${currentWeather(0)[0]?.temp}`.split(".")[0]
                        : `${currentWeather(0)[0]?.temp}`.split(".")[0]
                    }}</span
                    >c
                  </h1>
                </div>
              </div>
              <div class="weather__time web_drawer__weather__time">
                <ul>
                  <li v-for="time in currentWeather(0).slice(0, 3)">
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
            </div>
          </div>
          <div class="web_drawer__list web_drawer__not_child">
            <nuxt-link
              v-for="category in categories.filter((item) => item.children.length == 0)"
              :to="`/news-menu/${category?.slug}`"
              :key="category?.id"
              >{{ category?.title }}</nuxt-link
            >
          </div>
          <div class="web_drawer__list2">
            <ul>
              <h5>
                {{ $store.state.translations["main.others"] }}
              </h5>
              <li @click="$router.push(localePath('/galleries'))">
                {{ $store.state.translations["main.new-uzbekistan"] }}
              </li>
              <li @click="$router.push(localePath(`/news-menu/${columnist?.slug}`))">
                {{ columnist?.title }}
              </li>
              <li>
                <a href="https://ishonch.uz/">{{
                  $store.state.translations["main.archive"]
                }}</a>
              </li>
              <li @click="$router.push(localePath('/journalists'))">
                {{ $store.state.translations["main.journalists"] }}
              </li>
            </ul>
            <div>
              <nuxt-link
                v-for="category in categories.filter((item) => item.children.length == 0)"
                :to="`/news-menu/${category?.slug}`"
                :key="category?.id"
                >{{ category?.title }}</nuxt-link
              >
            </div>
          </div>
          <ul class="currency-list web_drawer__currency">
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
        </div>
        <div class="web_drawer__messangers">
          <div class="container_xl d-flex justify-content-center">
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
        <div class="container_xl web_drawer__text">
          <p>© 2023 Ishonch.uz. Все права защищены</p>
          <p>Дизайн - Redfox</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["categories", "columnist", "currency", "weather", "regions"],
  data() {
    return {
      activeRegion: "toshkentSh",
      webDrawer: false,
      searchValue: "",
      visible: false,
      visibleSearch: false,
      visibleSms: false,
      visibleName: false,
      dropShow: false,
      smsTimer: 45,
      thisTime: new Date(),
      search: require("../../assets/svg/search.svg?raw"),
      searchInput: require("../../assets/svg/search-input.svg?raw"),
      user: require("../../assets/svg/user.svg?raw"),
      menu: require("../../assets/svg/menu.svg?raw"),
      drop: require("../../assets/svg/dropdown.svg?raw"),
      mClose: require("../../assets/svg/modal-close.svg?raw"),
      smsSuccess: require("../../assets/svg/success.svg?raw"),
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
      form: {
        phone_number: "",
      },
      rules: {
        phone_number: [
          { required: true, message: "Number is reqiured", trigger: "change" },
          { min: 9, message: "Length should be 9", trigger: "change" },
        ],
      },
      formSms: {
        phone_number: "",
        code: "",
      },
      rulesSms: {
        code: [
          {
            required: true,
            message: "Sms code is required",
            trigger: "change",
          },
        ],
      },
      formName: {
        phone_number: "",
        code: "",
        full_name: "",
      },
      responseTypes: {
        smsCodeError: false,
        smsCodeSuccess: false,
        userResponse: false,
      },
      rulesName: {
        phone_number: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // var header = this.$refs.navScroll;
    // var sticky = header.offsetTop;
    // window.addEventListener("scroll", () => {
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //   if (scrollTop > this.lastScrollTop && window.pageYOffset >= sticky) {
    //     header.classList.add("sticky");
    //     header.style.top = "-128px";
    //   } else if (window.pageYOffset < sticky) {
    //     header.classList.remove("sticky");
    //   } else if (document.documentElement.scrollTop == 0) {
    //     header.style.top = "0";
    //   } else {
    //     header.style.top = "0";
    //   }
    //   this.lastScrollTop = scrollTop;
    // });
  },

  methods: {
    moment,
    currentWeather(index) {
      const currentW = this.weather[Object.keys(this.weather)[index]].filter(
        (item) => moment(item?.time).format("HH") >= moment(this.thisTime).format("HH")
      );
      return currentW;
    },
    submit() {
      this.$router.push(`/search/${this.searchValue}`);
      this.visibleSearch = false;
    },
    onSubmit() {
      this.formSms = {
        ...this.formSms,
        phone_number: `${this.form.phone_number}`,
      };
      this.$refs.ruleFormAuth.validate((valid) => {
        if (valid) {
          this.__SEND_NUMBER(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmitSms() {
      // this.formSms.phone_number = this.form.phone_number;
      const data = {
        ...this.formSms,
        full_name: this.formName.full_name,
      };
      this.$refs.ruleFormSms.validate((valid) => {
        if (valid) {
          this.responseTypes.smsCodeSuccess
            ? this.__LOGIN_REGISTER(data)
            : this.__CHECK_SMS_CODE(this.formSms);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async __SEND_NUMBER(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/postSendSmsCode", dataForm);
        this.visible = false;
        this.visibleSms = true;
        this.form.phone_number = "";
      } catch (e) {
        console.log(e);
      }
    },
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: "example",
            password: "password",
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async __CHECK_SMS_CODE(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/postCheckSmsCode", dataForm);
        if (data.correct) {
          this.responseTypes.smsCodeSuccess = true;
          this.responseTypes.smsCodeError = false;

          if (data.tokens) {
            this.responseTypes.userResponse = false;
            await localStorage.setItem(
              "access_token",
              JSON.stringify(data.tokens.access)
            );
            await localStorage.setItem(
              "refresh_token",
              JSON.stringify(data.tokens.refresh)
            );
            this.$store.commit("chackAuth");
            this.visibleSms = false;
            this.$router.push("/profile/personal-info");
          } else {
            this.responseTypes.userResponse = true;
          }
        } else {
          this.responseTypes.smsCodeSuccess = false;
          this.responseTypes.smsCodeError = true;
        }
      } catch (e) {
        if (e.response.status == 403) {
          this.responseTypes.smsCodeSuccess = false;
          this.responseTypes.smsCodeError = true;
        }
        console.log(e);
      }
    },
    async __LOGIN_REGISTER(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/postLoginRegister", dataForm);
        this.responseTypes.smsCodeSuccess = true;
        this.visibleSms = false;
        localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        this.$store.commit("chackAuth");
        // this.$router.push("/profile/personal-info");
      } catch (e) {
        this.responseTypes.smsCodeError = true;
        console.log(e);
      }
    },

    handleOkSearch() {
      this.visibleSearch = false;
    },
    handleOk() {
      this.visible = false;
    },
    handleOkSms() {
      this.visibleSms = false;
    },
    handleOkName() {
      this.visibleName = false;
    },
    openDrop(val) {
      // dropShow = !dropShow
    },
  },
  watch: {
    "$route.path"() {
      this.webDrawer = false;
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    },
    webDrawer(val) {
      if (val) {
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    },
    visibleSms(val) {
      if (val) {
        this.smsTimer = 45;
        const smInterval = setInterval(() => {
          if (this.smsTimer > 0) {
            this.smsTimer--;
          }
          if (this.smsTimer == 0) {
            clearInterval(smInterval);
          }
        }, 1000);
      } else {
        this.formName.full_name = "";
        this.formSms = {
          phone_number: "",
          code: "",
        };
      }
    },
    smsTimer(val) {
      if (val == 0 && this.visibleSms) this.__SEND_NUMBER(this.form);
    },
    "formSms.code"(val) {
      if (val.length < 6) {
        (this.responseTypes.smsCodeError = false),
          (this.responseTypes.smsCodeSuccess = false);
      }
    },
    smsCodeSuccess(val) {
      if (val) this.smsCodeError = false;
    },
    smsCodeError(val) {
      if (val) this.smsCodeSuccess = false;
    },
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/header-mobile.css";
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0.1rem 0.4rem;
}
.search-block input {
  padding: 12px 27px 12px 44px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: var(--gray_e7e7e7, #000);

  width: 100%;
  border: none;
  background: var(--black_414141, #f9f9f9);
}
.search-block input:focus {
  outline: none;
}
.search-block {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 12px;
  background: var(--black_414141, #f9f9f9);
}
.search-block span {
  position: absolute;
}
.search-block input::placeholder {
  color: #888888;
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    top: 50%;
    opacity: 0;
  }
  100% {
    top: 100%;
    opacity: 1;
  }
}
.ant-form-item-children span {
  display: flex;
}
.has-error .ant-form-item-children span {
  display: none;
}
.menu-list {
  background: var(--body_color);
  transition: all 0.5s !important;
}
.menu-list-container {
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
}
.menu-list-container ul {
  display: flex;
}
/* .menu-list-container ul li, */
.menu-list-container ul li a,
.ant-dropdown-link {
  position: relative;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: uppercase;
  color: var(--text_color_nav);
  margin-right: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 9px 10px;
  border-radius: 7px;
  transition: 0.3s;
}
.menu-list-container ul li a:hover,
.ant-dropdown-link:hover {
  background: rgba(0, 0, 0, 0.06);
}
.menu-list-container ul li:hover {
  color: #0192ff;
}
.ant-dropdown-link:hover svg path,
.menu-list-container ul li:hover svg path {
  fill: #0192ff;
}

.menu-list-container ul li span {
  margin-left: 14px;
}
.menu-list-container ul li span svg path {
  transition: 0.3s;
}
.menu-list-container ul li span svg path {
  fill: #9ba2c3;
}
.menu-list-btns {
  display: flex;
}
.menu-list-btns div {
  background: #ffffff;
  border: 1px solid var(--header_btns_border);
  border-radius: 8px;
  width: 52px;
  height: 52px;
  background: var(--header_btns_bg);
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.menu-list-btns div span svg path {
  fill: var(--header_btns_svg);
}
.menu-list-btns div:last-child {
  margin-right: 0;
}
.vmodal-header {
  padding: 22px 40px;
  background: var(--modal_header_bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--modal_header_br);
}
.vmodal-header h2 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 150%;
  color: var(--text_color);
}
.vmodal-header span {
  cursor: pointer;
}
.vmodal-header span svg path {
  stroke: var(--modal_exit_btn);
}
.vmodal-body {
  padding: 36px 40px;
}
.auth-btn {
  background: #0192ff;
  border-radius: 4px;
  padding: 14px 83px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.auth-btn__outline {
  background: transparent;
  border-radius: 4px;
  padding: 14px 0;
  width: 201px;
  display: flex;
  justify-content: center;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #0192ff;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid var(--light-bue-100, #0192ff);
}
.vmodal-footer {
  padding: 0 40px 40px 42px;
  display: flex;
  justify-content: center;
}
.vmodal-footer__book {
  padding: 0 40px 40px 42px;
  display: flex;
  justify-content: flex-start;
  gap: 17px;
}
.modal-form-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
}
.auth-form .has-error .ant-form-explain,
.error_code,
.ant-form-explain {
  position: absolute;
  right: 17px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: right;
  color: #c02600;
  width: auto !important;
}
.auth-form .ant-form-item-control {
  display: flex;
  align-items: center;
}
.auth-form .ant-form-item-control span {
  width: 100%;
}
.auth-form .ant-input {
  background: var(--modal_input_bg);
}
.sms_code_success label {
  color: var(--gray_e7e7e7, #00af4c);
}
.has-error .ant-input,
.has-error .ant-input:hover {
  background: var(--black_414141, #f9f9f9) !important;
}
.sms_code_success input {
  background: var(--black_414141, #eafff3) !important;
  color: #00af4c;
}
.sms_code_error label {
  color: #c02600;
}
.sms_code_error input {
  color: #c02600;
}
.sms_success_icon,
.sms_timer {
  position: absolute;
  right: 17px;
  width: auto !important;
}
.sms_timer {
  color: var(--modal_input_timer, #707070);
  text-align: right;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 150%;
}
.web__drawer {
  display: none !important;
}
.sms_success_icon svg path {
  fill: #00af4c;
}
.menu-list__web2 {
  display: none;
}
.menu-list__web3 {
  display: none;
}
.web_drawer__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 2fr;
}
.web_drawer__list2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
}
.web_drawer__list2 div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.web_drawer__list2 div a {
  color: var(--light-bue-100, #0192ff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  text-transform: uppercase;
  padding: 10px;
  padding-left: 6px;
}
.web_drawer__body {
  overflow-y: scroll;
  height: calc(100vh - 300px);
  padding-bottom: 300px;
}
.web_drawer__body::-webkit-scrollbar {
  /* display: none; */
}
.web_drawer__list h5,
.web_drawer__list2 h5 {
  color: var(--light-bue-100, #0192ff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  text-transform: uppercase;
  padding: 10px 6px;
}
.web_drawer__list ul li,
.web_drawer__list2 ul li {
  color: var(--white_ffffff, #000);
  padding: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  margin-left: 15px;
  cursor: pointer;
}
.web_drawer__list ul li a,
.web_drawer__list2 ul li a {
  font-size: 16px;
  color: var(--white_ffffff, #000);
}

.web_drawer__list ul li:not(:last-child),
.web_drawer__list2 ul li:not(:last-child) {
  margin-bottom: 8px;
}
.web_drawer__not_child {
  margin-top: 20px;
}
.web_drawer__container {
  padding-top: 18px;
}
.web_drawer__not_child a {
  color: var(--white_ffffff, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  text-transform: uppercase;
  padding: 10px 10px 10px 6px;
}
.web_drawer__currency {
  margin-top: 64px;
}
.web_drawer__messangers svg {
  width: 36px;
  height: 36px;
}
.web_drawer__messangers {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--black-5, #e7e7e7);
  border-bottom: 1px solid var(--black-5, #e7e7e7);
  padding-top: 26px;
  padding-bottom: 26px;
}
.web_drawer__messangers div {
  gap: 33px;
}
.web_drawer__text {
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
}
.web_drawer__text p {
  color: var(--black-30, #a0a0a0);
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 130%;
}

.web_drawer__weather__time {
  padding: 0 !important;
  background: transparent !important;
}
.web_drawer__weather__time ul {
  gap: 12px;
}
.web_drawer__weather__time ul li {
  padding: 0 !important;
  margin-left: 0px !important;
}
.web_drawer__weather__container {
  display: none;
}
@media (max-width: 992px) {
  .web__drawer {
    display: flex !important;
  }
  .menu-list__web2 {
    display: flex;
  }
  .menu-list__web1 {
    display: none;
  }
}
@media (max-width: 889px) {
  .menu-list-btns div {
    width: 42px;
    height: 42px;
  }
  .menu-list__web3 {
    display: flex;
  }
  .menu-list__web2 {
    display: none;
  }
}
@media (max-width: 768px) {
  .web_drawer__not_child {
    display: none;
  }
  .web_drawer__weather__container {
    display: block;
  }
  .web_drawer__list {
    grid-template-columns: 1fr 1fr 1fr 1.2fr;
  }
  .others__web {
    display: none;
  }
  .menu-list__web3 {
    display: flex;
  }
  .menu-list__web2 {
    display: none;
  }
  .menu-list-btns div {
    width: 42px;
    height: 42px;
  }
  .menu-list-btns div:not(:last-child) {
    margin-right: 6px;
  }
  .menu-list-btns div svg {
    width: 24px;
    height: 24px;
  }
  .weather__currentText_mobile h1 {
    color: var(--white_ffffff, #000) !important;
    font-size: 54px !important;
    font-weight: 400 !important;
    line-height: 130%;
  }
}
@media (max-width: 390px) {
  .weather__currentText_mobile h1 {
    font-size: 44px !important;
  }
}
</style>
