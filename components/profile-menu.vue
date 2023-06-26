<template lang="html">
  <div class="profile-menu">
    <ul>
      <li
        :class="{ 'active-profile-menu': $route.name.includes('profile-personal-info') }"
      >
        <nuxt-link :to="localePath('/profile/personal-info')"
          ><span v-html="user"></span> Mening sahifam</nuxt-link
        >
      </li>
      <li
        :class="{
          'active-profile-menu': $route.name.includes('profile-my-board'),
        }"
      >
        <nuxt-link :to="localePath('/profile/my-board')"
          ><span v-html="star"></span> Mening javonim</nuxt-link
        >
      </li>
      <li
        :class="{
          'active-profile-menu': $route.name.includes('profile-saved'),
        }"
      >
        <nuxt-link :to="localePath('/profile/saved')"
          ><span v-html="comment"></span> Saqlanganlar</nuxt-link
        >
      </li>
      <li>
        <div @click="logOut()"><span v-html="exit"></span> Chiqish</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: require("../assets/svg/profile-user.svg?raw"),
      star: require("../assets/svg/profile-star.svg?raw"),
      comment: require("../assets/svg/profile-comment.svg?raw"),
      exit: require("../assets/svg/exit.svg?raw"),
    };
  },
  methods: {
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
  },
};
</script>
<style lang="css">
.profile-menu {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 40px;
}
.profile-menu ul li a span svg path {
  fill: #414141;
  transition: 0.3s;
}
.profile-menu ul {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
}
.profile-menu ul a,
.profile-menu ul div {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #020105;
  display: flex;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}
.profile-menu ul a span,
.profile-menu ul div span {
  margin-right: 8px;
  background: #ffffff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.profile-menu ul li:hover a,
.profile-menu ul li:hover div,
.active-profile-menu a {
  color: #0192ff !important;
}
.active-profile-menu a {
  pointer-events: none;
}
.profile-menu ul li:hover span,
.active-profile-menu span {
  background: #0192ff !important;
}
.profile-menu ul li:hover span svg path,
.active-profile-menu span svg path {
  fill: #fff !important;
}
</style>
