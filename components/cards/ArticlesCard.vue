<template lang="html">
  <div class="articles-card">
    <div class="articles-header">
      <h3>{{ article?.title }}</h3>
    </div>
    <div class="articles-body" v-html="article?.text"></div>
    <div class="articles-footer">
      <p>Mualif:</p>
      <span>{{ article?.author }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["article"],
};
</script>
<style lang="css">
.articles-card {
  border-radius: 14px;
  background: var(--black-1, #f9f9f9);
  padding: 40px 43px 43px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.articles-header h3 {
  color: var(--light-bue-100, #0192ff);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 600;
  line-height: 170%;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.articles-body {
  margin-top: 10px;
}
.articles-body p {
  color: var(--black-50, #707070);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 145%;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.articles-footer p {
  color: var(--black-40, #888);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 500;
  line-height: 130%;
}
.articles-footer {
  margin-top: 36px;
  display: flex;
}
.articles-footer span {
  color: #000;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 500;
  margin-left: 15px;
  line-height: 130%;
}
</style>
