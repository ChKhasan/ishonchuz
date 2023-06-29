<template>
  <div class="wrap">
    <div class="position-relative">
      <div class="top">
        <a href="" target="_blank">
          <img class="banner" src="@/assets/images/header.jpg" alt="" />
        </a>
      </div>
      <div class="container">
        <div class="bottom">
          <div class="left">
            <NuxtLink to="/">
              <img src="@/assets/images/logo/brand.svg" alt="" />
            </NuxtLink>
          </div>
          <div class="right">
            <button class="butn" @click="visibleSearch = true">
              <img src="@/assets/images/search.svg" alt="" />
            </button>
            <button
              class="butn"
              @click="
                $store.state.auth
                  ? $router.push('/profile/personal-info')
                  : (authMobilVisible = !authMobilVisible)
              "
            >
              <img src="@/assets/images/person.svg" alt="" />
            </button>
            <button class="butn" @click="drawerVisible = !drawerVisible">
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
        </div>
      </div>
      <div class="drawer_menu" :class="{ 'h-100vh': drawerVisible }">
        <div>
          <div class="drawer_menu-body">
            <div
              v-for="category in categories"
              :key="category?.id"
              class="home-page-right-drop home-page-right-drop-mobile"
              :class="{ heightAuto: dropVal == category?.id }"
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
          </div>
          <div class="drawer_lang">
            <ul>
              <li
                :class="{ 'active-lang': $i18n.locale == 'ru' }"
                @click="$router.push(switchLocalePath('ru'))"
              >
                Русский
              </li>
              <li
                :class="{ 'active-lang': $i18n.locale == 'oz' }"
                @click="$router.push(switchLocalePath('oz'))"
              >
                Uzbek
              </li>
              <li
                :class="{ 'active-lang': $i18n.locale == 'uz' }"
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
                  placeholder="SMS kodni tering"
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
    <div class="auth_modal_mobile" :class="{ 'h-100vh': authMobilVisible }">
      <div class="auth_mobile_body">
        <span class="auth-logo" v-html="logo"> </span>
        <h3>Telefon raqamingizni kiritng</h3>
        <p>Tasdiqlash kodini SMS orqali yuboramiz</p>
        <div class="auth-form-mobile w-100">
          <a-form-model ref="ruleFormAuth" :model="form" :rules="rules">
            <a-form-model-item
              class="form-item-mobile mb-0 w-100 auth-form"
              prop="phone_number"
            >
              <the-mask
                v-if="visibleSms"
                v-model="formSms.phone_number"
                class="w-100 disabled"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              />
              <the-mask
                v-else
                v-model="form.phone_number"
                class="w-100"
                :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                placeholder="+998 (__) ___ __ __"
              />
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
                placeholder="SMS kodni tering"
              />
            </a-form-model-item>
          </a-form-model>
          <div class="auth_btn_mobile" @click="onSubmitModel">Kirish</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  data() {
    return {
      authMobilVisible: false,
      visible: false,
      visibleSearch: false,
      visibleSms: false,
      searchValue: "",
      dropVal: false,
      drawerVisible: false,
      dropShow: false,
      smsTimer: 45,
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
  computed: {
    routerName() {
      return this.$route.path;
    },
  },
  methods: {
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
        phone_number: `998${this.form.phone_number}`,
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
    drawerVisible() {
      console.log(this.$route.path);
    },
    "$route.path"() {
      this.drawerVisible = false;
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

<style scoped>
@import "../../assets/css/pages/home-page.css";
.heightAuto {
  max-height: 500px !important;
  transition: max-height 0.4s ease-in !important;
}
.wrap {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background: white;
}
.banner {
  width: 100%;
}

.bottom {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bottom .butn {
  border-radius: 6px;
  border: 0.75px solid var(--dark-blue-10, #e6e8f0);
  background: #fff;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}
.drawer_menu {
  position: absolute;
  width: 100%;
  height: 0;
  background: #fff;
  padding: 0;
  transition: 0.3s;
  overflow: hidden;
}
.auth_modal_mobile {
  position: absolute;
  width: 100%;
  height: 0;
  background: #fff;
  padding: 0;
  transition: 0.3s;
  overflow: hidden;
}
.auth_mobile_body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 68px;
}
.auth_mobile_body h3 {
  color: var(--black-100, #000);
  text-align: center;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  margin-bottom: 10px;
}
.auth_mobile_body p {
  color: var(--black-40, #888);
  text-align: center;
  font-size: 12px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.24px;
}
.drawer_menu-body {
  padding: 20px;
}
.auth_btn_mobile {
  margin-top: 20px;
  border-radius: 8px;
  background: #0192ff;
  padding: 16px 0;
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.auth-logo {
  height: 24px;
  margin-bottom: 30px;
}
.h-100vh {
  height: 100vh !important;
}
.auth-form-mobile {
  margin-top: 47px;
}

.form-item-mobile input {
  border-radius: 4px;
  background: var(--black-1, #f9f9f9);
  height: 56px;
  border: none;
  padding-left: 16px;
  color: var(--black-30, #a0a0a0);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  color: #000;
}
.form-item-mobile {
  margin-bottom: 20px !important;
}
.form-item-mobile input:focus {
  outline: none;
}
@media screen and (max-width: 576px) {
  .auth-modal-web {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .wrap {
    display: block;
    z-index: 1000;
  }
  .home-page-right-drop-mobile {
    background: transparent;
    padding: 10px;
    border: none;
    max-height: 40px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul li {
    padding: 10px;
    margin-bottom: 8px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul li:last-child {
    margin-bottom: 0;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board {
    margin-top: 0px;
    padding-top: 4px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul {
    margin-left: 16px;
  }
  .home-page-right-drop-mobile a {
    font-family: var(--ROBOTO_SERIF);
    font-size: 14px;
    line-height: 130%;
    text-transform: uppercase;
    color: #828bb4;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .home-page-right-drop-mobile h5 {
    color: #828bb4;
  }
  .home-page-right-drop-mobile span svg path {
    fill: #828bb4 !important;
  }
  .drawer_lang {
    margin-top: 30px;
    padding-top: 24px;
    padding-right: 19px;
    padding-left: 19px;
    padding-bottom: 24px;
    border-top: 1px solid var(--black-5, #e7e7e7);
    border-bottom: 1px solid var(--black-5, #e7e7e7);
  }
  .drawer_lang ul {
    display: flex;
    justify-content: space-between;
  }
  .drawer_lang ul li {
    border-radius: 72px;
    border: 1px solid var(--light-grey-2, #f5f5f7);
    padding: 8px 16px;
    color: var(--black, #020105);
    font-size: 16px;
    font-family: var(--ROBOTO_SERIF);
    line-height: 150%;
  }
  .active_lang {
    background: var(--white-grey-1, #f5f7fa);
    border: 1.5px solid var(--light-bue-100, #0192ff);
    color: var(--light-bue-100, #0192ff);
  }
}
</style>
