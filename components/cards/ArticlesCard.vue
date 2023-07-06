<template lang="html">
  <div
    class="articles-card"
    @click="$router.push(localePath(`/library-inner/${article?.slug}`))"
  >
    <!-- <span> <span class="articles__tag">Maqola</span></span> -->
    <div class="articles-header">
      <h3>{{ article?.title }}</h3>
    </div>
    <div class="articles-body" v-html="article?.text"></div>
    <div class="articles-footer">
      <p>{{ $store.state.translations["main.author"] }}:</p>
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
  background: var(--black_111111, #f9f9f9);
  padding: 40px 43px 43px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.articles__tag {
  color: var(--white_ffffff, #111);
  font-size: 12px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 1.68px;
  text-transform: uppercase;
  padding: 7px 12px;
  background: var(--gray_292929, #eee);
  display: inline-flex;
  margin-bottom: 14px;
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
  color: var(--gray_cfcfcf, #707070);
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
  color: var(--gray_f9f9f9, #888);
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
  color: var(--white_ffffff, #000);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 500;
  margin-left: 15px;
  line-height: 130%;
}
@media (max-width: 576px) {
  .articles-card {
    border-radius: 14px;
    padding: 18px;
  }
  .articles-header h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
  }
  .articles-footer p {
    font-size: 14px;
    font-weight: 400;
    line-height: 145%;
  }
  .articles-footer span {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
  }
  .articles-footer {
    margin-top: 20px;
  }
}
</style>
