<template lang="html">
  <div class="newspaper-card">
    <div class="newspaper-image">
      <img v-if="newspaper?.image" :src="newspaper?.image" alt="" />
      <img v-else src="../../assets/images/gazeta.png" alt="" />
    </div>
    <div class="newspaper-body">
      <h3>{{ newspaper?.title }} (O’zbek tilida)</h3>
      <p>{{ newspaper?.date }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["newspaper"],
};
</script>
<style lang="css">
.newspaper-image {
  height: 315px;
}
.newspaper-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.newspaper-body h3 {
  color: var(--text_color);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
  margin-top: 13px;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.newspaper-body p {
  color: var(--black-50, #707070);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 145%;
  margin-top: 3px;
}
</style>
