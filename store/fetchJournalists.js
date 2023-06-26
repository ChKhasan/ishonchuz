export const actions = {
  async getJournalists({}, payload) {
    const res = await this.$axios.$get(`/journalists`, { ...payload });
    return res;
  },
  async getJournalistsBySlug({}, payload) {
    const res = await this.$axios.$get(`/journalists/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
};
