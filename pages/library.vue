<template>
  <div class="home-page library-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>O’zbekiston</h5>
        <ul>
          <li class="news-menu-active-categry">
            <nuxt-link :to="localePath('/')">Iqtisod</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/')">Siyosat</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/')">Sport</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/')">Jamiyat</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="library-page-container">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "../components/cards/BookCard.vue";

export default {
  components: {
    BookCard,
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";

.library-page-page {
  padding-top: 28px;
}
.library-page-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 30px;
}
</style>
