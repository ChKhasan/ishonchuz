export default {
  head: {
    title: "Ishonch",
    htmlAttrs: {
      lang: "en",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Lato:wght@300;400;700;900&family=Mulish:wght@200;300;400;500;600;700;800&family=Roboto+Serif:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
      },
    ],
  },

  css: ["@/assets/css/app.css", "ant-design-vue/dist/antd.css"],

  plugins: [
    { src: "~plugins/antdv.js" },
    { src: "~plugins/lazy-youtube.js", ssr: false },
    { src: "~plugins/v-mask.js", ssr: false },
    { src: "~/plugins/client-only.js", mode: "client" },
  ],
  components: true,
  i18n: {
    locales: ["oz", "uz", "ru"],
    defaultLocale: "oz",
    vueI18n: {
      fallbackLocale: "oz",
    },
  },

  buildModules: ["@nuxtjs/svg"],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "@nuxtjs/i18n"],
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://ishonch.pythonanywhere.com/api",
  },
  loading: {
    color: "#0192ff",
  },
  router: {
    middleware: ["auth"],
  },
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
