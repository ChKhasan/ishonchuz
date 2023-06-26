<template lang="html">
  <div class="comment-card">
    <div class="comment-card-avatar">
      <img src="../../assets/images/Frame 1239.png" alt="" />
    </div>
    <div class="comment-card-body">
      <h6>{{ comment?.full_name }}</h6>
      <span>
        <a-rate v-model="comment.stars" disabled />
        <p>{{ comment?.date }}</p></span
      >
      <p>
        {{ comment?.text }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["comment"],
  data() {
    return {
      value: 2,
    };
  },
};
</script>
<style lang="css">
.comment-card {
  display: grid;
  grid-template-columns: 42px auto;
}
.comment-card-avatar {
  display: flex;
  align-items: flex-end;
}
.comment-card-body {
  padding: 30px 30px 20px 30px;
  background: var(--card_bg);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 14px;
}
.comment-card-body h6 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: var(--text_color);
  margin-bottom: 14px;
}
.comment-card-body span {
  display: flex;
  align-items: center;
}
.comment-card-body span p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.02em;
  color: #888888;
  margin-left: 20px;
}
.comment-card-body > p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  margin-top: 20px;
  color: var(--right_drop_text);
}
.comment-card-body span svg {
  width: 15px;
  height: 14px;
}
.comment-card-body span .ant-rate-star:not(:last-child) {
  margin-right: 3px !important;
}
</style>
