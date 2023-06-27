<template lang="html">
  <div class="container_xl header-banner">
    <img :src="banners[2]?.image" alt="" />
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
</style>
