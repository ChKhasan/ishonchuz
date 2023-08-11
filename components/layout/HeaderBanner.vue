<template lang="html">
  <div class="container_xl">
    <a :href="banners[2]?.link">
      <div class="header-banner">
        <img :src="banners[2]?.image" alt="" />
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ["banners"],
};
</script>
<style lang="css">
.header-banner {
  height: 178px;
  width: 100%;
}
.header-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 992px) {
  .header-banner {
    height: 115px;
  }
}
</style>
