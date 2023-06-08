<template lang="html">
  <div class="profile-page">
    <div class="container_xl">
      <div class="profile-grid">
        <ProfileMenu />
      </div>
    </div>
  </div>
</template>
<script>
import ProfileMenu from "../../components/profile-menu.vue";
export default {
  components: { ProfileMenu },
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
