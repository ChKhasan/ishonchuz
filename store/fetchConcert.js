export const actions = {
  async getTheaters({}, payload) {
    const res = await this.$axios.$get(`/theater`, { ...payload });
    return res;
  },
  async getConcerts({}, payload) {
    const res = await this.$axios.$get(`/concerts`, { ...payload });
    return res;
  },
  async getShows({}, payload) {
    const res = await this.$axios.$get(`/shows`, { ...payload });
    return res;
  },
};
