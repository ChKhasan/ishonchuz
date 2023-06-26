<template>
  <div class="wrap">
    <div class="top">
      <a href="" target="_blank">
        <img class="banner" src="@/assets/images/header.jpg" alt="" />
      </a>
    </div>
    <div class="container">
      <div class="bottom">
        <div class="left">
          <NuxtLink to="/">
            <img src="@/assets/images/logo/brand.svg" alt="" />
          </NuxtLink>
        </div>
        <div class="right">
          <button class="butn">
            <img src="@/assets/images/search.svg" alt="" />
          </button>
          <button class="butn">
            <img src="@/assets/images/person.svg" alt="" />
          </button>
          <button class="butn"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background: white;
}
.banner {
  width: 100%;
}
.bottom {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bottom .butn {
  border-radius: 6px;
  border: 0.75px solid var(--dark-blue-10, #e6e8f0);
  background: #fff;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}
</style>
