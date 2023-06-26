<template lang="html">
  <div class="menu-list" id="navbar" ref="navScroll">
    <div class="container_xl">
      <div class="menu-list-container">
        <ul>
          <li v-for="category in categories" :key="category?.id">
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
                  <nuxt-link :to="localePath('/library?type=literature')"
                    >Adabiyot</nuxt-link
                  >
                </a-menu-item>
                <a-menu-item key="1">
                  <nuxt-link :to="localePath('/library?type=scientific')"
                    >Ilmiy ishlar</nuxt-link
                  >
                </a-menu-item>
                <a-menu-item key="2">
                  <nuxt-link :to="localePath('/library?type=articles')"
                    >Maqolalar</nuxt-link
                  >
                </a-menu-item>
                <a-menu-item key="3">
                  <nuxt-link :to="localePath('/library?type=literature')"
                    >Kasaba faollari uchun qo’llanmalar</nuxt-link
                  >
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
          <li>
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ $store.state.translations["main.others"] }} <span v-html="drop"></span>
              </a>
              <a-menu slot="overlay" class="dropdown-board">
                <a-menu-item key="0">
                  <nuxt-link :to="localePath('/')"
                    >Yangi O’zbekiston suratlarda</nuxt-link
                  >
                </a-menu-item>
                <a-menu-item key="1">
                  <nuxt-link :to="localePath('/')">Kolumnistlar</nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                  <nuxt-link :to="localePath('/journalists')"
                    >O’zbekiston jurnalistlar</nuxt-link
                  >
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
          <!-- <div><span v-html="menu"></span></div> -->
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
          @keyup.enter="submit"
          placeholder="Yangilikda qatnashgan so’zni kiriting"
        />
        <span v-html="searchInput"></span>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: ["categories"],
  data() {
    return {
      searchValue: "",
      visible: false,
      visibleSearch: false,
      visibleSms: false,
      visibleName: false,
      dropShow: false,
      smsTimer: 45,
      search: require("../../assets/svg/search.svg?raw"),
      searchInput: require("../../assets/svg/search-input.svg?raw"),
      user: require("../../assets/svg/user.svg?raw"),
      menu: require("../../assets/svg/menu.svg?raw"),
      drop: require("../../assets/svg/dropdown.svg?raw"),
      mClose: require("../../assets/svg/modal-close.svg?raw"),
      smsSuccess: require("../../assets/svg/success.svg?raw"),
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
        code: [{ required: true, message: "Sms code is required", trigger: "change" }],
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
          { required: true, message: "Please input Activity name", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    var header = this.$refs.navScroll;
    var sticky = header.offsetTop;
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > this.lastScrollTop && window.pageYOffset >= sticky) {
        header.classList.add("sticky");
        header.style.top = "-128px";
      } else if (window.pageYOffset < sticky) {
        header.classList.remove("sticky");
      } else if (document.documentElement.scrollTop == 0) {
        header.style.top = "0";
      } else {
        header.style.top = "0";
      }
      this.lastScrollTop = scrollTop;
    });
    // window.addEventListener("scroll", () => {
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //   if (window.pageYOffset >= sticky) {
    //     header.classList.add("sticky");
    //   } else {
    //     header.classList.remove("sticky");
    //   }
    //   this.lastScrollTop = scrollTop;
    // });
  },

  methods: {
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
.vmodal-footer {
  padding: 0 40px 40px 42px;
  display: flex;
  justify-content: center;
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
.sms_success_icon svg path {
  fill: #00af4c;
}
</style>
