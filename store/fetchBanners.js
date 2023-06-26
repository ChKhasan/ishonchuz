export const actions = {
  async getBanners({}, payload) {
    const res = await this.$axios.$get(`/ads`, { ...payload });
    return res;
  },
  async getGalleries({}, payload) {
    const res = await this.$axios.$get(`/gallery`, { ...payload });
    return res;
  },
};
