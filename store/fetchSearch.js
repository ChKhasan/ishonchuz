export const actions = {
  async search({}, payload) {
    const res = await this.$axios.$get(`/search`, { ...payload });
    return res;
  },
};
