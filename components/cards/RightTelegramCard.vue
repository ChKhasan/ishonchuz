<template lang="html">
  <div class="right-tg-card">
    <div class="right-tg-card_head">
      <span v-html="logo"></span>
    </div>
    <div class="right-tg-card_body">
      <p>{{ $store.state.translations["main.tg_card_text"] }}</p>
    </div>
    <div class="right-tg-card_footer">
      <a href="#" class="to-tg-btn"
        ><span v-html="tg"></span> {{ $store.state.translations["main.tg_card_link"] }}</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("../../assets/svg/logo.svg?raw"),
      tg: require("../../assets/svg/telegram-link.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.right-tg-card {
  background: #f9f9f9;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.right-tg-card_head {
  padding-top: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 21px;
  width: 90%;
}
.right-tg-card_head span svg {
  width: 150px;
  height: 23px;
}
.right-tg-card_body p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #414141;
}
.right-tg-card_body {
  padding-top: 21px;
}
.right-tg-card_footer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
}
.right-tg-card_footer a {
  padding: 10px 0;
  background: #e6f4ff;
  border-radius: 4px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #0192ff;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.right-tg-card_footer a span {
  margin-right: 16.5px;
}
</style>
