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
@import "../assets/css/pages/theater.css";
</style>
