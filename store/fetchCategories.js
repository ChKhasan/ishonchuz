export const actions = {
  async getCategories({}, payload) {
    const res = await this.$axios.$get(`/news/categories`, { params: payload });
    return res;
  },

  async getCategoriesBySlug({}, id) {
    const res = await this.$axios.$get(`/news/categories/${id}`);
    return res;
  },
};
