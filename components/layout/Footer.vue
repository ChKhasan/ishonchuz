<template lang="html">
  <div class="footer">
    <div class="container_xl">
      <div class="footer-container">
        <div class="footer-logo">
          <span v-html="logo"></span>
        </div>
        <div class="footer-body">
          <div class="footer-info">
            <h6>
              Ishonch.uz” axborot-tahliliy portali 2019 yilning 10 yanvarida elektron OAV
              sifatida davlat ro‘yxatidan o‘tkazilgan.
            </h6>
            <p>Guvohnoma raqami: <span>1263</span></p>
            <p>
              Tahririyat manzili: <span>Toshkent shahri, Buxoro ko‘chasi, 24-uy</span>
            </p>
            <p>Elektron manzil: <a href="#">ishonch1991@yandex.uz</a></p>
          </div>
          <div class="footer-menu">
            <ul>
              <li><nuxt-link to="/">O’zbekiston</nuxt-link></li>
              <li>Xorij</li>
              <li>Tahlil</li>
              <li>O’zgacha rakurs</li>
            </ul>
            <ul>
              <li>Madaniyat va marifat</li>
              <li>Mehnat huquqi</li>
              <li>Kutubxona</li>
              <li>Boshqalar</li>
            </ul>
            <ul>
              <li>Sayt haqida</li>
              <li>Reklama</li>
              <li>Aloqa</li>
              <li>Biz haqimizda</li>
            </ul>
          </div>
        </div>
        <div class="footer-messangers">
          <a href="#"><span v-html="telegram"></span></a>
          <a href="#"><span v-html="facebook"></span></a>
          <a href="#"><span v-html="twitter"></span></a>
          <a href="#"><span v-html="instagram"></span></a>
          <a href="#"><span v-html="whatsapp"></span></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container_xl">
        <p>2019-2023 - Ishonch.uz</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("../../assets/svg/logo.svg?raw"),
      telegram: require("../../assets/svg/telegram.svg?raw"),
      facebook: require("../../assets/svg/facebook.svg?raw"),
      twitter: require("../../assets/svg/twitter.svg?raw"),
      instagram: require("../../assets/svg/instagram.svg?raw"),
      whatsapp: require("../../assets/svg/whatsapp.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.footer {
  padding-top: 36px;
  border-top: 1px solid #EEEEEE;
}
.footer-logo {
  margin-bottom: 30px;
}
.footer-logo span svg {
  height: 26px;
  width: 170px;
}
.footer-body {
  display: flex;
  justify-content: space-between;
}

.footer-info h6 {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #292929;
}
.footer-info {
  max-width: 555px;
}
.footer-info p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #707070;
  padding-top: 11px;
}
.footer-info p span {
  color: #000;
}
.footer-menu {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.footer-menu ul li a,
.footer-menu ul li {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: uppercase;
  color: #000000;
  margin-bottom: 16px;
}
.footer-bottom p {
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #000000;
}
.footer-bottom {
  border-top: 1px solid #eeeeee;
  padding-top: 16px;
  padding-bottom: 103px;
}
.footer-messangers {
  
  padding-top: 50px;
  padding-bottom: 66px;
}
.footer-messangers a {
  margin-right: 30px;
}
</style>
