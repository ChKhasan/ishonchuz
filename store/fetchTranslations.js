export const actions = {
  async getTranslations({}, payload) {
    const res = await this.$axios.$get(`/translations`, { ...payload });
    return res;
  },
};
