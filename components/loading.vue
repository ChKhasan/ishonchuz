<template lang="html">
  <div class="loading-page">
    <a-spin size="large" />
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
.loading-page {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
}
</style>
