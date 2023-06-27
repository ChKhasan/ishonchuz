<template lang="html">
  <div class="theater-page">
    <div class="container_xl">
      <div class="theater_title">
        <h3>Teater</h3>
      </div>
      <div class="theater-page-container">
        <TheaterCard />
        <TheaterCard />
        <TheaterCard />
        <TheaterCard />
        <TheaterCard />
        <TheaterCard />
        <TheaterCard />
      </div>
    </div>
  </div>
</template>
<script>
import TheaterCard from "../components/cards/TheaterCard.vue";

export default { components: { TheaterCard } };
</script>
<style lang="css">
.theater-page {
  padding-top: 30px;
}
.theater-page-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}
.theater_title {
  margin-bottom: 40px;
}
.theater_title h3 {
  color: var(--black-100, #000);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
}
</style>
