<template lang="html">
  <div class="theater-card">
    <div class="theater-card-image">
      <img src="../../assets/images/teater.png" alt="" />
    </div>
    <div class="theater-card-title">
      <h4>Ummon guruhi - yirik gala konserti 2023</h4>
    </div>
    <div class="theater-card-info">
      <div>
        <p>YIL <span>2023</span></p>
        <p>OY <span>SENTABR</span></p>
      </div>
      <div>
        <p>KUN <span>09-19</span></p>
        <p>SOAT <span>15:00; 22:00.</span></p>
      </div>
    </div>
    <div class="qr_code">
      <div></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap");

.theater-card {
  background: var(--white, #fff);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.theater-card-image {
  height: 177px;
  width: 100%;
}
.theater-card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.theater-card-title {
  margin-top: 9px;
  padding-bottom: 8px;
  border-bottom: 7px solid var(--light-bue-100, #0192ff);
}
.theater-card-title h4 {
  color: var(--dark-blue-100, #051769);
  font-size: 18px;
  font-family: "Allerta Stencil", sans-serif;
  text-transform: uppercase;
}
.theater-card-info {
  margin-top: 12px;
  position: relative;
  padding-bottom: 27px;
}
.theater-card-info::after {
  display: flex;
  position: absolute;
  content: "";
  width: 25px;
  border-radius: 50%;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  left: -24.5px;
  bottom: -5.5px;
}
.theater-card-info::before {
  display: flex;
  position: absolute;
  content: "";
  width: 25px;
  border-radius: 50%;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  right: -24.5px;
  bottom: -5.5px;
}
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
}
.theater-card-info div p span {
  color: var(--dark-blue-100, #051769);
  font-size: 18px;
  line-height: 91%;
}
.qr_code {
  padding-left: 20px;
  padding-right: 20px;
}
.qr_code div {
  width: 100%;
  height: 52px;
  background: gray;
}
</style>
