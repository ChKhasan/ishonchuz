export const actions = {
  async getBooks({}, payload) {
    const res = await this.$axios.$get(`/books`, { ...payload });
    return res;
  },
  async getArticles({}, payload) {
    const res = await this.$axios.$get(`/articles`, { ...payload });
    return res;
  },
  async getManuals({}, payload) {
    const res = await this.$axios.$get(`/manuals`, { ...payload });
    return res;
  },
  async getBooksBySlug({}, payload) {
    const res = await this.$axios.$get(`/books/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
  async getArticlesBySlug({}, payload) {
    const res = await this.$axios.$get(`/articles/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
  async getBooksBySlug({}, payload) {
    const res = await this.$axios.$get(`/books/${payload.id}`, {
      ...payload.header,
    });
    return res;
  },
};
