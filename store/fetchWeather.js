export const actions = {
  async getWeathers({}, payload) {
    const res = await this.$axios.$get(`/weather`, { ...payload });
    return res;
  },
};
