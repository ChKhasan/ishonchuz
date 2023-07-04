<template lang="html">
  <div
    class="newspaper-card"
    @click="$router.push(localePath(`/newspaper-inner/${newspaper?.slug}`))"
  >
    <div class="newspaper-image">
      <img v-if="newspaper?.image" :src="newspaper?.image" alt="" />
      <img v-else src="../../assets/images/gazeta.png" alt="" />
    </div>
    <div class="newspaper-body">
      <h3>
        {{ newspaper?.title }} ({{
          newspaper?.language == "uz" ? "O’zbek tilida" : "Rus tilida"
        }})
      </h3>
      <p class="newspaper-date-web" v-if="newspaper?.date">{{ newspaper?.date }}</p>
      <p class="newspaper-date-mobile" v-if="newspaper?.date">
        {{ newspaper?.date.split("|")[1] }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["newspaper"],
};
</script>
<style lang="css">
.newspaper-card {
  cursor: pointer;
}
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
.newspaper-date-web {
  display: flex;
}
.newspaper-date-mobile {
  display: none;
}
@media (max-width: 360px) {
  .newspaper-image {
    height: 216px;
  }
  .newspaper-body h3 {
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
  }
  .newspaper-date-web {
    display: none;
  }
  .newspaper-date-mobile {
    display: flex;
  }
}
</style>
