<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <div class="profile-grid">
        <ProfileMenu />
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>
<script>
import ProfileMenu from "../../components/profile-menu.vue";
import Loading from "../../components/loading.vue";
export default {
  middleware: "auth",
  data() {
    return {
      loading: true,
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
}
.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
}
</style>
