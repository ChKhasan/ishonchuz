<template lang="html">
  <div class="comment-card">
    <div class="comment-card-avatar">
      <img src="../../assets/images/Frame 1239.png" alt="" />
    </div>
    <div class="comment-card-body">
      <h6>Rahimjon Gaziyev</h6>
      <span>
        <a-rate v-model="value" />
        <p>09:45</p></span
      >
      <p>
        Viloyat kengashining mehnat huquq inspektori bilan hamkorlikda ariza o‘rganildi.
        Aniqlanishicha, S.Jo‘rayeva Jizzax viloyati xalq taʼlimi boshqarmasining 2017 yil
        18 dekabrdagi buyrug‘iga ko‘ra buyrug‘iga ko‘ra,
      </p>
    </div>
  </div>
</template>
<script>
export default {
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
  background: #f9f9f9;
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
  color: #111111;
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
  color: #292929;
}
.comment-card-body span svg {
  width: 15px;
  height: 14px;
}
.comment-card-body span .ant-rate-star:not(:last-child) {
  margin-right: 3px !important;
}
</style>
