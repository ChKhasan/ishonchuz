export const state = () => ({
  theme: true,
  translations: {},
});

export const mutations = {
  changeTheme(state, payload) {
    state.theme = payload;
  },
  getTranslations(state, payload) {
    state.translations = payload;
  },
};
