export const state = () => ({
  theme: true,
});

export const mutations = {
  changeTheme(state, payload) {
    state.theme = payload;
  },
};
