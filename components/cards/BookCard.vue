<template lang="html">
  <div class="book-card" @click="$router.push(localePath(`/book/${book.slug}`))">
    <div class="book-card-img">
      <img v-if="book?.image" :src="book?.image" alt="" />
      <img v-else src="../../assets/images/image 1.png" alt="" />
    </div>
    <div class="book-card-body">
      <h3>{{ book?.title }}</h3>
      <div class="book-card-footer">
        <nuxt-link :to="localePath(`/book/${book.slug}`)"
          >{{ $store.state.translations["main.reading"] }} <span v-html="drop"></span
        ></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["book"],
  data() {
    return {
      drop: require("../../assets/svg/dropdown.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.book-card {
  background: var(--header_bg);
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
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
  line-height: 18px;
  height: 36px;
  color: var(--text_color);
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.book-card-footer {
  margin-top: 17px;
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
@media (max-width: 576px) {
  .book-card {
    padding: 10px;
    display: grid;
    grid-template-columns: 69px auto;
    grid-gap: 14px;
  }
  .book-card-img {
    height: 99px;
    margin-bottom: 0;
  }
  .book-card-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .book-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .book-card-body h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    height: 38px;
  }
  .book-card-footer a {
    font-size: 14px;
    font-weight: 400;
    line-height: 145%;
  }
}
</style>
