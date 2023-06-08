export const actions = {
  async getNews({}, payload) {
    const res = await this.$axios.$get(`/news`, { params: payload });
    return res;
  },
  async getNewsById({}, data) {
    const res = await this.$axios.$post(`/get_news`, data);
    return res;
  },
  async getNewsBySlug({}, id) {
    const res = await this.$axios.$get(`/news/${id}`);
    return res;
  },
};
