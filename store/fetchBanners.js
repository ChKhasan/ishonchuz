export const actions = {
  async getBanners({}, payload) {
    const res = await this.$axios.$get(`/ads`, { ...payload });
    return res;
  },
};
