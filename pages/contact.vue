<template>
  <div class="about-page">
    <div class="container_xl">
      <div class="new-category-title">
        <h2>{{ $store.state.translations["main.contact"] }}</h2>

      </div>

      <!-- <div class="about-us-container about-site__container">
        <h2>Tashkil topishi</h2>
        <p>
          Ўзбекистон касаба уюшмалари Федерацияси муассислигидаги “Ишонч” газетасининг илк
          сони 1991 йил 21 март — Наврўз байрами куни дунё юзини кўрган. Газетанинг нишона
          сони ҳафталик бўлиб, 16 саҳифали, А-3 ҳажмда ва 30 минг нусхада чоп этилган
          бўлса, орадан бир йил ўтиб, унинг адади 133 минг нусхадан ошиб кетди.
        </p>
        <div class="about-statistic">
          <p>
            Tashkil topish sanasi:
            <span>1991 йил 21 март </span>
          </p>
          <p>
            Haftalik chop etilish miqdori:
            <span>133 000 </span>
          </p>
          <p>
            Rus tilidagi soni tashkil topishi:
            <span>1993 йил </span>
          </p>
        </div>
        <p>
          1993 йил Наврўз байрамидан бошлаб рус забон аҳолимиз учун ойда бир марта чоп
          этиладиган А-3 ҳажмда, 8 саҳифали “Ишонч-Доверие” газетаси ҳам ташкил этилиб, 20
          минг нусхада чоп этила бошланди. Бугунга келиб “Ишонч” газетаси ҳафтада 3 марта,
          “Ишонч-Доверие” эса 1 марта чоп этилиб, ижтимоий-сиёсий ва бошқа йўналишлардаги
          турли мавзуларни ёритиб келмоқда.
        </p>
        <p>
          Айни пайтда таҳририятда “Касаба уюшмалари ҳаёти”, “Ҳуқуқ ва халқаро ҳаёт”,
          “Хатлар ва мухбирлар билан ишлаш”, “Реклама ва эълонлар” ҳамда “Миллий-маънавий
          қадриятлар ва спорт” бўлимлари фаолият юритмоқда.
        </p>
        <div class="about-statistic">
          <p>
            Ishonch.uz” ахборот-таҳлилий портали ташкил топиши
            <span>2019 йил 10 январ </span>
          </p>
          <p>
            Гувоҳнома рақами:
            <span>1263</span>
          </p>
        </div>
        <p>
          2019 йилнинг 10 январида эса таҳририятнинг “Ishonch.uz” ахборот-таҳлилий портали
          ҳам электрон ОАВ сифатида Президент ҳузуридаги Ахборот ва оммавий
          коммуникациялар агентлигида давлат рўйхатидан ўтказилган.  Гувоҳнома рақами:
          1263
        </p>
        <div class="about-statistic">
          <p>
            Таҳририят бош муҳаррири
            <span>Ҳусан Эрматов</span>
          </p>
        </div>
        <div class="about-adress">
          <p>Таҳририят манзили:<span> Тошкент шаҳри, Бухоро кўчаси, 24-уй</span></p>
          <p>Mанзил:<span> 100165, Тошкент шаҳри, Бухоро кўчаси, 24-уй</span></p>
          <p>Telefonlar:<span> (8 371) 256-25-36, 256-52-78.</span></p>
          <p>
            “Ишонч” ва “Ишонч-Доверие” газеталари электрон манзили:
            <span>xatlar@ishonch-doverie.uz</span>
          </p>
          <p>
            “Ishonch.uz” ахборот-таҳлилий портали электрон манзили:
            <span>ishonch1991@yandex.uz</span>
          </p>
        </div>
      </div> -->
      <div
        class="about-us-container about-site__container"
        v-html="contactInfo?.text_connection"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown: require("../assets/svg/dropdown.svg?raw"),
    };
  },
  async asyncData({ store, i18n }) {
    const [contactInfoData] = await Promise.all([
      store.dispatch("fetchContact/getContact", {
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const contactInfo = contactInfoData;
    return {
      contactInfo,
    };
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";
@import "../assets/css/pages/site-info.css";
.about-site__container {
  margin-top: 40px;
}
</style>
