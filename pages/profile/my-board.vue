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
        this.$router.push(localePath('/'));
      } else {
        this.loading = false;
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

.profile-grid {
  display: grid;
  grid-template-columns: 3.3fr 10.7fr;
}
@media (max-width: 576px) {
  .profile-grid {
    grid-template-columns: 1fr !important;
  }

}
</style>
