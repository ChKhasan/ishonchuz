<template lang="html">
  <div class="title-comp">
    <h2><span v-html="titleIcon"></span> {{ title }}</h2>
    <nuxt-link v-if="link" to="/"
      >Barchasini ko’rish <span v-html="linkIcon"></span
    ></nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["title", "link"],
  data() {
    return {
      titleIcon: require("../assets/svg/title.svg?raw"),
      linkIcon: require("../assets/svg/link.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.title-comp {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 11px;
}
.title-comp h2 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 150%;
  color: #000000;
}
.title-comp h2 span {
  margin-right: 10px;
}
.title-comp a {
  font-family: var(--ROBOTO_SERIF);
  margin-left: 30px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #0192ff;
}
.title-comp a span {
  margin-left: 10px;
}
</style>
