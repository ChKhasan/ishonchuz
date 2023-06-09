export const actions = {
  async getNews({}, payload) {
    const res = await this.$axios.$get(`/news`, { ...payload });
    return res;
  },
  async getNewsById({}, data) {
    const res = await this.$axios.$post(`/get_news`, data);
    return res;
  },
  async getNewsBySlug({}, payload) {
    const res = await this.$axios.$get(`/news/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
};
