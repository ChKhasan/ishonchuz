export const state = () => ({
  theme: true,
  translations: {},
  auth: false,
  literature: [],
  science: [],
  viewNews: [],
});

export const mutations = {
  changeTheme(state, payload) {
    if (
      JSON.parse(localStorage.getItem("theme")) != false &&
      JSON.parse(localStorage.getItem("theme")) != true
    ) {
      localStorage.setItem("theme", true);
      state.theme = JSON.parse(localStorage.getItem("theme"));
    } else {
      if (payload == "first") {
        state.theme = JSON.parse(localStorage.getItem("theme"));
      } else {
        localStorage.setItem("theme", payload);
        state.theme = JSON.parse(localStorage.getItem("theme"));
      }
    }
  },
  getTranslations(state, payload) {
    state.translations = payload;
  },
  chackAuth(state, payload) {
    console.log(localStorage.getItem("access_token"));
    if (localStorage.getItem("access_token")) {
      state.auth = true;
    } else {
      state.auth = false;
    }
  },
  addToStore(state, payload) {
    let cart = JSON.parse(localStorage.getItem(payload.name));
    if (cart.includes(payload.id)) {
      cart.splice(cart.indexOf(payload.id), 1);
    } else {
      cart.push(payload.id);
    }
    localStorage.setItem(payload.name, JSON.stringify(cart));
    state[payload.name] = cart;
  },
  viewNewsStore(state, payload) {
    console.log(payload);
    let cart = JSON.parse(localStorage.getItem("viewNews"));
    if (cart) {
      if (!cart.includes(payload.id)) {
        cart.push(payload.id);
      }
      localStorage.setItem("viewNews", JSON.stringify(cart));
      state.viewNews = cart;
    } else {
      localStorage.setItem("viewNews", JSON.stringify([payload.id]));
      state.viewNews.push(payload.id);
    }
  },
  reloadStore(state) {
    if (localStorage.getItem("literature")) {
      const literature = JSON.parse(localStorage.getItem("literature"));
      state.literature = literature;
    } else {
      localStorage.setItem("literature", JSON.stringify([]));
    }
    if (localStorage.getItem("science")) {
      const science = JSON.parse(localStorage.getItem("science"));
      state.science = science;
    } else {
      localStorage.setItem("science", JSON.stringify([]));
    }
    if (localStorage.getItem("viewNews")) {
      const viewNews = JSON.parse(localStorage.getItem("viewNews"));
      state.viewNews = viewNews;
    } else {
      localStorage.setItem("viewNews", JSON.stringify([]));
    }
  },
};
