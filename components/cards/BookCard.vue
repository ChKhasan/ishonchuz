<template lang="html">
  <div class="book-card">
    <div class="book-card-img">
      <img src="../../assets/images/image 1.png" alt="" />
    </div>
    <div class="book-card-body">
      <h3>Bill Bryson - love and go home</h3>
    </div>
    <div class="book-card-footer">
      <nuxt-link :to="localePath('/')">O’qish <span v-html="drop"></span></nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drop: require("../../assets/svg/dropdown.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.book-card {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 4px;
}
.book-card-img {
  height: 149px;
  margin-bottom: 12px;
}
.book-card-img img {
  height: 100%;
}
.book-card-body h3 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: var(--text_color);
}
.book-card-body {
  margin-bottom: 17px;
}
.book-card-footer a {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #0192ff;
}
.book-card-footer a span {
  margin-left: 12px;
}
.book-card-footer a span svg {
  transform: rotate(-90deg);
}
.book-card-footer a span svg path {
  fill: #0192ff;
}
</style>
