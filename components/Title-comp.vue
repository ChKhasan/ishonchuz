<template lang="html">
  <div class="title-comp">
    <h2><span v-html="titleIcon"></span> {{ title }}</h2>
    <nuxt-link v-if="link" :to="localePath(`/${link}`)"
      >{{ $store.state.translations["main.see_all"] }}<span v-html="linkIcon"></span
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
  border-bottom: 1px solid var(--title_border_bt);
  padding-bottom: 11px;
}
.title-comp h2 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 150%;
  color: var(--text_color);
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
@media screen and (max-width: 1024px) {
  .title-comp h2 {
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .title-comp h2 span {
    margin: 0;
  }
  .title-comp h2 {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .title-comp h2 span {
    margin: 0;
  }
}
@media (max-width: 768px) {
  .title-comp {
    display: flex;
    justify-content: space-between;
  }
  .title-comp h2 {
    font-size: 19px;
  }
}
@media (max-width: 390px) {
  .title-comp {
    padding-bottom: 15px;
  }
  .title-comp h2 {
    font-size: 13px;
  }
  .title-comp a {
    font-size: 12px;
  }
}
</style>
