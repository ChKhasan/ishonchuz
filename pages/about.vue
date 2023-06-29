<template>
  <div class="about-page">
    <div class="container_xl">
      <div class="news-menu-page-header">
        <h5>{{ $store.state.translations["main.libraries"] }}</h5>
        <ul class="library_tab">
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'about-us',
            }"
          >
            <span @click="tabChange('about-us')">biz haqimizda </span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'engineers',
            }"
          >
            <span @click="tabChange('engineers')">Muassis</span>
          </li>
          <li
            :class="{
              'news-menu-active-categry': $route.query.type == 'partners',
            }"
          >
            <span @click="tabChange('partners')">Hamkorlar</span>
          </li>
        </ul>
      </div>
      <div class="about-us-container" v-if="$route.query.type == 'about-us'">
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
      </div>
      <div class="engineers-container" v-if="$route.query.type == 'engineers'">
        <h2>Muassis</h2>
        <p>
          Ўзбекистон касаба уюшмалари федерацияси 1990 йил 12 сентябрда ташкил топган
          бўлиб, ишлаб чиқариш ва ноишлаб чиқариш соҳасидаги фаолият тури бўйича умумий
          манфаатлар билан бирлашган ходимлар, қисман иш билан банд бўлганлар ёки вақтинча
          ишсизлар, талабалар ва ўқувчи ёшлар, пенсионерлар, аҳоли бошқа қатламларини
          бирлаштирган касаба уюшмаларини ўз ичига олади ва ўзини ўзи бошқарадиган
          кўнгилли нодавлат, нотижорат жамоат ташкилоти ҳисобланади.
        </p>
        <div class="about-shadow-card">
          <h4>Касаба уюшмаларининг бош вазифаси</h4>
          <p>
            Касаба уюшмалари аъзоларининг меҳнат, ижтимоий, иқтисодий, маънавий,
            интеллектуал ҳуқуқ ва манфаатларини муҳофаза қилишда ҳаракат бирлигини амалга
            оширишдан иборат.
          </p>
        </div>
        <p>
          Ўзбекистон касаба уюшмалари кенгаши 1925 йилдан фаолият кўрсата бошлаган. Собиқ
          иттифоқ даврида унинг тасарруфида тармоқ республика қўмиталари мавжуд эди. Лекин
          уларнинг биронтаси ўз уставига эга эмасди. Фақат СССР касаба уюшмалари уставига
          биноан фаолият кўрсатарди. Ўзбекистон Республикаси мустақилликка эришгандан сўнг
          республикада тармоқ касаба уюшмалари тузилиб, улар ўз уставларини қабул қилди ва
          Адлия вазирлигида рўйхатдан ўтказди ҳамда Ўзбекистон касаба уюшмалари
          федерациясига уюшди.
        </p>
        <ul>
          <h3>Булар қуйидагилардан иборат:</h3>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
          <li>Авиация ходимлари касаба уюшмаси;</li>
        </ul>
        <p>
          Ўзбекистон касаба уюшмалари тизимини бошланғич касаба уюшма ташкилотлари, касаба
          уюшмаларининг туман, шаҳар, вилоят, Қорақалпоғистон Республикаси, Тошкент шаҳри
          кенгашлари ва бошқалар ташкил этади. Федерация кенгаши Ўзбекистон касаба
          уюшмалари федерациясининг қурултойлар оралиғидаги раҳбар органидир. У 5 йил
          муддатга сайланади ва ҳар бир аъзо ташкилотдан тўғридан тўғри микдорда (2 тадан)
          вакил юбориш йўли билан шакллантирилади. Федерация кенгашига вакиллар федерация
          аъзолари бўлган ташкилотларнинг қурултойлари, конференциялари ва мажлисларида
          сайланади. Федерация кенгаши таркибига қурултойда сайланган аъзолар, федерация
          раиси, унинг кенгаш бўйича ўринбосарлари, федерация фаолиятининг асосий
          йўналишлари бўйича доимий фаолият кўрсатувчи комиссиялар раислари ки]эади.
          Федерация раиси айни вақтда Ўзбекистон касаба уюшмалари федерацияси кенгаши,
          Раёсат ва Ижроия қўмита раиси ҳам ҳисобланади. Федерация кенгашининг мажлиси
          заруратга қараб, лекин ҳар йили камида 1 марта чақирилади.
        </p>
        <p>
          Федерация кенгаши уюшмалараро ва минтақалараро вазифаларни ҳал этишда аъзо
          ташкилотларнинг фаолиятини мувофиқлаштиради, касаба уюшмаларига қонунчиликда
          бериб қўйилган ҳуқуқларни рўёбга чиқаради, барча даражадаги касаба уюшмалари
          ташкилотларида ягона молиявий фаолиятни ва интизомни белгилайди ҳамда ўрнатади
          ҳамда федерациянинг халқаро фаолиятини олиб боради. Федерация кенгаши девонида
          меҳнаткашларнинг ижтимоий-иқтисодий манфаатларини ҳимоя қилиш, маданий-маърифий
          ва спорт ишлари, юридик, халқаро ишлар, ташкилий ишлар, ижтимоий суғурта, молия
          бўлимлари, котибият ҳамда ишлар бошқармаси бор.
        </p>
        <div class="about-statistic">
          <p>
            Бошланғич ташкилотлар сони
            <span>28 355</span>
          </p>
          <p>
            Касаба уюшма аъзолари сони
            <span>6 336 611</span>
          </p>
        </div>
        <p>
          Касаба уюшмалари тизимида 28 355 та бошланғич ташкилот бўлиб, улар 6 336 611
          нафар касаба уюшма аъзосини бирлаштиради. Бошланғич касаба уюшма ташкилотларида
          умумий йиғилиш (конференция), тармоқ касаба уюшмаларининг туман, шаҳар, вилоят
          ташкилотлари ва Қорақалпоғистон Республикаси, Тошкент шаҳри ҳамда вилоятлар
          уюшмалараро бирлашмаларида конференция, тармоқ касаба уюшмалари ва Ўзбекистон
          касаба уюшмалари федерациясида қурултой олий орган ҳисобланади. Умумий йиғилиш,
          конференция ва қурултой 5 йилда камида 1 марта чақирилади.
        </p>
        <p>
          Ўзбекистон касаба уюшмаларининг асосий эътибори меҳнаткашлар онгида демократик
          қадриятларни мустаҳкамлаш, уларнинг фаоллигини ошириш, касаба уюшмалари
          ҳаракатида демократик ўзгаришларни чуқурлаштиришга қаратилган. Жамоа шартномавий
          муносабатларни ривожлантириш борасидаги фаолият натижасида жамоа шартномалари
          тузилган юридик шахслар сони кўпайди. Жамоа шартномаларининг ижтимоий функцияси
          кучайди, уларнинг иш ҳақи ва ходимларнинг даромадига таъсири ошди. Самарали
          бандлик, меҳнатга ҳақ тўлашнинг ижтимоий адолатли тизимини жорий этиш, меҳнатни
          меъёрлаш масалаларига алоҳида эътибор қаратилди. Иш жойларида соғлом ва бехатар
          меҳнат шароитлари яратилиши борасида ташкилий ишлар амалга оширилди, кўп
          ҳолларда ходимларнинг бузилган ҳуқуқларини тиклашга эришилди. Касаба
          уюшмаларининг аёллар ва ёшларни, шунингдек, ижтимоий ҳимояга муҳтож ногиронлар,
          пенсионерлар, байналмилалчи жангчиларнинг ҳуқуқ ҳамда манфаатларини ҳимоя
          қилишга эътибор кучайди. Қонун яратувчилик соҳасида Олий Мажлис қўмиталари ва
          комиссиялари билан ҳамкорликда касаба уюшмаларининг фаол иштироки таъминланди.
          Ижтимоий суғурта маблағларини бошқариш механизми такомиллаштирилиши, янги
          соғломлаштириш муассасалари қурилиши ва мавжудларини реконструкция қилиш
          натижасида ходимлар ва улар оила аъзоларини соғломлаштиришда ижобий ўзгаришларга
          эришилди.
        </p>
        <p>
          Ўзбекистон касаба уюшмалари чет эл миллий касаба уюшмалари марказлари, жаҳон
          ишчилар ҳаракатининг етакчиси Халқаро эркин касаба уюшмалари конфедерацияси
          ҳамкорлигида Франция Меҳнат демократик федерацияси, Америка Меҳнат федерацияси,
          Бельгия эркин касаба уюшмалари умумий бирлашмаси, Австрия касаба уюшмалари
          федерацияси билан ҳамкорлик алоқалари ўрнатган. Шунингдек, Хитой, Япония,
          Ҳиндистон мамлакатлари касаба уюшмалари билан алоқалар мустаҳкамланиб бормоқда.
          Касаба уюшмаларининг ҳаракат дастурида Халқаро меҳнат ташкилоти билан халқаро
          ҳамкорлик муҳим ўрин тутади. Ўзбекистон Республикаси томонидан бу ташкилотнинг
          11 та конвенцияси ратификация қилинган.
        </p>
        <p>
          Ўзбекистон касаба уюшмалари федерацияси, ўз навбатида, “Ишонч” (ўзбек тилида
          ҳафтасига 3 марта чиқади) ва “Ишонч-Доверие” (рус тилида, ҳафтасига 1 марта
          чиқади) газеталари ҳамда “ishonch.uz” ахборот-таҳлилий портали муассиси ҳамдир.
        </p>
      </div>
      <div class="about-partners" v-if="$route.query.type == 'partners'">
        <span>
          <img src="../assets/images/image_2023-05-15_13-18-17.png" alt="" />
        </span>
        <span>
          <img src="../assets/images/Frame 92654484.png" alt="" />
        </span>
        <span>
          <img src="../assets/images/Frame 92654483.png" alt="" />
        </span>
        <span>
          <img src="../assets/images/image_2023-05-15_13-19-46.png" alt="" />
        </span>
        <span>
          <img src="../assets/images/image_2023-05-15_13-20-57.png" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: "literature",
    };
  },
  async asyncData({ store, i18n }) {
    const [literatureData, scientificData, articlesData] = await Promise.all([
      store.dispatch("fetchBooks/getBooks", {
        params: {
          type: "literature",
        },
        headers: {
          Language: i18n.locale,
        },
      }),
    ]);
    const literature = literatureData.results;
    return {
      literature,
    };
  },
  mounted() {
    if (Object.keys(this.$route.query).length == 0) {
      this.tabChange("about-us");
    }
  },
  methods: {
    tabChange(name) {
      this.$router.replace({
        path: "/about",
        query: {
          type: name,
        },
      });
    },
  },
};
</script>
<style lang="css">
@import "../assets/css/pages/home-page.css";
@import "../assets/css/pages/news-menu-page.css";
.about-partners {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.about-partners img {
  margin-left: 75px;
  margin-bottom: 50px;
}
.about-page {
  padding-top: 40px;
  padding-bottom: 80px;
}
.about-page-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 30px;
}
.articles-page-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
}
.about-us-container,
.engineers-container {
  width: 61%;
}
.about-us-container > h2,
.engineers-container > h2 {
  color: var(--gray_f9f9f9, #000);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 16px;
}
.about-us-container > p {
  color: var(--gray_f9f9f9, #000);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  margin-bottom: 16px;
}
.about-statistic {
  display: flex;
  margin-bottom: 16px;
  /* justify-content: space-between; */
}
.about-statistic > p {
  color: var(--gray_f9f9f9, #888);
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
  display: flex;
  flex-direction: column;
  margin-right: 66px;
}
/* .about-statistic {
  display: grid;
  grid-template-columns: 1fr;
  grid: 21px;
} */
.about-statistic > p > span {
  color: var(--light-bue-100, #0192ff);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
}
.about-adress {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 21px;
}
.about-adress > p {
  color: #707070;
  font-size: 14px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  flex-direction: column;
}
.about-adress > p > span {
  color: var(--gray_f9f9f9, #000);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 4px;
}
.engineers-container > p {
  color: var(--gray_f9f9f9, #414141);
  font-size: 17px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  padding-bottom: 16px;
}
.about-shadow-card {
  margin-top: 24px;
  margin-bottom: 47px;
  padding: 28px 54px 38px 38px;
  background: var(--black_111111, #f9f9f9);
  box-shadow: 8px 8px 0 0 var(--light-bue-100, #0192ff);
}
.about-shadow-card h4 {
  color: var(--light-bue-100, #0192ff);
  font-size: 20px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  line-height: 170%;
  margin-bottom: 14px;
}
.about-shadow-card p {
  color: var(--white_ffffff, #414141);
  font-size: 17px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
}
.engineers-container ul h1,
.engineers-container ul h2,
.engineers-container ul h3,
.engineers-container ul h4,
.engineers-container ul h5 {
  color: var(--light-bue-100, #0192ff);
  font-size: 20px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 500;
  line-height: 170%;
  margin-bottom: 14px;
}
.engineers-container ul {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  padding-bottom: 40px;
  margin-left: 15px;
}
.engineers-container ul li {
  color: var(--white_ffffff, #414141);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 60px;
}
.engineers-container ul li::after {
  content: "";
  position: absolute;
  left: -16px;
  border-radius: 6px;
  background: var(--light-bue-100, #0192ff);
  width: 6px;
  height: 6px;
}
</style>
