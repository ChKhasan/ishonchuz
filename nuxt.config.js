export default {
  head: {
    title: "Ishonch",
    htmlAttrs: {
      lang: "en",
      prefix: "og: https://ogp.me/ns#",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon1.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@200;300;400;500;600;700;800&family=Roboto+Serif:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Poppins:wght@200;300;400;500;600;700&display=swap",
      },
    ],
    script: [
 
      {
        src:
        "https://www.googletagmanager.com/gtag/js?id=G-G9H56EQRWX",
        async: true
      },
    ],
  },

  css: [
    "@/assets/css/app.css",
    "ant-design-vue/dist/antd.css",
    // "@/assets/css/pages/header-mobile.css",
  ],

  plugins: [
    { src: "~plugins/antdv.js" },
    { src: "~plugins/lazy-youtube.js", ssr: false },
    // { src: "~plugins/v-mask.js", ssr: false },
    { src: "~plugins/vue-aplayer.js", ssr: false },
    { src: "~plugins/google-analitics.js", ssr: false },
    "./plugins/mask.js",
  ],
  components: true,
  i18n: {
    locales: ["oz", "uz", "ru"],
    defaultLocale: "uz",
    vueI18n: {
      fallbackLocale: "uz",
    },
  },

  buildModules: ["@nuxtjs/svg"],
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "@nuxtjs/dotenv",
  ],
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://admin.ishonch.uz/api",
  },
  loading: {
    color: "#0192ff",
  },
  router: {
    middleware: ["auth"],
  },
  // target: "server",
  // server: { port: 3001, host: "0.0.0.0" },
  build: {
    babel: {
      compact: true,
    },
    vendor: ["aos"],
    standalone: true,
    extend(config, ctx) {
      config.externals = [
        {
          encoding: "encoding",
        },
      ];
    },
  },
};
