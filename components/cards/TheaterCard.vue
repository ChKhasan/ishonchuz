<template lang="html">
  <div style="overflow: hidden">
    <div class="theater-card">
      <div class="theater-card-image">
        <img v-if="theater?.image" :src="theater?.image" alt="" />
        <img v-else src="../../assets/images/teater.png" alt="" />
      </div>
      <div class="theater-card-title">
        <h4>{{ theater?.title }}</h4>
      </div>
      <div class="theater-card-info">
        <div>
          <p>
            {{ $store.state.translations["main.year"] }}
            <span>{{ theater?.from_date.split("-")[0] }}</span>
          </p>
          <p>
            {{ $store.state.translations["main.month"] }}
            <span>{{ moonth[theater?.from_date.split("-")[1] * 1 - 1] }}</span>
          </p>
        </div>
        <div>
          <p>
            {{ $store.state.translations["main.day"] }}
            <span
              >{{ theater?.from_date.split("-")[2] }}-{{
                theater?.to_date.split("-")[2]
              }}</span
            >
          </p>
          <p>
            {{ $store.state.translations["main.hour"] }}
            <span>{{ theater?.hours }}.</span>
          </p>
        </div>
        <span></span>
      </div>
      <!-- <div class="qr_code">
        <div></div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["theater"],
  data() {
    return {
      moonth: [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr",
      ],
    };
  },
  mounted() {
    const date = new Date();
  },
};
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap");

.theater-card {
  background: var(--gray_292929, #fff);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--black_414141, #d9d9d9);
}
.theater-card-image {
  height: 177px;
  width: 100%;
}
.theater-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.theater-card-title {
  margin-top: 9px;
  padding-left: 2px;
  padding-right: 2px;
}
.theater-card-title h4 {
  color: var(--white_ffffff, #051769);
  font-size: 18px;
  font-family: "Allerta Stencil", sans-serif;
  text-transform: uppercase;
  border-bottom: 7px solid var(--light-bue-100, #0192ff);
  padding-bottom: 8px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.theater-card-info {
  margin-top: 12px;
  position: relative;
  /* padding-bottom: 27px; */
  padding-left: 2px;
  padding-right: 2px;
}
/* .theater-card-info::after {
  display: flex;
  position: absolute;
  content: "";
  width: 25px;
  border-radius: 50%;
  height: 25px;
  border: 1px solid var(--black_414141, #d9d9d9);
  background: var(--black_000000, #ffffff);
  left: -24.5px;
  bottom: -12.5px;
}
.theater-card-info::before {
  display: flex;
  position: absolute;
  content: "";
  width: 25px;
  border-radius: 50%;
  height: 25px;
  border: 1px solid var(--black_414141, #d9d9d9);
  background: var(--black_000000, #ffffff);
  right: -24.5px;
  bottom: -12.5px;
} */
.theater-card-info div {
  display: flex;
  margin-bottom: 8px;
}
.theater-card-info div p {
  color: var(--dark-blue-80, #374587);
  font-size: 10px;
  font-family: "Allerta Stencil", sans-serif;
  line-height: 136.5%;
  letter-spacing: -0.25px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  text-transform: uppercase;
}
.theater-card-info div p span {
  color: var(--white_ffffff, #051769);
  font-size: 18px;
  line-height: 91%;
}
.qr_code {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 8px;
}
.qr_code div {
  width: 100%;
  height: 52px;
  background: gray;
}
/* .theater-card-info > span {
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.theater-card-info > span::after {
  position: absolute;
  content: "";
  bottom: 0;
  width: 80%;
  display: flex;
  border-bottom: 1px dashed var(--black_414141, #e7e7e7);
} */
@media (max-width: 420px) {
  .theater-card-image {
    height: 166px;
    width: 100%;
  }
}
</style>
