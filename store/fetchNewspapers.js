export const actions = {
  async getNewspapers({}, payload) {
    const res = await this.$axios.$get(`/newspapers`, { ...payload });
    return res;
  },
  async getArticles({}, payload) {
    const res = await this.$axios.$get(`/newspapers`, { ...payload });
    return res;
  },
  async getNewspapersBySlug({}, payload) {
    const res = await this.$axios.$get(`/newspapers/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
};
