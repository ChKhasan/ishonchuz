<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <ul class="library_tab top_tab">
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-personal-info'),
          }"
        >
          <span @click="$router.push(localePath('/profile/personal-info'))">{{
            $store.state.translations["main.my-room"]
          }}</span>
        </li>
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-my-board'),
          }"
        >
          <span @click="$router.push(localePath('/profile/my-board'))">
            {{ $store.state.translations["main.my-shelf"] }}</span
          >
        </li>
        <li
          :class="{
            'news-menu-active-categry': $route.name.includes('profile-saved'),
          }"
        >
          <span @click="$router.push(localePath('/profile/saved'))">{{
            $store.state.translations["main.saved"]
          }}</span>
        </li>
        <li @click="logOut">
          <span>Chiqish</span>
        </li>
      </ul>
      <div class="profile-grid">
        <div class="web-menu">
          <ProfileMenu />
        </div>
        <div class="profile-settings">
          <h5>Sozlamalar</h5>
          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <div class="profile-form-grid">
              <a-form-model-item class="form-item mb-0" label="Ism" prop="name">
                <a-input type="text" placeholder="Ism" v-model="form.first_name" />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-0" label="Familiya" prop="last_name">
                <a-input type="text" placeholder="Familiya" v-model="form.last_name" />
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0"
                label="Otasining ismi"
                prop="father_name"
              >
                <a-input
                  type="text"
                  placeholder="Otasining ismi"
                  v-model="form.father_name"
                />
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0"
                label="Elektron manzil"
                prop="email"
              >
                <a-input
                  type="text"
                  placeholder="Example@gmail.com"
                  v-model="form.email"
                />
                <span class="profile-edit" v-html="edit"></span>
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-0"
                label="Telefon raqam"
                prop="phone_number"
              >
                <a-input
                  type="text"
                  placeholder="Telefon raqam"
                  v-model="form.phone_number"
                />
                <span
                  class="profile-edit"
                  @click="visibleSms = true"
                  v-html="edit"
                ></span>
              </a-form-model-item>
              <div class="d-flex align-items-end">
                <div class="profile-form-btn" @click="onSubmit()">Saqlash</div>
              </div>
            </div>
          </a-form-model>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
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
                  class="w-100"
                  :mask="['+998 (##) ### ## ##', '+998 (##) ### ## ##']"
                  placeholder="+998 (__) ___ __ __"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="smsCodeSend"
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
  </div>
</template>
<script>
import ProfileMenu from "../../components/profile-menu.vue";
import Loading from "../../components/loading.vue";
export default {
  middlewareL: "auth",
  data() {
    return {
      loading: true,
      visibleSms: false,
      edit: require("../../assets/svg/profile-edit.svg?raw"),
      mClose: require("../../assets/svg/modal-close.svg?raw"),
      smsTimer: 45,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        father_name: "",
        phone_number: "",
      },
      rules: {
        first_name: [
          { required: true, message: "This field is required", trigger: "change" },
        ],
      },
      rulesSms: {
        code: [{ required: true, message: "Sms code is required", trigger: "change" }],
      },
      formSms: {
        phone_number: "",
        code: "",
      },
      smsCodeSend: false,
      responseTypes: {
        smsCodeError: false,
        smsCodeSuccess: false,
        userResponse: false,
      },
    };
  },
  mounted() {
    if (this.loading) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    }
    this.middlewareAuth();
    this.__GET_PROFILE_DATA();
  },
  methods: {
    async __UPDATE_PROFILE(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/putUpdateProfile", dataForm);
        this.$notification["success"]({
          message: "Success",
          description: "Успешное изменение.",
        });
        this.__GET_PROFILE_DATA();
      } catch (e) {
        console.log(e);
      }
    },
    onSubmitSms() {
      const data = {
        ...this.formSms,
      };
      this.$refs.ruleFormSms.validate((valid) => {
        if (valid) {
          this.__UPDATE_NUMBER(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async __UPDATE_NUMBER(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchAuth/putUpdateNumber", dataForm);
        this.form.phone_number = data?.number;
        this.$notification["success"]({
          message: "Success",
          description: "Номер телефона успешно изменен.",
        });
        this.visibleSms = false;
      } catch (e) {
        if (e.response.status == 403) {
          this.responseTypes.smsCodeSuccess = false;
          this.responseTypes.smsCodeError = true;
        }
      }
    },
    async __SEND_NUMBER() {
      try {
        const data = await this.$store.dispatch("fetchAuth/postSendSmsCode", {
          phone_number: this.formSms.phone_number,
        });
        this.smsCodeSend = true;
      } catch (e) {
        console.log(e);
      }
    },
    async __REFRESH_TOKEN() {
      try {
        console.log("asdasdasdqwe2q421434");
        const data = await this.$store.dispatch("fetchAuth/postRefreshToken");
        localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        this.$store.commit("chackAuth");
        this.__GET_PROFILE_DATA();
      } catch (e) {}
    },
    async __GET_PROFILE_DATA() {
      try {
        const data = await this.$store.dispatch("fetchAuth/getProfileInfo");
        this.form.first_name = data?.full_name.split(" ")[0];
        this.form.last_name = data?.full_name.split(" ")[1];
        this.form.father_name = data?.full_name.split(" ")[2];
        this.form.email = data?.email;
        this.form.phone_number = data?.phone_number;
      } catch (e) {
        if (e.response.status == 401) {
          console.log("referesahdaSDASD");
          this.__REFRESH_TOKEN();
        } else {
          this.logOut();
        }
      }
    },
    async logOut() {
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
      try {
        const data = await this.$store.dispatch("fetchAuth/postLogOut", {
          refresh_token: refreshToken,
        });
        this.$router.push(localePath('/'));
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.$store.commit("chackAuth");
      } catch (e) {
        if (e.response.status == 401) {
          this.$router.push(localePath('/'));
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.$store.commit("chackAuth");
        }
      }
    },
    middlewareAuth() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push(localePath('/'));
      } else {
        this.loading = false;
      }
    },
    handleOkSms() {
      this.visibleSms = false;
    },
    onSubmit() {
      const data = {
        full_name: `${this.form.first_name} ${this.form.last_name} ${this.form.father_name}`,
        phone_number: this.form.phone_number,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.__UPDATE_PROFILE(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    loading(val) {
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
    "formSms.phone_number"(val) {
      console.log(val.length);
      if (val.length == 9) {
        this.__SEND_NUMBER();
      }
    },
    smsTimer(val) {
      if (val == 0) {
        this.__SEND_NUMBER();
        this.smsTimer = 45;
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
  components: { ProfileMenu, Loading },
};
</script>
<style lang="css">
.profile-page {
  padding-bottom: 100px;
}
.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
  grid-gap: 30px;
}
.profile-settings {
  padding: 51px 65px;
  border: 1px solid var(--gray_292929, #e7e7e7);
  border-radius: 8px;
}
.profile-settings h5 {
  font-size: 22px;
  color: var(--white_ffffff, #020105);
  font-family: var(--ROBOTO_SERIF);
  font-weight: 600;
  line-height: 150%;
}
.profile-form-grid {
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 40px;
}
.profile-form-btn {
  background: #0192ff;
  border-radius: 4px;
  padding: 14px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.profile-edit {
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6f4ff;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  cursor: pointer;
}
@media (max-width: 576px) {
  .profile-settings {
    padding: 20px;
    border-radius: 8px;
  }
  .profile-form-grid {
    padding-top: 20px;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  .profile-settings h5 {
    font-size: 19px;
  }
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
