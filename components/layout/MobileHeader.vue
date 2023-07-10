<template>
  <div class="wrap">
    <div class="position-relative">
      <div class="top">
        <a href="" target="_blank">
          <img class="banner" src="@/assets/images/header.jpg" alt="" />
        </a>
      </div>
      <div class="container_xl">
        <div class="bottom">
          <div class="left">
            <button
              class="butn"
              @click="profileMenu = !profileMenu"
              v-if="$route.name.includes('profile')"
            >
              <span v-html="menu" v-if="!drawerVisible"></span>
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
            </button>
            <button v-else class="butn" @click="drawerVisible = !drawerVisible">
              <span v-html="menu" v-if="!drawerVisible"></span>
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
            </button>
          </div>
          <div class="center">
            <NuxtLink to="/">
              <!-- <img src="@/assets/images/logo/brand.svg" alt="" /> -->
              <span
                class="mobile-logo"
                v-html="$store.state.theme ? logo : darkLogo"
              ></span>
            </NuxtLink>
          </div>
          <div class="right">
            <button class="butn" @click="visibleSearch = true">
              <img src="@/assets/images/search.svg" alt="" />
            </button>
            <button
              class="butn open-modal-mobile"
              @click="
                $store.state.auth
                  ? $router.push('/profile/personal-info')
                  : (authMobilVisible = !authMobilVisible)
              "
            >
              <img src="@/assets/images/person.svg" alt="" />
            </button>
            <button
              class="butn open-modal-web"
              @click="
                $store.state.auth
                  ? $router.push('/profile/personal-info')
                  : (visible = !visible)
              "
            >
              <img src="@/assets/images/person.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="drawer_menu" :class="{ 'h-100vh': drawerVisible }">
        <div class="drawer_scroll">
          <div class="drawer_menu-body">
            <div
              v-for="category in categories"
              :key="category?.id"
              class="home-page-right-drop-mobile"
              :class="{
                heightAuto: dropVal == category?.id,
                active_menu: dropVal == category?.id,
                disactive_menu: dropVal != false && dropVal != category?.id,
              }"
            >
              <h5 v-if="category?.children?.length > 0" @click="dropAction(category?.id)">
                {{ category?.title }}
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == category?.id }"
                ></span>
              </h5>
              <!-- <Transition name="bounceDrop"> -->
              <div
                class="home-page-right-drop-board"
                :class="{ disabled: dropVal !== category?.id }"
                v-if="category?.children?.length > 0"
              >
                <ul>
                  <li
                    v-for="(child, index) in category?.children"
                    :key="index"
                    @click="$router.push(localePath(`/news-menu/${child?.slug}`))"
                  >
                    {{ child?.title }}
                  </li>
                </ul>
              </div>
              <nuxt-link v-else :to="localePath(`/news-menu/${category?.slug}`)">
                {{ category?.title }}</nuxt-link
              >
              <!-- </Transition> -->
            </div>
            <div
              class="home-page-right-drop-mobile"
              :class="{
                heightAuto: dropVal == 'library',
                active_menu: dropVal == 'library',
                disactive_menu: dropVal != false && dropVal != 'library',
              }"
            >
              <h5 @click="dropAction('library')">
                {{ $store.state.translations["main.library"] }}
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == 'library' }"
                ></span>
              </h5>
              <div class="home-page-right-drop-board">
                <ul>
                  <li @click="$router.push(localePath(`/library?type=literature`))">
                    {{ $store.state.translations["main.literature"] }}
                  </li>
                  <li @click="$router.push(localePath(`/library?type=scientific`))">
                    {{ $store.state.translations["main.science"] }}
                  </li>
                  <li @click="$router.push(localePath(`/library?type=articles`))">
                    {{ $store.state.translations["main.articles"] }}
                  </li>
                  <li @click="$router.push(localePath(`/library?type=manuals`))">
                    {{ $store.state.translations["main.kasaba"] }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="home-page-right-drop-mobile"
              :class="{
                heightAuto: dropVal == 'others',
                active_menu: dropVal == 'others',
                disactive_menu: dropVal != false && dropVal != 'others',
              }"
            >
              <h5 @click="dropAction('others')">
                {{ $store.state.translations["main.others"] }}
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == 'others' }"
                ></span>
              </h5>
              <div class="home-page-right-drop-board">
                <ul>
                  <li @click="$router.push('/galleries')">
                    {{ $store.state.translations["main.new-uzbekistan"] }}
                  </li>
                  <li @click="$router.push('/')">
                    {{ $store.state.translations["main.communist"] }}
                  </li>
                  <li>
                    <a href="https://ishonch.uz/">{{
                      $store.state.translations["main.archive"]
                    }}</a>
                  </li>
                  <li @click="$router.push('/journalists')">
                    {{ $store.state.translations["main.journalists"] }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mobile_weather__container">
              <div class="web_drawer__weather__container ">
                <div class="weather-drop weather-drop__mobile" @click="visible = true">
                  <span>
                    <img :src="currentWeather(0)[0]?.image" alt="" />
                  </span>
                  <p>
                    {{ regions.find((item) => item.value == activeRegion)?.name }}
                  </p>
                  <span v-html="drop" class="rotate-90"></span>
                </div>
                <div class="weather__current">
                  <div class="webDrawer_weather__currentText">
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
              </div>
              <div class="weather__time web_drawer__weather__time">
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
            </div>
            <span class="mobile-color-switch">
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
                ></span></div
            ></span>
          </div>
          <div class="drawer_lang">
            <ul>
              <li
                :class="{ active_lang: $i18n.locale == 'ru' }"
                @click="$router.push(switchLocalePath('ru'))"
              >
                Русский
              </li>
              <li
                :class="{ active_lang: $i18n.locale == 'oz' }"
                @click="$router.push(switchLocalePath('oz'))"
              >
                Uzbek
              </li>
              <li
                :class="{ active_lang: $i18n.locale == 'uz' }"
                @click="$router.push(switchLocalePath('uz'))"
              >
                English
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
          @keyup.enter="submit"
          placeholder="Yangilikda qatnashgan so’zni kiriting"
        />
        <span v-html="searchInput"></span>
      </div>
    </a-modal>
    <a-modal
      class="auth-modal-web"
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
              <the-mask
                v-model="form.phone_number"
                class="w-100"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              />
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
      class="auth-modal-web"
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
                <the-mask
                  v-model="formSms.phone_number"
                  class="w-100 disabled"
                  :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
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
                  v-if="
                    !responseTypes.smsCodeError &&
                    !responseTypes.smsCodeSuccess &&
                    smsTimer != 0
                  "
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
                  placeholder="SMS kodni tering"
                />
              </a-form-model-item>
            </div>
          </a-form-model>
          <div
            class="reboot_sms"
            v-if="smsTimer == 0 && visibleSms"
            @click="__SEND_NUMBER({ phone_number: `${formSms.phone_number}` })"
          >
            Qayta jo’natish
          </div>
        </div>
        <div class="vmodal-footer">
          <div class="auth-btn" @click="onSubmitSms()">Kirish</div>
        </div>
      </div>
    </a-modal>
    <div class="auth_modal_mobile" :class="{ 'h-100vh': authMobilVisible }">
      <div class="auth_mobile_body">
        <span class="auth-logo" v-html="$store.state.theme ? logo : darkLogo"></span>
        <h3>Telefon raqamingizni kiritng</h3>
        <p>Tasdiqlash kodini SMS orqali yuboramiz</p>
        <div class="auth-form-mobile w-100">
          <a-form-model
            v-if="!visibleSms"
            ref="ruleFormAuth"
            class="w-100"
            :model="form"
            :rules="rules"
          >
            <a-form-model-item
              class="form-item-mobile mb-0 w-100 auth-form"
              prop="phone_number"
            >
              <input
                v-if="visibleSms"
                v-model="formSms.phone_number"
                class="w-100 disabled"
                v-mask="'+998 (##) ### ## ##'"
                placeholder="+998 (__) ___ __ __"
              />
              <!-- <the-mask
                v-if="visibleSms"
                v-model="formSms.phone_number"
                class="w-100 disabled"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              /> -->
              <input
                v-else
                v-model="form.phone_number"
                class="w-100"
                v-mask="'+998 (##) ### ## ##'"
                placeholder="+998 (__) ___ __ __"
              />
              <!-- <the-mask
                v-else
                v-model="form.phone_number"
                class="w-100"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              /> -->
              <span
                class="input_clear"
                @click="formSms.phone_number = ''"
                v-if="formSms.phone_number.length > 0 && visibleSms"
                v-html="inputClear"
              ></span>
              <span
                class="input_clear"
                @click="form.phone_number = ''"
                v-if="form.phone_number.length > 0 && !visibleSms"
                v-html="inputClear"
              ></span>
            </a-form-model-item>
          </a-form-model>
          <a-form-model
            v-else
            ref="ruleFormSms"
            class="w-100"
            :model="formSms"
            :rules="rulesMobile"
          >
            <a-form-model-item
              class="form-item-mobile mb-0 w-100 auth-form"
              prop="phone_number"
            >
              <!-- <the-mask
                v-if="visibleSms"
                v-model="formSms.phone_number"
                class="w-100 disabled"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              /> -->
              <input
                v-if="visibleSms"
                v-model="formSms.phone_number"
                class="w-100 disabled"
                v-mask="'+998 (##) ### ## ##'"
                placeholder="+998 (__) ___ __ __"
              />
              <input
                v-else
                v-mask="'+998 (##) ### ## ##'"
                class="w-100"
                v-model="form.phone_number"
                placeholder="+998 (__) ___ __ __"
              />
              <span
                class="input_clear"
                @click="formSms.phone_number = ''"
                v-if="formSms.phone_number.length > 0 && visibleSms"
                v-html="inputClear"
              ></span>
              <span
                class="input_clear"
                @click="form.phone_number = ''"
                v-if="form.phone_number.length > 0 && !visibleSms"
                v-html="inputClear"
              ></span>
            </a-form-model-item>
            <a-form-model-item
              v-if="visibleSms"
              class="form-item-mobile mb-0 w-100 auth-form"
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
                v-if="
                  !responseTypes.smsCodeError &&
                  !responseTypes.smsCodeSuccess &&
                  smsTimer != 0
                "
                >{{ smsTimer }}</span
              >
              <span
                v-if="
                  smsTimer == 0 &&
                  formSms.code.length > 0 &&
                  !responseTypes.smsCodeError &&
                  !responseTypes.smsCodeSuccess
                "
                @click="formSms.code = ''"
                class="input_clear"
                v-html="inputClear"
              ></span>
              <span class="error_code" v-if="responseTypes.smsCodeError"
                >Xato kiritildi!</span
              >
            </a-form-model-item>
            <a-form-model-item
              class="form-item mb-0 w-100"
              prop="name"
              v-if="responseTypes.userResponse"
            >
              <a-input
                v-model="formName.full_name"
                class="w-100"
                placeholder="Ismingizni kiritish"
              />
            </a-form-model-item>
          </a-form-model>
          <div
            class="reboot_sms"
            v-if="smsTimer == 0 && visibleSms"
            @click="__SEND_NUMBER({ phone_number: `${formSms.phone_number}` })"
          >
            Qayta jo’natish
          </div>
          <div class="auth_btn_mobile" @click="onSubmitModel">Kirish</div>
        </div>
      </div>
    </div>
    <div class="profile_menu_mobile profile-menu" :class="{ 'h-100vh': profileMenu }">
      <ul>
        <li
          :class="{
            'active-profile-menu': $route.name.includes('profile-personal-info'),
          }"
        >
          <nuxt-link :to="localePath('/profile/personal-info')"
            ><span v-html="userProfile"></span>
            {{ $store.state.translations["main.my-room"] }}
          </nuxt-link>
          <span v-html="dropdown"></span>
        </li>
        <li
          :class="{
            'active-profile-menu': $route.name.includes('profile-my-board'),
          }"
        >
          <nuxt-link :to="localePath('/profile/my-board')"
            ><span v-html="star"></span> {{ $store.state.translations["main.my-shelf"] }}
          </nuxt-link>
          <span v-html="dropdown"></span>
        </li>
        <li
          :class="{
            'active-profile-menu': $route.name.includes('profile-saved'),
          }"
        >
          <nuxt-link :to="localePath('/profile/saved')"
            ><span v-html="comment"></span> {{ $store.state.translations["main.saved"] }}
          </nuxt-link>
          <span v-html="dropdown"></span>
        </li>
        <li>
          <div @click="logOut()"><span v-html="exit"></span> Chiqish</div>
          <span v-html="dropdown"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["categories", "weather"],
  data() {
    return {
      thisTime: new Date(),
      profileMenu: false,
      authMobilVisible: false,
      visible: false,
      visibleSearch: false,
      visibleSms: false,
      searchValue: "",
      dropVal: false,
      drawerVisible: false,
      dropShow: false,
      smsTimer: 45,
      activeRegion: "toshkentSh",

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
      userProfile: require("../../assets/svg/profile-user.svg?raw"),
      star: require("../../assets/svg/profile-star.svg?raw"),
      comment: require("../../assets/svg/profile-comment.svg?raw"),
      exit: require("../../assets/svg/exit.svg?raw"),
      logo: require("../../assets/svg/logo.svg?raw"),
      darkLogo: require("../../assets/svg/dark-logo.svg?raw"),
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      searchInput: require("../../assets/svg/search-input.svg?raw"),
      search: require("../../assets/svg/search.svg?raw"),
      user: require("../../assets/svg/user.svg?raw"),
      menu: require("../../assets/svg/menu.svg?raw"),
      drop: require("../../assets/svg/dropdown.svg?raw"),
      mClose: require("../../assets/svg/modal-close.svg?raw"),
      smsSuccess: require("../../assets/svg/success.svg?raw"),
      inputClear: require("../../assets/svg/input-clear.svg?raw"),
      sun: require("../../assets/svg/sun.svg?raw"),
      moon: require("../../assets/svg/moon.svg?raw"),
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
      form: {
        phone_number: "",
      },
      rulesMobile: {
        phone_number: [
          { required: true, message: "Number is reqiured", trigger: "change" },
          { min: 9, message: "Length should be 9", trigger: "change" },
        ],
        code: [
          {
            required: true,
            message: "Sms code is required",
            trigger: "change",
          },
        ],
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
    };
  },
  mounted() {
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  },
  computed: {
    routerName() {
      return this.$route.path;
    },
  },
  methods: {
    moment,
    currentWeather(index) {
      const currentW = this.weather[Object.keys(this.weather)[index]].filter(
        (item) => moment(item?.time).format("HH") >= moment(this.thisTime).format("HH")
      );
      return currentW;
    },
    handleOkSearch() {
      this.visibleSearch = false;
    },
    submit() {
      this.$router.push(`/search/${this.searchValue}`);
      this.visibleSearch = false;
    },
    dropAction(val) {
      console.log(":asdasdasds");
      if (val != this.dropVal) {
        this.dropVal = val;
      } else {
        this.dropVal = false;
      }
    },
    handleOk() {
      this.visible = false;
    },
    handleOkSms() {
      this.visibleSms = false;
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

    onSubmitModel() {
      if (this.visibleSms) {
        this.onSubmitSms();
      } else {
        this.onSubmit();
      }
    },
    onSubmitSms() {
      // this.formSms.phone_number = this.form.phone_number;
      const data = {
        ...this.formSms,
        full_name: this.formName.full_name,
      };
      if (!this.formSms.code) {
        this.formSms.code = "";
      }
      console.log(this.$refs);
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
        this.smsTimer = 45;
      } catch (e) {
        console.log(e);
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
    async logOut() {
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
      try {
        const data = await this.$store.dispatch("fetchAuth/postLogOut", {
          refresh_token: refreshToken,
        });
        this.$router.push("/");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.$store.commit("chackAuth");
      } catch (e) {
        if (e.response.status == 401) {
          this.$router.push("/");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.$store.commit("chackAuth");
        }
      }
    },
    async __LOGIN_REGISTER(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/postLoginRegister", dataForm);
        this.responseTypes.smsCodeSuccess = true;
        this.visibleSms = false;
        this.authMobilVisible = false;
        localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        this.$store.commit("chackAuth");
        // this.$router.push("/profile/personal-info");
      } catch (e) {
        this.responseTypes.smsCodeError = true;
        console.log(e);
      }
    },
  },
  watch: {
    authMobilVisible(val) {
      this.drawerVisible = false;
      if (val) {
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
        this.responseTypes = {
          smsCodeError: false,
          smsCodeSuccess: false,
          userResponse: false,
        };
      }
    },
    drawerVisible(val) {
      this.authMobilVisible = false;
      if (val) {
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
      console.log(this.$route.path);
    },
    "$route.path"() {
      this.drawerVisible = false;
      this.authMobilVisible = false;
      this.profileMenu = false;
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
      console.log("asdasdas");
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
      if (val == 45) {
        this.smsTimer = 45;
        const smInterval = setInterval(() => {
          if (this.smsTimer > 0) {
            this.smsTimer--;
          }
          if (this.smsTimer == 0) {
            clearInterval(smInterval);
          }
        }, 1000);
      }
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

<style scoped>
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/header-mobile.css";
.weather-drop__mobile p {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.mobile_weather__container {
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
