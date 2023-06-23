<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <div class="profile-grid">
        <ProfileMenu />
        <div class="profile-settings">
          <h5>Sozlamalar</h5>
          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <div class="profile-form-grid">
              <a-form-model-item class="form-item mb-0" label="Ism" prop="name">
                <a-input type="text" placeholder="Ism" v-model="form.name" />
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
                <span class="profile-edit" v-html="edit"></span>
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
      edit: require("../../assets/svg/profile-edit.svg?raw"),
      form: {
        name: "",
        last_name: "",
        email: "",
        father_name: "",
        phone_number: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input Activity name", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (this.loading) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    }
    this.middlewareAuth();
  },
  methods: {
    middlewareAuth() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/");
      } else {
        this.loading = false;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
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
  },
  components: { ProfileMenu, Loading },
};
</script>
<style lang="css">
.profile-page {
  padding-top: 78px;
  padding-bottom: 100px;
}
.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
  grid-gap: 30px;
}
.profile-settings {
  padding: 51px 65px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
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
</style>
