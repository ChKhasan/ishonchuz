export const actions = {
  async getCategories({}, payload) {
    const res = await this.$axios.$get(`/news/categories`, { ...payload });
    return res;
  },

  async getCategoriesBySlug({}, payload) {
    const res = await this.$axios.$get(`/news/categories/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
};
